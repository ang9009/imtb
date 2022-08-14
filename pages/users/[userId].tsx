import React from "react";
import supabase from "../../lib/supabase";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

const ProfilePage = () => {
  const router = useRouter();
  const userId = router.query.userId;

  return (
    <>
      <p>test</p>
      <p>test</p>
    </>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  };
};
