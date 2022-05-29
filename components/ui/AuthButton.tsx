import React, { useEffect, useState } from "react";
import signIn from "../../utils/signIn";
import supabase from "../../lib/supabase";
import signOut from "../../utils/signOut";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Link from "next/link";

const AuthButton = () => {
  const [user, setUser] = useState(null);

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
          <MenuItem>
            <Link href={`/toilets/add-toilet`}>
              <p>Profile</p>
            </Link>
          </MenuItem>
          <MenuItem>
            <Link href={`/toilets/add-toilet`}>
              <p>Add toilet</p>
            </Link>
          </MenuItem>
          <MenuItem>
            <div onClick={signOut}>Sign out</div>
          </MenuItem>
        </Menu>
      ) : (
        <div onClick={signIn}>Sign in</div>
      )}
    </>
  );
};

export default AuthButton;
