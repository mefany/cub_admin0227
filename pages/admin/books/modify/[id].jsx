import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card1 from "components/Card1";
import {
  Grid,
  Box,
  Button,
  Divider,
  Stack,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { H3, Paragraph } from "components/Typography";
import VendorDashboardLayout from "components/layouts/admin-dashboard";
import axios from "axios";

let MODIFY_BOOK = {};

ShopSettings.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function ShopSettings() {
  const [bookInfo, setBookInfo] = useState(null);
  const [isbnInfo, setIsbnInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    getTrade(router.query.id);
  }, [router]);

  const getTrade = trade_uid => {
    fetch(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade/${trade_uid}`
    )
      .then(res => res.json())
      .then(data => {
        setBookInfo(data[0]);
        MODIFY_BOOK = data[0]
        if (data[0].isbn) {
          getBookByIsbn(data[0].isbn)
        }
        setLoading(false);
      });
  };

  const checkoutSchema = Yup.object().shape({
    isbn: Yup.string().required("ISBN을 검색하세요."),
  });

  const getBookByIsbn = async isbn => {
    await axios
      .get(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/isbn?isbn=${isbn}`
      )
      .then(response => {
        if (response.data.items.length > 0) {
          setIsbnInfo(response.data.items[0]);
          MODIFY_BOOK = { ...MODIFY_BOOK, ...response.data.items[0] }
          postNewBook(response.data.items[0])
        } else {
          alert('책 정보가 없습니다. 다시 검색하세요.')
          setBookInfo({ ...bookInfo, isbn: null })
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const postNewBook = async (obj) => {
    await axios
      .post(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/book`,
        obj
      )
      .then(response => {
        if (response.status === 200) {
          MODIFY_BOOK = { ...MODIFY_BOOK, book_uid: response.data }
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleOnChange = e => {
    setBookInfo({
      ...bookInfo,
      isbn: e.target.value
    })
  };

  const handleIsbnSubmit = () => {
    getBookByIsbn(bookInfo.isbn);
  };

  const putNewTrade = async () => {
    console.log('ddd', MODIFY_BOOK)
    await axios
      .put(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade`,
        { ...MODIFY_BOOK, shop_uid: 1, book_condition: '최상' }
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          alert("정상 등록되었습니다.");
          router.push("/admin/books");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box py={4} maxWidth={740} margin='auto'>
      <H3 mb={2}>도서 수정</H3>

      <Card1>
        {bookInfo && (
          <>
            <Paragraph fontWeight={700} mb={2}>
              필수 입력 정보
            </Paragraph>

            <Formik
              initialValues={bookInfo}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={3} mb={3}>
                    <Grid container spacing={3}>
                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          name='trade_title'
                          label='제목'
                          value={bookInfo.trade_title}
                          readOnly
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label='판매가'
                          name='sell_price'
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <TextField
                          rows={6}
                          multiline
                          fullWidth
                          color='info'
                          name='trade_description'
                          value={bookInfo.trade_description}
                          label='책소개'
                        />
                      </Grid>
                    </Grid>
                  </Stack>

                  <Divider variant='middle' />

                  <Paragraph fontWeight={700} mt={2}>
                    추가 입력 정보
                  </Paragraph>
                  <Paragraph
                    fontWeight={500}
                    fontSize={12}
                    mb={2}
                    style={{ color: "#D23F57" }}
                  >
                    정확한 책 정보를 입력하려면 ISBN을 검색하세요.
                  </Paragraph>

                  <Stack spacing={3} mb={3}>
                    <TextField
                      color='info'
                      type='text'
                      name='isbn'
                      label='ISBN'
                      value={bookInfo.isbn || ""}
                      onChange={handleOnChange}
                      error={!!touched.isbn && !!errors.isbn}
                      helperText={touched.isbn && errors.isbn}
                    />
                    <Button
                      onClick={handleIsbnSubmit}
                      color='primary'
                      variant='contained'
                      disabled={bookInfo.isbn === null}
                      onChange={handleChange}

                    >
                      검색
                    </Button>
                  </Stack>

                  <Divider variant='middle' />

                  {isbnInfo && (
                    <>
                      <Paragraph fontWeight={700} mt={2}>
                        도서 정보
                      </Paragraph>

                      <Stack spacing={3} mb={3}>
                        <img
                          name='image'
                          src={isbnInfo.image || ""}
                          style={{
                            width: "250px",
                            objectFit: "contain",
                            margin: "0 auto",
                            border: "1px solid #eee",
                          }}
                        />

                        <TextField
                          color='info'
                          name='title'
                          label='도서명'
                          value={isbnInfo.title || ""}
                          readOnly
                        />

                        <TextField
                          color='info'
                          name='publisher'
                          label='출판사'
                          onChange={handleChange}
                          value={isbnInfo.publisher || ""}
                        />

                        <TextField
                          fullWidth
                          color='info'
                          name='pubdate'
                          placeholder='발행일'
                          label='발행일'
                          onChange={handleChange}
                          value={isbnInfo.pubdate || ""}
                        ></TextField>

                        <TextField
                          rows={6}
                          multiline
                          fullWidth
                          color='info'
                          name='description'
                          onChange={handleChange}
                          value={isbnInfo.description || ""}
                          label='책소개'
                        />

                        <TextField
                          color='info'
                          name='price'
                          label='정가'
                          onChange={handleChange}
                          value={isbnInfo.discount || ""}
                        />
                      </Stack>
                    </>
                  )}

                  {isbnInfo &&
                    <Button onClick={putNewTrade} variant='contained' color='primary'>
                      수정하기
                    </Button>}
                </form>
              )}
            </Formik>
          </>
        )}
      </Card1>
    </Box>
  );
}
