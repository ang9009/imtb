import supabase from "../lib/supabase";

const getToiletsOrderedByRank = async () => {
  const result = await supabase.rpc("get_toilets_ordered_by_rank");

  return result;
};

export default getToiletsOrderedByRank;
