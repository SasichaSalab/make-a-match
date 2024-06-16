import React, { useState, useRef } from 'react';
import Header from '../components/Header';
import Refund from '../components/Refund';
import AboutUs from '../components/AboutUs';
import NavBar from '../components/NavBar';
import ProductsPage from './ProductsPage';
import MatchPage from './MatchPage';
import HomePage from './HomePage';

const Home = () => {
    const [selectedTab, setSelectedTab] = useState('home'); // State to track the selected tab
    const sectionRefs = {
        'home': useRef(null),
        'about': useRef(null),
        'refund': useRef(null)
    };

    // Function to handle tab selection
    const handleTabSelect = (tab) => {
        setSelectedTab(tab);
    };

    // Function to scroll to a specific section
    const scrollToSection = (section) => {
        if (sectionRefs[section].current) {
            sectionRefs[section].current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Function to render component based on the selected tab
    const renderComponent = () => {
        switch (selectedTab) {
            case 'home':
                scrollToSection('home');
                return <HomePage scrollToSection={scrollToSection} section="home" />;
            case 'shop':
                return <ProductsPage />;
            case 'match':
                return <MatchPage />;
            case 'about':
                scrollToSection('about');
                return <HomePage scrollToSection={scrollToSection} section="about" />;
            case 'refund':
                scrollToSection('refund');
                return <HomePage scrollToSection={scrollToSection} section="refund" />;
            default:
                scrollToSection('home');
                return <HomePage scrollToSection={scrollToSection} section="home" />;
        }
    };

    return (
        <>
            <NavBar selectedTab={selectedTab} handleTabSelect={handleTabSelect} />
            {/* Render component based on the selected tab */}
            {renderComponent()}
            <div ref={sectionRefs['home']}></div> {/* Div for the HomePage section */}
            <div ref={sectionRefs['about']}></div> {/* Div for the AboutUs section */}
            <div ref={sectionRefs['refund']}></div> {/* Div for the Refund section */}
        </>
    );
};

export default Home;
