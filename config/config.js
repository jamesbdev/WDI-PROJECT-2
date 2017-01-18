module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost/bibim-App',
  secret: process.env.SECRET || 'korean restaurants are pretty great'
};
