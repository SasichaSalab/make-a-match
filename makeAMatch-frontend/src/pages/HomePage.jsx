import React, { useRef } from 'react';
import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Category from '../components/Category';
import Refund from '../components/Refund';
import AboutUs from '../components/AboutUs';
import { useAuth } from '../context/AuthContext';
import HeaderNoAuth from '../components/HeaderNoAuth';
import HomeAdmin from './HomeAdmin';

// Transform HomePage into a route component
const HomePage = () => {
    const { user } = useAuth();
    const headerRef = useRef(null);
    const aboutUsRef = useRef(null);
    const refundRef = useRef(null);

    const scrollToRef = (ref) => {
        window.scrollTo({
            top: ref.current.offsetTop,
            behavior: 'smooth'
        });
    };
    if (!user) {
        return (
            <>
                <HeaderNoAuth ref={headerRef} />
                <AboutUs ref={aboutUsRef} />
            </>
        )
    } else {
        if(user.ourUsers.role==='ADMIN'){
            return <HomeAdmin section={'dashboard'} />
        }
        return (
            <>
                <NavBar scrollToRef={scrollToRef} headerRef={headerRef} aboutUsRef={aboutUsRef} refundRef={refundRef} />
                <Header ref={headerRef} />
                <Category />
                <AboutUs ref={aboutUsRef} />
                <Refund ref={refundRef} />
            </>);
    }


};

export default HomePage;
