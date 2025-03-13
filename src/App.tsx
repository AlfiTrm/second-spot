import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./components/view/home/Home";
import MainLayout from "./layout/MainLayout";
import Login from "./components/view/auth/Login";
import Detail from "./components/view/main/Detail";
import Register from "./components/view/auth/Register";
import Favorite from "./components/view/main/Favorite";
import Profile from "./components/view/user/Profile";
import ChangeProfile from "./components/view/user/ChangeProfile";
import Sell from "./components/view/main/Sell";
import PasswordChange from "./components/view/user/PasswordChange";

const router = createHashRouter([
  {
    path: "/",
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <MainLayout>
        <Detail
          id={0}
          title={""}
          price={0}
          category={""}
          description={""}
          image={""}
          userId={""}
        />
      </MainLayout>
    ),
  },
  {
    path: "/favorite",
    element: (
      <MainLayout>
        <Favorite />
      </MainLayout>
    ),
  },
  {
    path: "/profile",
    element: (
      <MainLayout>
        <Profile />
      </MainLayout>
    ),
  },
  {
    path: "/profile/changeProfile",
    element: (
      <MainLayout>
        <ChangeProfile />
      </MainLayout>
    ),
  },
  {
    path: "/profile/changePassword",
    element: (
      <MainLayout>
        <PasswordChange />
      </MainLayout>
    ),
  },
  {
    path: "/sell",
    element: (
      <MainLayout>
        <Sell />
      </MainLayout>
    ),
  },
  {
    path: "/Register",
    element: <Register />,
  },
  {
    path: "/Login",
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
