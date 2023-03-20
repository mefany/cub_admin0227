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

export const earningHistory = [
  {
    no: 1,
    date: "20-04-2022",
    sellerEarning: 200,
    adminCommission: 5.15,
    orderNo: "5256SD6465D32",
    shopName: "The Beauty Shop",
  },
  {
    no: 2,
    date: "19-04-2022",
    shopName: "The Gainner",
    orderNo: "5256SD6465D33",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
  {
    no: 3,
    date: "17-04-2022",
    orderNo: "5256SD6465D34",
    shopName: "The Beauty Shop",
    adminCommission: 5.15,
    sellerEarning: 200,
  },
  {
    no: 4,
    orderNo: "5256SD6465D35",
    date: "14-04-2022",
    shopName: "The Beauty Shop",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
  {
    no: 5,
    orderNo: "5256SD6465D36",
    date: "08-04-2022",
    shopName: "The Beauty Shop",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
  {
    no: 6,
    orderNo: "5256SD6465D37",
    date: "01-04-2022",
    shopName: "Beyond Threads",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
  {
    no: 7,
    orderNo: "5256SD6465D38",
    date: "26-03-2022",
    shopName: "Beyond Threads",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
  {
    no: 8,
    orderNo: "5256SD6465D39",
    date: "16-03-2022",
    shopName: "Beyond Threads",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
  {
    no: 9,
    orderNo: "5256SD6465D40",
    date: "12-03-2022",
    shopName: "Beyond Threads",
    adminCommission: 2.5,
    sellerEarning: 250,
  },
];

MileageList.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function MileageList({ requests }) {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: requests,
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
                rowCount={requests.length}
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
            count={Math.ceil(requests.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
