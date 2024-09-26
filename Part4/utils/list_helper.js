const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  const totalLikes = (sum, curr) => sum + curr.likes;
  return blogs.reduce(totalLikes, 0);
};
module.exports = {
  dummy,
  totalLikes,
};
