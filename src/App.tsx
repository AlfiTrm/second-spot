import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/view/user/Home'
import MainLayout from './layout/MainLayout'
import Register from './components/view/auth/Register'
import Login from './components/view/auth/Login'
import Detail from './components/view/user/Detail'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    path: '/products/:id',
    element: (
      <MainLayout>
        <Detail id={0} title={''} price={0} category={''} description={''} image={''} />
      </MainLayout>
    ),
  },
  {
    path: '/Register',
    element: (
        <Register id={0} username={''} email={''} password={''} />
    ),
  },
  {
    path: '/Login',
    element: (
        <Login id={0} username={''} password={''} />
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
