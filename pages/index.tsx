import React, { useEffect } from "react";
import supabase from "../lib/supabase";
import Hero from "../components/Hero";
import ToiletSection from "../components/ToiletSection";
import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import getToilet from "../queries/getToilet";
import getToilets from "../queries/getToilets";

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <div className="page-container">
        <ToiletSection />
      </div>

      <style jsx>{`
        .page-container {
          margin: 0 auto;
          width: 80vw;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery("toilets", () => getToilets());

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default HomePage;
