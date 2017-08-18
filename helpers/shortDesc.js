module.exports = (string) => {
  let max = 150
  return (string.length > max) ? string.substr(0, max-1) + '...' : string;
};
