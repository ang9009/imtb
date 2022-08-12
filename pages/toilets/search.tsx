import React from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import ToiletSection from "../../components/ui/ToiletSection";
import { dehydrate, QueryClient, useQuery } from "react-query";
import getToilet from "../../queries/getToilet";
import getSearchedToilets from "../../queries/getSearchedToilets";

const SearchPage = () => {
  const router = useRouter();
  const query = router.query.q as string;

  const {
    data: { data: toilets, error },
  } = useQuery(["searchedToilets", query], () => getSearchedToilets(query));
  console.log(toilets);

  return (
    <>
      <div className="page-container">
        <h1 className="returned-text">
          "{query}" returned {toilets.length} result
          {toilets.length === 1 ? "" : "s"}
        </h1>
        <ToiletSection toilets={toilets} />
      </div>

      <style jsx>{`
        .returned-text {
          margin-top: 30px;
        }
      `}</style>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.q as string;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["searchedToilets", query], () =>
    getSearchedToilets(query)
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default SearchPage;
