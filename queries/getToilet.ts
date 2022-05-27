import supabase from "../lib/supabase";
import Toilet from "../types/toilet.interface";

const getToilet = async (toiletId: string) => {
  const result = await supabase
    .from<Toilet>("toilets")
    .select("*")
    .eq("id", toiletId)
    .single();
  return result;
};

export default getToilet;
