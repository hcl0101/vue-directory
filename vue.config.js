module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  entry: {
    app:  ["babel-polyfill", "./src/main.js"]
  },
};