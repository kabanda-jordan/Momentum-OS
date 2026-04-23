export const formatDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

export const formatShortDate = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });

export const getDaysRemaining = (value) => {
  const now = new Date();
  const target = new Date(value);
  const difference = target.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0);
  return Math.ceil(difference / (1000 * 60 * 60 * 24));
};
