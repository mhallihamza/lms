import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import HowitWorks from '../components/HowitWorks'
import Why from '../components/Why'
import Feature from '../components/Feature'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <HowitWorks/>
      <Why/>
      <Feature/>
      <Footer/>
    </>
  )
}

export default Home