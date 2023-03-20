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
  StatusWrapper,
  StyledTableRow,
  StyledTableCell,
  StyledIconButton,
} from "components-usage/table-rows";

const tableHeading = [
  {
    id: "no",
    label: "No",
    align: "left",
  },
  {
    id: "userNo",
    label: "ID",
    align: "left",
  },
  {
    id: "nickName",
    label: "닉네임",
    align: "left",
  },
  {
    id: "totalAmount",
    label: "마일리지누적",
    align: "left",
  },
  {
    id: "requestAmount",
    label: "요청마일리지",
    align: "left",
  },
  {
    id: "date",
    label: "Date",
    align: "left",
  },
  {
    id: "status",
    label: "처리상태",
    align: "left",
  },
  {
    id: "action",
    label: "Action",
    align: "center",
  },
];

export const payoutRequests = [
  {
    no: 1,
    date: "20-04-2022",
    status: "Accepted",
    userNo: "5256SD6465D38",
    totalAmount: 1_200,
    requestAmount: 200,
    nickName: "Jessie",
  },
  {
    no: 2,
    date: "19-04-2022",
    status: "Rejected",
    totalAmount: 250,
    userNo: "5256SD6465D38",
    requestAmount: 25,
    nickName: "Jessie",
  },
  {
    no: 3,
    date: "17-04-2022",
    status: "Processing",
    totalAmount: 1_300,
    requestAmount: 200,
    nickName: "Jessie",
    userNo: "5256SD6465D38",
  },
  {
    no: 4,
    date: "14-04-2022",
    status: "Accepted",
    nickName: "Jessie",
    totalAmount: 2_200,
    requestAmount: 200,
    userNo: "5256SD6465D38",
  },
  {
    no: 5,
    date: "08-04-2022",
    status: "Accepted",
    totalAmount: 700,
    requestAmount: 100,
    nickName: "Jessie",
    userNo: "5256SD6465D38",
  },
  {
    no: 6,
    date: "01-04-2022",
    totalAmount: 930,
    userNo: "5256SD6465D38",
    status: "Processing",
    requestAmount: 130,
    nickName: "Jessie",
  },
  {
    no: 7,
    date: "26-03-2022",
    status: "Rejected",
    totalAmount: 450,
    requestAmount: 50,
    userNo: "5256SD6465D38",
    nickName: "Jessie",
  },
  {
    no: 8,
    date: "16-03-2022",
    status: "Processing",
    totalAmount: 360,
    requestAmount: 60,
    userNo: "5256SD6465D38",
    nickName: "Jessie",
  },
];

PayoutRequests.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

// =============================================================================
export default function PayoutRequests() {
  const {
    order,
    orderBy,
    selected,
    rowsPerPage,
    filteredList,
    handleChangePage,
    handleRequestSort,
  } = useMuiTable({
    listData: payoutRequests,
    defaultSort: "no",
  });
  return (
    <Box py={4}>
      <H3 mb={2}>마일리지 지급내역</H3>

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
                rowCount={payoutRequests.length}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
              />

              <TableBody>
                {filteredList.map((request, index) => (
                  <StyledTableRow role='checkbox' key={index}>
                    <StyledTableCell align='left'>{request.no}</StyledTableCell>
                    <StyledTableCell align='left'>
                      {request.userNo}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {request.nickName}
                    </StyledTableCell>
                    <StyledTableCell align='left'>
                      {request.totalAmount}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {request.requestAmount}
                    </StyledTableCell>

                    <StyledTableCell align='left'>
                      {request.date}
                    </StyledTableCell>

                    <StyledTableCell align='center'>
                      <StatusWrapper status={request.status}>
                        {request.status}
                      </StatusWrapper>
                    </StyledTableCell>

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
            count={Math.ceil(payoutRequests.length / rowsPerPage)}
          />
        </Stack>
      </Card>
    </Box>
  );
}
