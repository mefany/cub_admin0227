import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/admin-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import { MileageRow } from "components-usage/table-rows";

const tableHeading = [
  {
    id: "orderNo",
    label: "ID",
    align: "left",
  },
  {
    id: "shopName",
    label: "판매처",
    align: "left",
  },
  {
    id: "product",
    label: "상품명",
    align: "left",
  },
  {
    id: "amount",
    label: "가격",
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];
export const mileageList = [
  {
    orderNo: "6ed34Edf65d",
    shopName: "기프티쇼",
    amount: 50000,
    status: "Accepted",
    name: "야핏라이더 자전거",
    image: "/assets/images/products/24.Revel2020.png",
  },
  {
    orderNo: "6ed34Edf65d",
    shopName: "기프티쇼",
    amount: 50000,
    status: "Processing",
    name: "야핏라이더 자전거",
    image: "/assets/images/products/24.Revel2020.png",
  },
  {
    orderNo: "6ed34Edf65d",
    shopName: "기프티쇼",
    amount: 50000,
    status: "Pending",
    name: "야핏라이더 자전거",
    image: "/assets/images/products/24.Revel2020.png",
  },
  {
    orderNo: "6ed34Edf65d",
    shopName: "기프티쇼",
    amount: 50000,
    status: "Accepted",
    name: "야핏라이더 자전거",
    image: "/assets/images/products/24.Revel2020.png",
  },
  {
    orderNo: "6ed34Edf65d",
    shopName: "기프티쇼",
    amount: 50000,
    status: "Accepted",
    name: "야핏라이더 자전거",
    image: "/assets/images/products/24.Revel2020.png",
  },
  {
    orderNo: "6ed34Edf65d",
    shopName: "기프티쇼",
    amount: 50000,
    status: "Accepted",
    name: "야핏라이더 자전거",
    image: "/assets/images/products/24.Revel2020.png",
  },
];

MileageList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function MileageList() {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: mileageList,
  });
  return (
    <Box py={4}>
      <H3 mb={2}>마일리지 상품 리스트</H3>

      <Card>
        <Scrollbar>
          <TableContainer
            sx={{
              minWidth: 900,
            }}
          >
            <Table>
              <TableHeader
                order={order}
                hideSelectBtn
                orderBy={orderBy}
                heading={tableHeading}
                rowCount={mileageList.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((request, index) => (
                  <MileageRow request={request} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems='center' my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(mileageList.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
