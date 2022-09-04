import React, { useEffect } from "react";
import Hero from "../components/ui/Hero";
import ToiletSection from "../components/ui/ToiletSection";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getAllToilets from "../queries/getAllToilets";
import getRecentToilet from "../queries/getRecentToilet";
import getTrendingToilets from "../queries/getTrendingToilets";

const HomePage: React.FC = () => {
  const {
    data: { data: toilets },
  } = useQuery("toilets", () => getAllToilets());

  const {
    data: { data: trendingToilets },
  } = useQuery("trendingToilets", () => getTrendingToilets());
  console.log(trendingToilets);

  return (
    <>
      <Hero />
      <div className="page-container">
        <h1 className="primary-heading">Trending toilets</h1>
        <ToiletSection toilets={trendingToilets} />

        <h1 className="primary-heading">Latest toilets</h1>
        <ToiletSection toilets={toilets.slice(0, 8)} />
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("toilets", () => getAllToilets());
  await queryClient.prefetchQuery("recentToilet", () => getRecentToilet());
  await queryClient.prefetchQuery("trendingToilets", () =>
    getTrendingToilets()
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
