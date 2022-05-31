import React from "react";
import AuthButton from "./AuthButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div>
          <Link href={`/`}>
            <h1 className="logo">ITDb</h1>
          </Link>
        </div>
        <ul>
          <li>
            <Link href={`/toilets/leaderboard`}>
              <p>Leaderboard</p>
            </Link>
          </li>
          <li>
            <Link href={`/toilets/map`}>
              <p>Map</p>
            </Link>
          </li>
          <li>
            <AuthButton />
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
          cursor: pointer;
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
