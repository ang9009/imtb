import supabase from "../lib/supabase";
import Toilet from "../types/Toilet.interface";

const getToilet = async (toiletId: string) => {
  const result = await supabase
    .from<Toilet>("toilets")
    .select("*")
    .eq("id", toiletId)
    .maybeSingle();
  return result;
};

export default getToilet;
