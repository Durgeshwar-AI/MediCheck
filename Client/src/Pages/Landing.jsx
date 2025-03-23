import React from 'react'
import Hero from '../Components/Hero'
import Footer from '../Components/Footer'
import About from '../Components/About'
import Services from '../Components/Services'
import ConnectSmart from '../Components/ConnectSmart'
import Features from '../Components/Features'
import DownloadApp from '../Components/DownloadApp'

const Landing = () => {
  return (
    <>
      <Hero/>
      <About/>
      <Services/>
      <ConnectSmart/>
      <Features/>
      <DownloadApp/>
      <Footer/>
      
    </>
  )
}

export default Landing