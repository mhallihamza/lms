import React,{ useRef } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HowitWorks from '../components/HowitWorks'
import Why from '../components/Why'
import Feature from '../components/Feature'
import Footer from '../components/Footer'

function Home() {
  const featureRef = useRef(null);

  const navigateToFeature = () => {
    featureRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Header onNavigate={navigateToFeature}/>
      <Hero/>
      <HowitWorks/>
      <Why/>
      <div ref={featureRef}>
      <Feature/>
      </div>
      <Footer/>
    </>
  )
}

export default Home