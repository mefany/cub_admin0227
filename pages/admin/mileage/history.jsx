import { RemoveRedEye } from "@mui/icons-material";
import { Box, Card, Stack, Table, TableContainer } from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableHeader from "components/data-table/TableHeader";
import TablePagination from "components/data-table/TablePagination";
import VendorDashboardLayout from "components/layouts/admin-dashboard";
import Scrollbar from "components/Scrollbar";
import { H3 } from "components/Typography";
import useMuiTable from "hooks/useMuiTable";
import {
  StyledIconButton,
  StyledTableCell,
  StyledTableRow,
} from "components-usage/table-rows";

const tableHeading = [
  {
    id: "no",
    label: "No",
    align: "left",
  },
  {
    id: "orderNo",
    label: "Id",
    align: "left",
  },
  {
    id: "shopName",
    label: "판매처",
    align: "left",
  },
  {
    id: "adminCommission",
    label: "커미션(%)",
    align: "center",
  },
  {
    id: "sellerEarning",
    label: "지급 마일리지",
    align: "center",
  },
  {
    id: "date",
    label: "날짜",
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

EarningHistory.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function EarningHistory() {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: earningHistory,
    defaultSort: "no",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>마일리지 히스토리</H3>

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
                rowCount={earningHistory.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((item, index) => (
                  <StyledTableRow role='checkbox' key={index}>
                    <StyledTableCell align='left'>{item.no}</StyledTableCell>
                    <StyledTableCell align='left'>
                      {item.orderNo}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {item.shopName}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
                      {item.adminCommission}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
                      {item.sellerEarning}
                    </StyledTableCell>
                    <StyledTableCell align='left'>{item.date}</StyledTableCell>

                    <StyledTableCell align='center'>
                      <StyledIconButton>
                        <RemoveRedEye />
                      </StyledIconButton>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <Stack alignItems='center' my={4}>
          <TablePagination
            onChange={handleChangePage}
            count={Math.ceil(earningHistory.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
