import supabase from "../lib/supabase";
import getDateXDaysAgo from "../utils/getDateXDaysAgo";
import Review from "../types/review.interface";
import Toilet from "../types/toilet.interface";

const getTrendingToilets = async () => {
  const { data: reviews, error } = await supabase
    .from<Review>("reviews")
    .select("*")
    .gt("created_at", getDateXDaysAgo(2).toISOString().toLocaleString());

  if (error) throw new Error(error.message);

  const occurrenceMap: { [key: string]: number } = {};

  reviews.forEach((review) => {
    occurrenceMap[review.toilet_id] =
      (occurrenceMap[review.toilet_id] || 0) + 1;
  });

  const toiletIds = Object.keys(occurrenceMap).sort(
    (a, b) => occurrenceMap[b] - occurrenceMap[a]
  );

  const result = await supabase
    .from<Toilet & { reviews: Review[] }>("toilets")
    .select("*,reviews(*)")
    .in("id", toiletIds.splice(0, 4));

  return result;
};

export default getTrendingToilets;
