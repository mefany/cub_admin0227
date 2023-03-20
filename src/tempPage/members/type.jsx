import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import SearchArea from "components/dashboard/SearchArea";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/admin-dashboard";
import { H3 } from "components/Typography";
import Scrollbar from "components/Scrollbar";
import useMuiTable from "hooks/useMuiTable";
import { MemberRowType } from "components-usage/table-rows";

const tableHeading = [
  {
    id: "name",
    label: "이름",
    align: "left",
  },
  {
    id: "shopName",
    label: "지역",
    align: "left",
  },
  {
    id: "package",
    label: "등급",
    align: "left",
  },
  {
    id: "balance",
    label: "마일리지",
    align: "left",
  },
  {
    id: "published",
    label: "활성",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

export const membersType2 = [
  {
    phone: "+12345678910",
    balance: 10_350.25,
    name: "Ethan Booth",
    shopName: "제주",
    package: "Premium",
    published: true,
    image: "/assets/images/avatars/001-man.svg",
  },
  {
    phone: "+12343458910",
    balance: 12_350.45,
    name: "Sofia Hall",
    shopName: "강원",
    package: "Gold",
    published: true,
    image: "/assets/images/avatars/002-girl.svg",
  },
  {
    phone: "+12345678910",
    balance: 11_345.25,
    shopName: "서울",
    package: "Premium",
    published: true,
    name: "Dominic Moss",
    image: "/assets/images/avatars/002-woman.svg",
  },
  {
    phone: "+12345678910",
    balance: 9_540.47,
    package: "Silver",
    published: true,
    shopName: "서울",
    name: "Tilly Thomson",
    image: "/assets/images/avatars/003-boy.svg",
  },
  {
    phone: "+12345678910",
    balance: 7_250.36,
    package: "Gold",
    published: true,
    shopName: "서울",
    name: "Finley Henry",
    image: "/assets/images/avatars/003-man-1.svg",
  },
  {
    phone: "+12345678910",
    balance: 8_356.34,
    package: "Silver",
    published: true,
    shopName: "서울",
    name: "Lola Ryan",
    image: "/assets/images/avatars/004-bald.svg",
  },
  {
    phone: "+12345678910",
    balance: 4_370.55,
    package: "Gold",
    published: true,
    shopName: "경기",
    name: "Gabriel McKenzie",
    image: "/assets/images/avatars/004-woman.svg",
  },
  {
    phone: "+12345678910",
    balance: 2_458.15,
    package: "Premium",
    published: true,
    shopName: "전남",
    name: "James Davey",
    image: "/assets/images/avatars/005-man-2.svg",
  },
];

// =============================================================================

BookList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function BookList({ membersType2 }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: membersType2,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>회원</H3>

      <SearchArea handleSearch={() => {}} searchPlaceholder='회원 검색' />

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 1100,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={membersType2.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((seller, index) => (
                  <MemberRowType seller={seller} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems='center' my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(membersType2.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
export const getStaticProps = async () => {
  const membersType2 = await api.membersType2();
  return {
    props: {
      membersType2,
    },
  };
};
