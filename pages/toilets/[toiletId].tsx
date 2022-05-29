import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getToilet from "../../queries/getToilet";
import { useRouter } from "next/router";

const ToiletPage = () => {
  const router = useRouter();
  const toiletId = router.query.toiletId as string;

  const {
    data: { data: toilet, error },
  } = useQuery(["toilet", toiletId], () => getToilet(toiletId));

  return (
    <>
      {error ? (
        <p className="error-message">{error.message}</p>
      ) : (
        <div className="page-container">
          <h1>{toilet.name}</h1>
        </div>
      )}

      <style jsx>{`
        .error-message {
          text-align: center;
          margin-top: 40px;
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
