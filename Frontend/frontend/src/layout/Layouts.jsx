import React from 'react'
import Header from "../components/Header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import Router from "../routes/Router.jsx";
const Layouts = () => {
  return (
    <>
      <Header/>
      <main>
        <Router/>
      </main>
      <Footer/>
      

    </>
  )
}

export default Layouts
