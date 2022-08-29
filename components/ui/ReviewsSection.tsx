import React from "react";
import supabase from "../../lib/supabase";
import { Rating } from "react-simple-star-rating";
import Link from "next/link";

const ReviewsSection = ({ reviews, hasImage }) => {
  return (
    <>
      {reviews?.map((review) => (
        <div key={review.id} className="review-container">
          <div className="review-information-container">
            {hasImage && (
              <Link href={`/toilets/${review.toilet_id}`}>
                <img
                  src={
                    supabase.storage
                      .from("images")
                      .getPublicUrl(review.toilets.image_url).data.publicURL
                  }
                  alt={"unavailable"}
                  className="toilet-image"
                />
              </Link>
            )}
            <div>
              <div className="name-and-rating-container">
                <Link href={`/users/${review.user_id}`}>
                  <h1 className="username">{review.user_name}</h1>
                </Link>
                <p className="review-rating">| {review.rating}/5</p>
              </div>
              <Rating
                ratingValue={0}
                initialValue={review.rating}
                readonly
                fillColor={"gold"}
                emptyColor={"white"}
              />
              <p className="review-message">"{review.message}"</p>
            </div>
          </div>
        </div>
      ))}

      <style jsx>{`
        .name-and-rating-container {
          display: flex;
          align-items: center;
        }

        .review-information-container {
          display: flex;
          align-items: center;
        }

        .review-information-container p {
          color: var(--secondaryTextColor);
          font-size: 17px;
        }

        .review-message {
          color: var(--secondaryTextColor);
          margin-top: 10px;
          word-wrap: anywhere;
        }

        .review-container {
          margin-top: 40px;
        }

        .toilet-image {
          width: 300px;
          height: 150px;
          object-fit: cover;
          margin-right: 30px;
          border-radius: 10px;
          cursor: pointer;
        }

        .review-rating {
          margin-left: 10px;
        }

        .username {
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default ReviewsSection;
