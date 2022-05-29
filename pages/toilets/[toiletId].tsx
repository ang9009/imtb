import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getToilet from "../../queries/getToilet";
import { useRouter } from "next/router";
import { Rating } from "react-simple-star-rating";
import capitalise from "../../utils/capitalise";
import { FaMapMarkedAlt } from "react-icons/fa";
import supabase from "../../lib/supabase";
import PrimaryButton from "../../components/widgets/PrimaryButton";

const ToiletPage = () => {
  const user = supabase.auth.user();
  const router = useRouter();
  const toiletId = router.query.toiletId as string;
  const [avgRating, setAvgRating] = useState(null);
  const [currUserRating, setCurrUserRating] = useState(null);

  const {
    data: { data: toilet, error },
  } = useQuery(["toilet", toiletId], () => getToilet(toiletId));

  useEffect(() => {
    let ratingSum = 0;

    toilet.reviews.forEach((review) => {
      ratingSum += review.rating;
    });

    setAvgRating(Math.round(ratingSum / toilet.reviews.length));

    //how do u do this again
    setCurrUserRating(
      toilet.reviews.find((review) => review.user_id === user.id)?.rating
    );
  }, [toilet]);

  return (
    <>
      {error ? (
        <p className="error-message">{error.message}</p>
      ) : (
        <div className="page-container">
          <div className="toilet-information-container">
            <div>
              <div className="gender-tag">{capitalise(toilet.gender)}</div>
              <Rating
                ratingValue={0}
                initialValue={avgRating}
                readonly={true}
                size={25}
              />
            </div>
            <h1 className="toilet-name">{toilet.name}</h1>
            <div className="toilet-stats-container">
              <div className="toilet-stat">
                <p>Your rating</p>
                {currUserRating ? (
                  <h1>
                    {currUserRating}
                    <span className="rating-denominator">/5</span>
                  </h1>
                ) : (
                  <h1>N/A</h1>
                )}
              </div>
              <div className="toilet-stat">
                <p>Average overall rating</p>
                {avgRating ? (
                  <h1>
                    {avgRating}
                    <span className="rating-denominator">/5</span>
                  </h1>
                ) : (
                  <h1>N/A</h1>
                )}
              </div>
              <div className="toilet-stat">
                <p>View on map</p>
                <FaMapMarkedAlt size={35} />
              </div>
            </div>
            <h1 className="primary-heading">{toilet.reviews.length} Reviews</h1>
            <PrimaryButton text={"Add review"} mt={"15px"} />
          </div>
          {toilet.reviews.map((review) => {
            return (
              <>
                <h1>{review.user_name}</h1>
                <p>{review.rating}/5</p>
                <p>{review.message}</p>
              </>
            );
          })}
        </div>
      )}

      <style jsx>{`
        .error-message {
          text-align: center;
          margin-top: 40px;
        }

        .toilet-name {
          margin-top: 20px;
        }

        .toilet-information-container {
          display: flex;
          align-items: center;
          flex-direction: column;
        }

        .toilet-stats-container {
          display: flex;
          margin-top: 30px;
        }

        .gender-tag {
          display: inline;
          padding: 5px 8px;
          border-radius: 5px;
          font-weight: 600;
          margin-right: 20px;
          font-size: 13px;
          color: #3e5b70;
          background: #85c8f9;
        }

        .toilet-stat:not(:last-child) {
          display: flex;
          flex-direction: column;
          align-items: center !important;
          margin-right: 40px;
        }

        .toilet-stat p {
          color: #8b8b8b;
          margin-bottom: 5px;
          font-size: 12px;
        }

        .rating-denominator {
          color: #8b8b8b;
          font-size: 15px;
        }
      `}</style>
    </>
  );
};

export default ToiletPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const toiletId = context.query.toiletId as string;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(["toilet", toiletId], () =>
    getToilet(toiletId)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
