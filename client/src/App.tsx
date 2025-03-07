import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './auth/login'
import Register from './auth/register'
import MainLayout from './components/comon/MainLayout'
import ForgetPassword from './auth/forgetPassword'
import ResetPassword from './auth/resetPassword'
import VerifyEmail from './auth/verifyEmail'
const appRouter  = createBrowserRouter([
  {
    path:"/",
    element : <MainLayout />
  },
  {
    path:"/login",
    element : <Login />
  },
  {
    path : "/register",
    element : <Register />
  },{
    path : "/forgot-password",
    element : <ForgetPassword />
  },
  {
    path : "/reset-password",
    element : <ResetPassword />
  },
  {
    path : "/verify-email",
    element : <VerifyEmail />
  }
])

const App = () => {
  return (
    <>
    <RouterProvider router={appRouter}>

    </RouterProvider>

    {/* this is the old style of adding routes in react app */}
    {/* <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Routes> */}
    
    </>
  )
}

export default App
