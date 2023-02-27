import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Card1 from "components/Card1";
import Image from "next/image";
import { Delete } from "@mui/icons-material";
import {
  Grid,
  Box,
  Button,
  Card,
  Divider,
  IconButton,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";

import DropZone from "components/DropZone";
import { FlexBox } from "components/flex-box";
import { H3, Paragraph } from "components/Typography";
import VendorDashboardLayout from "components/layouts/admin-dashboard";
import axios from "axios";

const INITIAL_BOOKS = {};
const INITIAL_USER = {};

const validationIsbn = Yup.object().shape({
  Isbn: Yup.string()
    .required("ISBN 또는 도서명을 입력하세요.")
    .matches(/^[0-9]+$/, "10자리 또는 13자리 숫자 ISBN을 입력하세요.")
    .test(
      "len",
      "10자리 또는 13자리 숫자 ISBN을 입력하세요.",
      val => val.length === 10 || val.length === 13
    ),
});

const validationSchema = Yup.object().shape({
  Name: Yup.string().required("Shop Name is required!"),
  shopPhone: Yup.string().required("Shop Phone is required!"),
  category: Yup.string().required("Category is required!"),
  description: Yup.string().required("Description is required!"),
  shopAddress: Yup.string().required("Shop Address is required!"),
  order: Yup.number().required("Orders is required!"),
}); // =============================================================================

ShopSettings.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export default function ShopSettings() {
  const [isbn, setIsbn] = useState("");
  const [tradeData, setTradeData] = useState(null);
  const [bookInfo, setBookInfo] = useState({});
  const [bookCard, setBookCard] = useState(false);
  const [nickname, setNickname] = useState("");
  const [validIsbn, setValidIsbn] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [sellStatus, setSellStatus] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!router.isReady) return;
    setLoading(true);
    getTrade(router.query.id);
  }, [router]);

  const checkoutSchema = Yup.object().shape({
    trade_title: Yup.string().required("책 제목을 입력하세요."),
    sell_price: Yup.string().required("가격을 입력하세요."),
  });

  const handleOnChange = e => {
    setIsbn(e.target.value);
  };

  const handleIsbnSubmit = values => {
    getBookByIsbn(values.Isbn);
  };

  const handleUserSubmit = values => {
    getUserId(values.userid);
  };

  const handleFormSubmit = values => {
    const newObj = {
      trade_title: values.trade_title,
      seller_uid: parseInt(user_id),
      sell_price: parseInt(values.sell_price),
      trade_description: values.trade_description,
    };
    // setBookCard((prevState) => ({
    //   ...prevState,
    //   trade_title: values.trade_title,
    //   sell_price: parseInt(values.sell_price),
    //   trade_description: values.trade_description,
    // }));
    bookCard = { ...bookCard, ...newObj, ...bookInfo };
    postNewTrade();
  };

  const getTrade = trade_uid => {
    fetch(
      `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade/${trade_uid}`
    )
      .then(res => res.json())
      .then(data => {
        bookCard = { ...bookCard, ...data[0] };
        setTradeData(data[0]);
        setBookInfo(data[0]);
        setSellStatus(data[0].sell_state);
        console.log(data, bookCard);
        setLoading(false);
      });
  };

  const getBookByIsbn = async isbn => {
    await axios
      .get(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/isbn?isbn=${isbn}`
      )
      .then(response => {
        console.log(response.data.items[0]);
        if (response.data.items[0] !== undefined) {
          console.log(response.data.items[0]);
          setBookInfo(response.data.items[0]);
          setValidIsbn(isbn);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getUserId = async id => {
    await axios
      .get(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/user/${id}`
      )
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          setUserInfo(response.data[0]);
        }
      })
      .catch(error => {
        console.log(error);
        // if(error.response.status === 401){
        //   alert('이미 가입되어 있는 이메일 주소입니다.')
        // }
      });
  };

  const postNewBook = async () => {
    await axios
      .post(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/book`,
        {
          isbn: validIsbn,
          title: INITIAL_BOOKS.title,
          author: INITIAL_BOOKS.author,
          image: INITIAL_BOOKS.image,
          price: INITIAL_BOOKS.price,
          description: INITIAL_BOOKS.description,
          publisher: INITIAL_BOOKS.publisher,
          pubdate: INITIAL_BOOKS.pubdate,
          // seller_uid: 15,
          // sell_price: parseInt(values.sell_price),
          // shop_uid: null,
          // trade_description: values.trade_description,
          // trade_image: null
        }
      )
      .then(response => {
        if (response.status === 200) {
          postNewTrade(response.data);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const postNewTrade = async uid => {
    await axios
      .post(
        `https://i9nwbiqoc6.execute-api.ap-northeast-2.amazonaws.com/test/trade`,
        {
          book_uid: uid,
          seller_uid: INITIAL_USER.user_uid,
          sell_state: "판매중",
          sell_price: 2000,
          shop_uid: null,
          trade_description: `${nickname}님이 판매 등록한 도서입니다.`,
          trade_image: null,
        }
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

  const setBook = val => {
    setBookCard(true);
    INITIAL_BOOKS.title = val.title;
    INITIAL_BOOKS.author = val.author;
    INITIAL_BOOKS.publisher = val.publisher;
    INITIAL_BOOKS.pubdate = val.pubdate;
    INITIAL_BOOKS.price = val.discount;
    INITIAL_BOOKS.description = val.description;
    INITIAL_BOOKS.image =
      val.image || "/assets/images/products/24.Revel2020.png";
  };

  const setUserInfo = val => {
    // setUserStatus(true);
    INITIAL_USER.user_uid = val.user_uid;
    setNickname(val.nickname);
    console.log(INITIAL_USER);
  };

  return (
    <Box py={4} maxWidth={740} margin='auto'>
      <H3 mb={2}>도서 수정</H3>

      <Card1>
        {tradeData && (
          <>
            <Paragraph fontWeight={700} mb={2}>
              필수 입력 정보
            </Paragraph>

            <Formik
              onSubmit={handleFormSubmit}
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
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={bookInfo.trade_title}
                          error={!!touched.trade_title && !!errors.trade_title}
                          helperText={touched.trade_title && errors.trade_title}
                        />
                      </Grid>

                      <Grid item md={6} xs={12}>
                        <TextField
                          fullWidth
                          label='판매가'
                          name='sell_price'
                          onBlur={handleBlur}
                          value={bookInfo.sell_price}
                          onChange={handleChange}
                          error={!!touched.sell_price && !!errors.sell_price}
                          helperText={touched.sell_price && errors.sell_price}
                        />
                      </Grid>

                      <Grid item md={12} xs={12}>
                        <TextField
                          rows={6}
                          multiline
                          fullWidth
                          color='info'
                          name='trade_description'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={bookInfo.trade_description}
                          label='책소개'
                          error={Boolean(
                            errors.trade_description &&
                              touched.trade_description
                          )}
                          helperText={
                            touched.trade_description &&
                            errors.trade_description
                          }
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
                      name='Isbn'
                      label='ISBN'
                      value={bookInfo.isbn || ""}
                      onChange={handleOnChange}
                    />
                    <Button
                      onClick={handleIsbnSubmit}
                      color='primary'
                      variant='contained'
                      disabled={isbn === ""}
                    >
                      검색
                    </Button>
                  </Stack>

                  <Divider variant='middle' />

                  {bookInfo && (
                    <>
                      <Paragraph fontWeight={700} mt={2}>
                        도서 정보
                      </Paragraph>

                      <Stack spacing={3} mb={3}>
                        <img
                          name='image'
                          src={bookInfo.image || ""}
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
                          value={bookInfo.title || ""}
                          readOnly
                        />

                        <TextField
                          color='info'
                          name='publisher'
                          label='출판사'
                          onChange={handleChange}
                          value={bookInfo.publisher || ""}
                        />

                        <TextField
                          fullWidth
                          color='info'
                          name='pubdate'
                          placeholder='발행일'
                          label='발행일'
                          onChange={handleChange}
                          value={bookInfo.pubdate || ""}
                        ></TextField>

                        <TextField
                          rows={6}
                          multiline
                          fullWidth
                          color='info'
                          name='description'
                          onChange={handleChange}
                          value={bookInfo.description || ""}
                          label='책소개'
                        />

                        <TextField
                          color='info'
                          name='price'
                          label='정가'
                          onChange={handleChange}
                          value={bookInfo.price || ""}
                        />
                      </Stack>
                    </>
                  )}

                  <Button type='submit' variant='contained' color='primary'>
                    저장
                  </Button>
                </form>
              )}
            </Formik>
          </>
        )}
      </Card1>
      <Grid container justifyContent='flex-end'>
        <Button color='info' variant='outlined' onClick={postNewBook}>
          저장하기
        </Button>
      </Grid>
    </Box>
  );
}
