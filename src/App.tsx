import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './ui/user/Home'
import MainLayout from './layout/MainLayout'
import Register from './ui/Register'


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
    path: '/Register',
    element: (
        <Register />
    ),
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
