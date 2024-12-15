import React from 'react';
import { Link } from 'react-router-dom';
import NewsTimeline from './News';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">BRM TechNest</h1>
        <p className="home-description">
        The BRM Technology Material Database is designed to be a comprehensive 
        reference application, offering a standard materials database and a collection 
        of practical calculators tailored for engineers across various fields. It is entirely 
        free to use, and we welcome your feedback and suggestions for improvement. 
        If you’d like to contribute to enhancing this app by adding new 
        databases or calculators, please don't hesitate to <Link to="/contact">contact us</Link>.
        </p>
        <h6 className="home-signature">BRM</h6>
      </div>
      <NewsTimeline />
    </div>
  );
};

export default Home;
