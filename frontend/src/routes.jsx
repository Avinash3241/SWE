import Login from "./pages/login"
// import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/privateRoute";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ViewProduct from "./pages/view_product";
import HomePage from "./pages/HomePage";
import Sellings from "./pages/seller_listings";
import Buyings from "./pages/buyer_listings";
import ViewRequests from "./pages/view_requests";
import Logout from "./pages/logout";
import EditProduct from "./pages/edit_product";
import Sellings_history from "./pages/seller_listings_history";
import Buyings_history from "./pages/buyer_listings_history";
import AddProduct from "./pages/AddProduct";
import BuyPage from "./pages/BuyPage";  
import Cart from "./pages/cart";
import Drafts from "./pages/Drafts";
// import Notification from "./pages/notification";
// import StarredNotification from "./pages/starredNotifications";
// import ProductCard from "./components/ProductCard";
import Purchase_requests from "./pages/purchase_requests";
import Sent_requests from "./pages/sent_requests";


const routes = [
  {
    path: "/",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    // errorElement: <ErrorPage />,
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Home />
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/view_product/:product_id",
    element: (
      <PrivateRoute>
        <ViewProduct />
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/view_requests/:product_id",
    element: (
      <PrivateRoute>
        <ViewRequests />
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/HomePage",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sellings",
    element: (
      <PrivateRoute>
        <Sellings/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/buyings",
    element: (
      <PrivateRoute>
        <Buyings/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/logout",
    element: (
      <PrivateRoute>
        <Logout/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/edit_product/:product_id",
    element: (
      <PrivateRoute>
        <EditProduct/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sellings/sellings_history",
    element: (
      <PrivateRoute>
        <Sellings_history/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/buypage/buyings_history",
    element: (
      <PrivateRoute>
        <Buyings_history/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sellings/addProduct",
    element: (
      <PrivateRoute>
        <AddProduct/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sellings/drafts",
    element: (
      <PrivateRoute>
        <Drafts/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  // {
  //   path: "/notification",
  //   element: (
  //     <PrivateRoute>
  //       <Notification/>
  //     </PrivateRoute>
  //   ),
  //   // errorElement: <ErrorPage />,
  // },
  // {
  //   path: "/starred_notification",
  //   element: (
  //     <PrivateRoute>
  //       <StarredNotification/>
  //     </PrivateRoute>
  //   ),
  //   // errorElement: <ErrorPage />,
  // },
  {
    path: "/buypage",
    element: (
      <PrivateRoute>
        <BuyPage/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/buypage/cart",
    element: (
      <PrivateRoute>
        <Cart/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/sellings/purchase_requests",
    element: (
      <PrivateRoute>
        <Purchase_requests/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/buypage/sent_requests",
    element: (
      <PrivateRoute>
        <Sent_requests/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  
];

export default routes;