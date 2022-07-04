import supabase from "../lib/supabase";
import getDateXDaysAgo from "../utils/getDateXDaysAgo";
import Review from "../types/review.interface";
import Toilet from "../types/toilet.interface";

const getTrendingToilets = async () => {
  const { data: reviews, error } = await supabase
    .from<Review>("reviews")
    .select("*")
    .gt("created_at", getDateXDaysAgo(2).toISOString().toLocaleString());
  //Fetch all reviews from the last 2 days

  if (error) throw new Error(error.message);

  const occurrenceMap: { [key: string]: number } = {};
 //Object with properties where the keys are the toiletId and the values are the number of occurrences

  reviews.forEach((review) => {
    occurrenceMap[review.toilet_id] =
      (occurrenceMap[review.toilet_id] || 0) + 1;
  }); //Loop over all reviews, count number of occurrences of each toiletId and add them to the occurrenceMap

  const toiletIds = Object.keys(occurrenceMap).sort(
    (a, b) => occurrenceMap[b] - occurrenceMap[a]
  ); //Sort the properties in occurrenceMap by number of occurrence in descending order, store in toiletIds array

  const result = await supabase
    .from<Toilet & { reviews: Review[] }>("toilets")
    .select("*,reviews(*)")
    .in("id", toiletIds.splice(0, 4));
  //Fetch the first 4 toilet ids from the toiletIds array

  return result;
};

export default getTrendingToilets;
