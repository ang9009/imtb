import React from "react";
import AuthButton from "./AuthButton";
import Link from "next/link";
import Searchbar from "../widgets/Searchbar";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div className="logo-and-searchbar-container">
          <Link href={`/`}>
            <h1 className="logo">ITDb</h1>
          </Link>
          <Searchbar />
        </div>
        <ul>
          <li>
            <Link href={`/toilets/leaderboard`}>
              <p>Leaderboard</p>
            </Link>
          </li>
          <li>
            <Link href={`/map`}>
              <p>Map</p>
            </Link>
          </li>
          <li>
            <AuthButton />
          </li>
        </ul>
      </div>

      <style jsx>{`
        .logo-and-searchbar-container {
          display: flex;
          align-items: center;
          width: 50%;
        }

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
          cursor: pointer;
        }

        ul li:not(:first-child) {
          margin-left: 30px;
        }

        @media screen and (max-width: 700px) {
          .nav-container {
            flex-direction: column;
            align-items: center;
            width: 100%;
          }

          .logo-and-searchbar-container {
            width: 100%;
          }

          ul {
            width: 100%;
            margin-top: 40px;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
