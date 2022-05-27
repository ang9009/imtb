import React from "react";
import AuthButton from "./AuthButton";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <div className="nav-container">
        <div>
          <h1 className="logo">IMTb</h1>
        </div>
        <ul>
          <li>
            <Link href={`/`}>Home</Link>
          </li>
          <li>Map</li>
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
