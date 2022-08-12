import supabase from "../lib/supabase";
import Toilet from "../types/toilet.interface";
import Review from "../types/review.interface";

const getSearchedToilets = async (query: string) => {
  const result = await supabase
    .from<Toilet & { reviews: Review[] }>("toilets")
    .select("*,reviews(*)")
    .textSearch("name", query, {
      type: "websearch",
    });

  return result;
};

export default getSearchedToilets;
