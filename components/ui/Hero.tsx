import React from "react";
import { useQuery } from "react-query";
import getToilets from "../../queries/getToilets";
import getRecentToilet from "../../queries/getRecentToilet";
import capitalise from "../../utils/capitalise";
import { Rating } from "react-simple-star-rating";
import getAverageRating from "../../utils/getAverageRating";
import supabase from "../../lib/supabase";

const Hero = () => {
  const {
    data: { data: recentToilet },
  } = useQuery("recentToilet", () => getRecentToilet());
  console.log(recentToilet);

  return (
    <>
      <div className="container">
        <img
          className="hero-img"
          src={
            supabase.storage.from("images").getPublicUrl(recentToilet.image_url)
              .data.publicURL
          }
          alt="qwer"
        />
        <div className="inner-container">
          <div className="hero-description">
            <div>
              <p>Most recently posted</p>
              <div className="toilet-name-and-tag">
                <h1>{recentToilet.name}</h1>
                <div className="gender-tag">
                  {capitalise(recentToilet.gender)}
                </div>
              </div>
            </div>
            <Rating
              ratingValue={0}
              initialValue={getAverageRating(recentToilet)}
              readonly
              fillColor={"white"}
              emptyColor={"black"}
            />
          </div>
          <div className="widgets-container">
            <div className="toilet-map-button">
              <h1>View toilet map</h1>
            </div>
            <div className="leaderboard-button">
              <h1>View leaderboards</h1>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .widgets-container {
          display: flex;
          width: 100%;
          height: 150px;
          border-radius: 12px;
          overflow: hidden;
        }

        .widgets-container div {
          width: 50%;
          height: 100%;
          display: grid;
          place-items: center;
        }

        .toilet-map-button {
          background: url("/images/map.jpg");
        }

        .leaderboard-button {
          background: url("/images/leaderboard.jpg");
        }

        .container {
          width: 100%;
          height: 600px;
          position: relative;
          margin-bottom: 160px;
        }

        .inner-container {
          padding: 50px;
          width: 95%;
          position: absolute;
          bottom: -20%;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
        }

        .hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hero-description {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .toilet-name-and-tag {
          display: flex;
          align-items: center;
        }

        .gender-tag {
          font-size: 10px;
          margin-left: 20px;
          display: inline;
          padding: 3px 8px;
          font-weight: 800;
          color: #3e5b70;
          background: #85c8f9;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};

export default Hero;
