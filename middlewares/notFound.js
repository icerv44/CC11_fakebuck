module.exports = (req, res) => {
  res.status(404).json({ message: "resiurce not found on this server" });
};
