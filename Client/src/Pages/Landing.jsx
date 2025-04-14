import React from 'react'
import Hero from '../Components/LandingParts/Hero'
import Footer from '../Components/Footer'
import About from '../Components/LandingParts/About'
import Services from '../Components/LandingParts/Services'
import ConnectSmart from '../Components/LandingParts/ConnectSmart'
import Features from '../Components/LandingParts/Features'
import DownloadApp from '../Components/LandingParts/DownloadApp'

const Landing = () => {
  return (
    <>
      <div className='w-screen-lg mx-auto'>
        <Hero/>
        <About/>
        <Services/>
        <ConnectSmart/>
        <Features/>
        <DownloadApp/>
      </div>
      <Footer/>
      
    </>
  )
}

export default Landing