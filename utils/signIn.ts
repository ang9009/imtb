import supabase from "../lib/supabase";

async function signIn() {
  const { user, session, error } = await supabase.auth.signIn({
    provider: "google",
  });

  // supabase.from("users").insert({ id: user.id, name: user.user_metadata.name });
}

export default signIn;
