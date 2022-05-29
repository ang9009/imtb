import React from "react";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

const Map = dynamic(() => import("../../components/ui/Map"), {
  ssr: false,
});

const MapPage = () => {
  return (
    <>
      <Map />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};

export default MapPage;
