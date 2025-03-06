import React from 'react'
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="hero-container p-4 grid grid-cols-1
     md:grid-cols-2 items-center mt-[-20px]">
        <div className="hero-content">

          <h1 className='text-5xl font-bold p-1.5  mb-6'>Find the best
            solution together.</h1>
            <br />
          <span className='m-1 p-1.5 bg-clip-text text-xl text-transparent bg-gradient-to-r from-blue-600 to-purple-600 '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla provident commodi, non, deserunt unde veritatis ullam autem magni esse maiores nam odit! Magnam, suscipit numquam?
          </span>
          <div className='mt-6 flex md:justify-start md:ml-2.5 justify-center'>
            <Link to="/home">
              <button className='text-xl text-blue-600  px-10 py-1 border-blue-600 border-double border-2 hover:border hover:bg-gradient-to-r from-cyan-500 to-blue-500 hover:text-white pb-2 rounded-full font-semibold hover:scale-105 transition-all duration-500 shadow-cyan-200 shadow-[_3px_3px_5px_rgb(205_194_194/_0.5)]'>Get Started </button>
            </Link>
            
          </div>
        </div>
        <div className="hero-image  rounded-full flex justify-center items-center">
          <img src={logo} alt="MediCheck" className='w-[400px] lg:w-[500px]' />
        </div>
      </div>

    </>
  )
}

export default Hero