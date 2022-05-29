import React from "react";

const Hero = () => {
  return (
    <>
      <div className="container">
        <img className="hero-img" src="/images/placeholder.jpg" alt="qwer" />
        <div className="inner-container">
          <div className="hero-description">
            <p>Latest toilet</p>
            <div>
              <h1>Bing chilling toilet</h1>
              <div className="gender-tag">Male</div>
            </div>
          </div>
          <div className="widgets-container">
            <div className="toilet-map">
              <img src="components/ui/Hero" alt="" />
              <h1>View toilet map</h1>
            </div>
            <div className="leaderboards">
              <img src="components/ui/Hero" alt="" />
              <h1>View leaderboards</h1>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .widgets-container div {
          position: relative;
        }

        .widgets-container img {
          position: absolute;
        }

        .container {
          width: 100%;
          height: 600px;
          position: relative;
          margin-bottom: 160px;
        }

        .inner-container {
          padding: 50px;
          width: 70%;
          position: absolute;
          bottom: -20%;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
        }

        .hero-img {
          width: 100%;
          height: 100%;
        }

        .hero-description {
          margin-bottom: 15px;
        }

        .hero-description div {
          display: flex;
          align-items: center;
        }

        .widgets-container {
          display: flex;
          width: 100%;
          height: 150px;
          border: 2px solid red;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
        }
      `}</style>
    </>
  );
};

export default Hero;
