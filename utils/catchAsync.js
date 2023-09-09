module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next); // catch block will automatically call the next function with the err parameter
  };
};
