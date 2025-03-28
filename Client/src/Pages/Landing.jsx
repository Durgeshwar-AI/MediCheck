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
      <div className='max-w-screen-lg mx-auto'>
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