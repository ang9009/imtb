import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getUser from "../../queries/getUser";
import ReviewsSection from "../../components/ui/ReviewsSection";

const ProfilePage = () => {
  const router = useRouter();
  const userId = router.query.userId as string;
  const {
    data: { data: user, error },
  } = useQuery(["user", userId], () => getUser(userId));
  console.log(user);

  return (
    <>
      <section className="page-container">
        <h1 className="user-name">{user.name}</h1>

        <h1>{user.name}'s reviews</h1>
        <ReviewsSection reviews={user.reviews} />
      </section>

      <style jsx>{`
        .user-name {
          width: 100%;
          text-align: center;
          margin-top: 30px;
          font-size: 40px;
        }
      `}</style>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId = context.query.userId as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["user", userId], () => getUser(userId));

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
