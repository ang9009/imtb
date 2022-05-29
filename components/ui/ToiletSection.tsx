import React from "react";
import Link from "next/link";
import Toilet from "../../types/toilet.interface";
import capitalise from "../../utils/capitalise";
import { useQuery } from "react-query";
import getToilets from "../../queries/getToilets";
import supabase from "../../lib/supabase";
import getAverageRating from "../../utils/getAverageRating";
import { Rating } from "react-simple-star-rating";

const ToiletSection = ({ toilets }) => {
  return (
    <>
      <section>
        {toilets.map((toilet) => {
          return (
            <Link href={`/toilets/${toilet.id}`} key={toilet.id}>
              <div className="listing-card">
                <div className="image-container">
                  <img
                    src={
                      supabase.storage
                        .from("images")
                        .getPublicUrl(toilet.image_url).data.publicURL
                    }
                    alt="Image not available"
                    className="listing-image"
                  />
                </div>
                <div className="listing-information">
                  <div className="rating-name-container">
                    <h1 className="listing-name">{capitalise(toilet.name)}</h1>{" "}
                    <div className="tag">{capitalise(toilet.gender)}</div>
                  </div>
                  <div>
                    <Rating
                      ratingValue={0}
                      initialValue={getAverageRating(toilet)}
                      readonly
                      size={20}
                    />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </section>

      <style jsx>{`
        section {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 350px;
          grid-row-gap: 40px;
          grid-column-gap: 30px;
          width: 100%;
          margin-bottom: 160px;
        }

        .rating-name-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        .listing-card {
          width: 100%;
          height: 100%;
          background: #fff;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          cursor: pointer;
          transition: 0.2s all;
          box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 15px -3px,
            rgba(0, 0, 0, 0.05) 0px 4px 6px -2px;
        }

        .listing-name {
          white-space: nowrap;
          word-wrap: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .tag {
          font-size: 9px;
          display: inline;
          padding: 3px 8px;
          font-weight: 800;
          color: #3e5b70;
          background: #85c8f9;
          border-radius: 5px;
        }

        .image-container {
          position: relative;
          width: 100%;
          height: 245px;
        }

        .listing-information {
          padding: 15px;
          width: 100%;
          height: 30%;
          z-index: 3000;
          background: #fff;
        }
      `}</style>
    </>
  );
};

export default ToiletSection;
