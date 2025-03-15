import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from '../Components/Header';
import Welcome from "../Components/Welcome";
import Main from "../Components/Main";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <Welcome />
      <Main />
      <Footer />
    </>
  );
};

export default Home;
