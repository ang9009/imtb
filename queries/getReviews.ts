import supabase from "../lib/supabase";
import Review from "../types/review.interface";

const getReviews = async (toiletId: string) => {
  const result = await supabase
    .from<Review>("reviews")
    .select("*")
    .eq("toilet_id", toiletId);

  return result;
};

export default getReviews;
