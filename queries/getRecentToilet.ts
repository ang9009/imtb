import supabase from "../lib/supabase";
import Toilet from "../types/toilet.interface";
import Review from "../types/review.interface";

const getRecentToilet = async () => {
  const result = await supabase
    .from<Toilet & { reviews: Review[] }>("toilets")
    .select("*,reviews(*)")
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  return result;
};

export default getRecentToilet;
