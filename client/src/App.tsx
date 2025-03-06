import { createBrowserRouter, Route, RouterProvider, Routes } from 'react-router-dom'
import Login from './auth/login'
import Register from './auth/register'
import MainLayout from './components/comon/MainLayout'
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
