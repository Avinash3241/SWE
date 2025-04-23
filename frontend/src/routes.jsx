import Login from "./pages/login"
// import ErrorPage from "./components/ErrorPage";
import PrivateRoute from "./components/privateRoute";
import SignUp from "./pages/signup";
import Home from "./pages/home";
import Profile from "./pages/profile";

const routes = [
  {
    path: "/",
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

];

export default routes;