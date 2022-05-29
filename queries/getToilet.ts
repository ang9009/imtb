import supabase from "../lib/supabase";
import Toilet from "../types/toilet.interface";
import Review from "../types/review.interface";

const getToilet = async (toiletId: string) => {
  const result = await supabase
    .from<Toilet & { reviews: Review[] }>("toilets")
    .select("*,reviews(*)")
    .eq("id", toiletId)
    .maybeSingle();

  return result;
};

export default getToilet;
