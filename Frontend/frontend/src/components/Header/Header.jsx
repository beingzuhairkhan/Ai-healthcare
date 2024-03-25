import React, { useEffect, useRef , useContext} from 'react';

import Logo from "../../assets/images/logo.png"
// import avatar from "../../assets/images/avatar-icon.png"
import {NavLink , Link} from 'react-router-dom'
import { BiMenu } from "react-icons/bi";
import { authContext } from '../../context/AuthContext';
const navLink = [
    {
    path:'/home',
    display:'Home'
    },
    {
    path:'/doctors',
    display:'Find a Doctor'
    },
    {
    path:'/services',
    display:'Services'
    },
    {
    path:'/contact',
    display:'Contact'
    },


]
const Header = () => {

    const headerRef = useRef(null);
    const menuRef = useRef(null);
    const {user , role , token} = useContext(authContext)
    const handleSticky = ()=>{
        window.addEventListener('scroll' , ()=>{
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add('sticky__header')
            }else{
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }

    useEffect(()=>{
         handleSticky()

         return ()=> window.removeEventListener('scroll' , handleSticky)
    });
    const toggleMenu = ()=> menuRef.current.classList.toggle('show_menu')
  return (
   <header className='header flex items-center ' ref={headerRef}>
  
      <div className='container'>
        <div className='flex items-center justify-between'>
            {/* LOGO */}
            <div>
            <img src={Logo} alt='' className="h-[80px] w-[80px] bg-white rounded-full"></img>
            </div>

             {/* menu */}
             <div className='navigation flex justify-between gap-5' ref={menuRef} onClick={toggleMenu}>
                <ul className='menu flex items-center gap-[2.7rem] cursor-pointer font-semibold'>
                   {
                    navLink.map((link,index)=><li key={index}>
                        <NavLink to={link.path} className={navClass=>navClass.isActive ? 'text-primaryColor text-[16px] leading-7 font-[600]' : 'text-textColor text-[16px] leading-7 font-[600]'}>{link.display}

                        </NavLink>
                    </li>)
                   }
                </ul>
                
             </div>

              {/* Nav Right */}
              <div className='flex items-center gap-4'>
                {token && user ? (<div >
                    <Link to={`${role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}`}>
                        <figure className="w-[35px] h-[35px] rounded-full cursor-pointer ">
                            <img src={user?.photo} alt='' className="rounded-full w-full border border-solid border-black ml-[45px]" /> 
                        </figure>
                        <h1 className="text-[20px] font-bold font-serif">{user?.name}</h1>
                    </Link>
                </div>): ( <Link to='/login'>
                    <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[10px]">Login</button>
                </Link>)
                }
                
            


                

                <span className="md:hidden" onClick={toggleMenu}>
                    <BiMenu  className="w-6 h-6 cursor-pointer"/>
                </span>
              </div>
        </div>
      </div>
     
   </header>
  )
}

export default Header
