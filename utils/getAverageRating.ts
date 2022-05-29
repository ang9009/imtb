const getAverageRating = (toilet) => {
  if (toilet.reviews.length === 0) return null;

  const totalRating = toilet.reviews.reduce(
    (acc, review) => acc + review.rating,
    0
  );

  return totalRating / toilet.reviews.length;
};

export default getAverageRating;
