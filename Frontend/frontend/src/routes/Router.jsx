// import React from 'react'
import Home from "../pages/Home.jsx"
import Login from "../pages/Login.jsx"
import Services from "../pages/Services.jsx"
import Contact from "../pages/SymptomChecker.jsx"
import SignUp from "../pages/SignUp.jsx"
import Doctor from "../pages/doctors/Doctors.jsx"
import DoctorDetail from "../pages/doctors/DoctorDetail.jsx"
 import Myaacount from '../Dashboard/user-account/Myaacount.jsx'
 import Success from '../pages/Success.jsx'
import {Routes, Route} from 'react-router-dom' 
 import DashBoard from '../Dashboard/doctor-account/DashBoard.jsx'
 import ProtectedRoute from './ProtectedRoute.jsx'
 // import Location from "../pages/Location.jsx"
const Router = () => {
  return <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/Home' element={<Home/>}/>
    <Route path='/doctors' element={<Doctor/>}/>
    <Route path='/doctors/:id' element={<DoctorDetail/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<SignUp/>}/>
    <Route path='/SymptomChecker' element={<Contact/>}/>
{/*     <Route path='/Location' element={<Location/>}/> */}
    <Route path='/services' element={<Services/>}/>
    <Route path='/checkout-success' element={<Success/>}/>
    <Route path='/users/profile/me' element={<ProtectedRoute allowedRoles={['patient']}><Myaacount/></ProtectedRoute>}/>
    <Route path='/doctors/profile/me' element={<ProtectedRoute allowedRoles={['doctor']}><DashBoard/></ProtectedRoute>}/>

  </Routes>
  
  
}

export default Router
