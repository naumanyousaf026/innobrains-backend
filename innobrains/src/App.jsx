import { useState } from 'react'
import './App.css'
import Header from './component/Header'
import Footer from './component/Footer'
import HeroSection from './component/HeroSection'
import ContactForm from './component/ContactForm'
import ClientCarousel from './component/ClientCarousel'
import WavyBackground from './component/WavyBackground'
import ServicesSection from './component/Servicescopmonent'
import RecentWork from './component/RecentWork'
import BlogSection from './component/BlogSection'
import ServiceOverview from './component/ServiceOverview'
import Wave from './component/TopWave'
function App() {


  return (
    <>
    <Header />
    <HeroSection /> 
    <ClientCarousel />
   <ServicesSection />
    <Wave />

 
  {/* <ServiceOverview /> */}

     <RecentWork />
     <BlogSection />
    <ContactForm />
    <Footer />  
</>
  );
}

export default App
