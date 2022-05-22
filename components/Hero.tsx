import React from "react";

const Hero = () => {
  return (
    <>
      <div className="container">
        <img src="" alt="" />
        <div className="hero-description">
          <p>Latest toilet</p>
          <div>
            <h1>Shit toilet</h1>
            <div className="gender-tag">Male</div>
          </div>
        </div>
        <div className="widgets-container">
          <div className="toilet-map">
            <img src="" alt="" />
            <h1>View toilet map</h1>
          </div>
          <div className="leaderboards">
            <img src="" alt="" />
            <h1>View leaderboards</h1>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
          padding: 50px;
        }

        img {
        }

        .hero-description div {
          display: flex;
          align-items: center;
        }

        .widgets-container {
          display: flex;
        }
      `}</style>
    </>
  );
};

export default Hero;
