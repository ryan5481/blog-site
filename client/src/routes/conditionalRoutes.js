import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../App.css';

import PageNotFound from '../pages/99-404error';
//USER ROUTES
import Dashboard from "../pages/01-user/dashboard"
//NON USER ROUTES
import Signup from "../pages/02-guestUser/01-auth/02-signup"
import Login from "../pages/02-guestUser/01-auth/01-login"
import Home from "../pages/02-guestUser/01-home"



const ConditionalRoute = () => {
  const { userRole } = useSelector(state => state.user)
  if (userRole === 'user') {
    return <UserRoutes />
  } else {
    return <GuestUserRoutes />
  }
}

const UserRoutes = () => {
  return (
    <>
      {/* <Header /> */}
      {/* <NavBar zIndex={10} /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>
  )
}

const GuestUserRoutes = () => {
  return (
    <>
      {/* <NavBar zIndex={10} /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  )
}

export default ConditionalRoute





