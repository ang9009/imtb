import React from "react";
import supabase from "../../lib/supabase";
import { GetServerSideProps } from "next";

const ProfilePage = () => {
  return <>{/*<h1>{user.name}</h1>*/}</>;
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
