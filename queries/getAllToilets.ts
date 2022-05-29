import supabase from "../lib/supabase";
import Toilet from "../types/toilet.interface";
import Review from "../types/review.interface";

const getAllToilets = async () => {
  const result = await supabase
    .from<Toilet & { reviews: Review[] }>("toilets")
    .select("*,reviews(*)");
  return result;
};

export default getAllToilets;
