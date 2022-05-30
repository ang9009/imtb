import React from "react";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getToiletsOrderedByRank from "../../queries/getToiletsOrderedByRank";
import Link from "next/link";

const LeaderboardPage = () => {
  const {
    data: { data: rankedToilets },
  } = useQuery("rankedToilets", () => getToiletsOrderedByRank());

  return (
    <>
      <section className="page-container">
        <h1 className="leaderboard-heading">Toilet leaderboard</h1>
        {rankedToilets.map((toilet, i) => {
          return (
            <Link href={`/toilets/${toilet.id}`} key={toilet.id}>
              <p className="toilet">
                {i + 1}. {toilet.name}
              </p>
            </Link>
          );
        })}
      </section>

      <style jsx>{`
        .leaderboard-heading {
          font-size: 35px;
          text-align: center;
          margin-top: 30px;
        }

        .toilet {
          margin-top: 5px;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default LeaderboardPage;

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("rankedToilets", () =>
    getToiletsOrderedByRank()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};
