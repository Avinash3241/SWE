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
    path: "/sellings_history",
    element: (
      <PrivateRoute>
        <Sellings_history/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
  {
    path: "/buyings_history",
    element: (
      <PrivateRoute>
        <Buyings_history/>
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
];

export default routes;