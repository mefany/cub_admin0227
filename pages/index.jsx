import { Box, Grid } from "@mui/material";
import Card1 from "components-usage/dashboard/Card1";
import WishCard from "components-usage/dashboard/WishCard";
import Analytics from "components-usage/dashboard/Analytics";
import VendorDashboardLayout from "components/layouts/admin-dashboard";

VendorDashboard.getLayout = function getLayout(page) {
  return <VendorDashboardLayout>{page}</VendorDashboardLayout>;
}; // =============================================================================

export const cardList = [
  {
    id: 1,
    title: "신규등록",
    amount1: "2,350",
    amount2: 9350,
    color: "info.main",
    percentage: "25.25%",
  },
  {
    id: 2,
    title: "전월대비",
    amount1: "2,360",
    amount2: 1350,
    color: "error.main",
    percentage: "2.65%",
    status: "down",
  },
  {
    id: 3,
    title: "월간매출",
    amount1: "2,460,000원",
    amount2: 11350,
    color: "success.main",
    percentage: "10.25%",
  },
  {
    id: 4,
    title: "총매출액",
    amount1: "6,240,000원",
    amount2: 4350,
    color: "error.main",
    percentage: "13.15%",
    status: "down",
  },
];

//books
export const books = [
  {
    uid: "도서등록ID",
    isbn: "도서ISBN",
    published: "출판사",
    created: "2020-01-01",
    price: 3000,
    name: "도서명도서명도서명",
    shopName: "강동지점",
    status: "최상",
    active: true,
    image: "/assets/images/avatars/001-man.svg",
  },
];

//회원 mockup data
export const members = [
  {
    id: "df933ff2-2813-4a8a-9db5-8a7c97c1ea06",
    email: "Jessie@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/001-man.svg",
    balance: 10350.25,
    orders: "07",
    name: "Jessie",
  },
  {
    id: "bddc6241-21fd-4bd8-a4e4-ea289ec609cd",
    email: "Jerry@gmail.com",
    phone: "+12343458910",
    avatar: "/assets/images/avatars/002-girl.svg",
    balance: 12350.45,
    orders: "02",
    name: "Jerry",
  },
  {
    id: "86f61ce9-2dd4-4377-b273-08a77bea5d5b",
    email: "Luke@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/002-woman.svg",
    balance: 11345.25,
    orders: "03",
    name: "Luke",
  },
  {
    id: "fb318901-4f55-41dc-a9db-29a12a2c0169",
    email: "Daniel@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/003-boy.svg",
    balance: 9540.47,
    orders: "04",
    name: "Daniel",
  },
  {
    id: "1656278e-f508-4e1c-bbf1-59f167dfd5ed",
    email: "Zinny@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/003-man-1.svg",
    balance: 7250.36,
    orders: "09",
    name: "Zinny",
  },
  {
    id: "bddb8779-10bc-4b59-b19e-e6e731caca21",
    email: "Lola@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/004-bald.svg",
    balance: 8356.34,
    orders: "09",
    name: "Lola",
  },
  {
    id: "4997f27a-936c-430e-bdea-7387a3c7f97d",
    email: "Gabriel@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/004-woman.svg",
    balance: 4370.55,
    orders: "12",
    name: "Gabriel",
  },
  {
    id: "a32e32c3-f75d-45ed-bd52-b98232131854",
    email: "James@gmail.com",
    phone: "+12345678910",
    avatar: "/assets/images/avatars/005-man-2.svg",
    balance: 2458.15,
    orders: "11",
    name: "James",
  },
];

// =============================================================================
export default function VendorDashboard() {
  return (
    <Box py={4}>
      <Grid container spacing={3}>
        {/* WISHING CARD */}
        <Grid item md={6} xs={12}>
          <WishCard />
        </Grid>

        {/* ALL TRACKING CARDS */}
        <Grid container item md={6} xs={12} spacing={3}>
          {cardList.map(item => (
            <Grid item md={6} sm={6} xs={12} key={item.id}>
              <Card1
                title={item.title}
                color={item.color}
                amount1={item.amount1}
                amount2={item.amount2}
                percentage={item.percentage}
                status={item.status === "down" ? "down" : "up"}
              />
            </Grid>
          ))}
        </Grid>

        {/* ANALYTICS AREA */}
        <Grid item xs={12}>
          <Analytics />
        </Grid>
      </Grid>
    </Box>
  );
}
