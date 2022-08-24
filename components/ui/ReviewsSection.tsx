import React from "react";
import supabase from "../../lib/supabase";

const ReviewsSection = ({ reviews, hasImage }) => {
  return (
    <>
      {reviews?.map((review) => (
        <div key={review.id} className="review-container">
          <div className="review-information-container">
            {/*<img*/}
            {/*  src={*/}
            {/*    supabase.storage.from("images").getPublicUrl(review.image_url)*/}
            {/*      .data.publicURL*/}
            {/*  }*/}
            {/*  alt={"unavailable"}*/}
            {/*  className="toilet-image"*/}
            {/*/>*/}
            <h1>{review.user_name}</h1>
            <p>{review.rating}/5</p>
          </div>
          <p className="review-message">{review.message}</p>
        </div>
      ))}

      <style jsx>{`
        .review-information-container {
          display: flex;
          align-items: center;
        }

        .review-information-container p {
          margin-left: 10px;
          color: var(--secondaryTextColor);
          font-size: 17px;
        }

        .review-message {
          color: var(--secondaryTextColor);
          margin-top: 10px;
        }
        .review-container {
          margin-top: 40px;
        }
      `}</style>
    </>
  );
};

export default ReviewsSection;
