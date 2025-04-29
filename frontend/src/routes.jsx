import Login from "./pages/login"
// import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/privateRoute";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Profile from "./pages/profile";
import ViewProduct from "./pages/view_product";
import HomePage from "./pages/HomePage";

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
    path: "/HomePage",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
    // errorElement: <ErrorPage />,
  },
];

export default routes;