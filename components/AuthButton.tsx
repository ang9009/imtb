import React, { useEffect, useState } from "react";
import signIn from "../utils/signIn";
import supabase from "../lib/supabase";
import signOut from "../utils/signOut";

const AuthButton = () => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    console.log(session);
  }, []);

  return (
    <>
      {session ? (
        <div onClick={signOut}>Sign out</div>
      ) : (
        <div onClick={signIn}>Sign in</div>
      )}
    </>
  );
};

export default AuthButton;
