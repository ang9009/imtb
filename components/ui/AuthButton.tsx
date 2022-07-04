import React, { useEffect, useState } from "react";
import signIn from "../../utils/signIn";
import supabase from "../../lib/supabase";
import signOut from "../../utils/signOut";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthButton = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setUser(supabase.auth.user());

    supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user);
    });
  }, []);

  return (
    <>
      {user ? (
        <Menu
          menuButton={<p className="user-name">{user.user_metadata.name}</p>}
          transition
          menuStyle={{ marginTop: "10px", zIndex: "1000" }}
          align={"end"}
        >
          <MenuItem onClick={() => router.push(`/users/${user.id}`)}>
            <p>Profile</p>
          </MenuItem>
          <MenuItem onClick={() => router.push(`/toilets/add-toilet`)}>
            <p>Add toilet</p>
          </MenuItem>
          <MenuItem onClick={signOut}>
            <div>Sign out</div>
          </MenuItem>
        </Menu>
      ) : (
        <div onClick={signIn}>Sign in</div>
      )}
    </>
  );
};

export default AuthButton;
