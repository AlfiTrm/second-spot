import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/view/user/Home";
import MainLayout from "./layout/MainLayout";
import Login from "./components/view/auth/Login";
import Detail from "./components/view/user/Detail";
import Register from "./components/view/auth/Register";
import Favorite from "./components/view/user/Favorite";
import Profile from "./components/view/user/Profile";
import ChangeProfile from "./components/view/user/ChangeProfile";
import Sell from "./components/view/user/Sell";

const router = createBrowserRouter([
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
    path: "/profile/change",
    element: (
      <MainLayout>
        <ChangeProfile />
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
