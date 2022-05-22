import React from "react";
import ProfilePicture from "./ProfilePicture";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div>
          <h1 className="logo">IMTb</h1>
        </div>
        <ul>
          <li>Home</li>
          <li>Map</li>
          <li>Leaderboard</li>
          <li>
            <ProfilePicture />
          </li>
        </ul>
      </div>

      <style jsx>{`
        .nav-container {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          padding: 40px 50px;
        }

        .logo {
          font-size: 25px;
        }

        ul {
          display: flex;
          list-style: none;
        }

        ul li {
          margin-left: 30px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Navbar;
