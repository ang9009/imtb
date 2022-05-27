import supabase from "../lib/supabase";

const signOut = async () => {
  await supabase.auth.signOut();
};

export default signOut;
