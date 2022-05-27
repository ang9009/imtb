import supabase from "../lib/supabase";

async function signIn() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });
}

export default signIn;
