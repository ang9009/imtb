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
import getAverageRating from "../../utils/getAverageRating";
import ReviewsSection from "../../components/ui/ReviewsSection";

const ToiletPage = () => {
  const [user, setUser] = useState(null);
  const [userRating, setUserRating] = useState<number>(null);
  const router = useRouter();
  const toiletId = router.query.toiletId as string;

  //Fetches toilet data
  const {
    data: { data: toilet, error },
  } = useQuery(["toilet", toiletId], () => getToilet(toiletId));

  //Updates user object/state
  useEffect(() => {
    setUser(supabase.auth.user());

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });
  }, []);

  useEffect(() => {
    if (user) {
      const userReview = toilet?.reviews.find(
        (review) => review.user_id === user.id
      );

      setUserRating(userReview?.rating);
    }
  }, [user]);

  return (
    <>
      {error ? (
        <p className="error-message">{error.message}</p>
      ) : (
        <div className="page-container">
          <img
            src={
              supabase.storage.from("images").getPublicUrl(toilet?.image_url)
                .data.publicURL
            }
            alt={"unavailable"}
            className="toilet-image"
          />
          <div className="toilet-information-container">
            <div>
              <div className="gender-tag">{capitalise(toilet?.gender)}</div>
              <Rating
                ratingValue={0}
                initialValue={getAverageRating(toilet)}
                readonly
                size={25}
              />
            </div>

            <h1 className="toilet-name">{toilet?.name}</h1>

            <div className="toilet-stats-container">
              <div className="toilet-stat">
                <p>Your rating</p>
                {userRating ? (
                  <div>
                    <h1>
                      {userRating}
                      <span className="rating-denominator">/5</span>
                    </h1>
                  </div>
                ) : (
                  <h1>N/A</h1>
                )}
              </div>

              <div className="toilet-stat">
                <p>Average overall rating</p>
                {getAverageRating(toilet) ? (
                  <div>
                    <h1>
                      {getAverageRating(toilet)}
                      <span className="rating-denominator">/5</span>
                    </h1>
                  </div>
                ) : (
                  <h1>N/A</h1>
                )}
              </div>

              <div
                className="toilet-stat"
                onClick={() =>
                  router.push(`/map?lat=${toilet.lat}&lng=${toilet.lng}`)
                }
              >
                <p>View on map</p>
                <FaMapMarkedAlt size={35} />
              </div>
            </div>

            <h1 className="primary-heading">
              {toilet?.reviews.length} Reviews
            </h1>
            {user && !userRating && (
              <PrimaryButton
                text={"+ Add review"}
                mt={"15px"}
                onClick={() => router.push(`/toilets/add-review/${toiletId}`)}
              />
            )}
          </div>

          <div>
            <ReviewsSection reviews={toilet?.reviews} hasImage={false} />
          </div>
        </div>
      )}

      <style jsx>{`
        .toilet-image {
          width: 100%;
          height: 500px;
          object-fit: cover;
          border-radius: 12px;
          margin-top: 40px;
        }

        .error-message {
          text-align: center;
          margin-top: 40px;
        }

        .toilet-name {
          margin-top: 20px;
          text-align: center;
        }

        .toilet-information-container {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 20px;
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
          color: var(--secondaryTextColor);
          margin-bottom: 5px;
          font-size: 12px;
        }

        .rating-denominator {
          color: var(--secondaryTextColor);
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
