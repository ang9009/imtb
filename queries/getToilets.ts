import supabase from "../lib/supabase";

const getToilets = async () => {
  const result = await supabase.from("toilets").select("*");
  return result;
};

export default getToilets;
