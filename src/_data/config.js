module.exports = {
  env: process.env.ELEVENTY_ENV || 'development',
  release: (new Date()).toLocaleString(),
  age: new Date().getFullYear() - new Date(1993, 0, 7).getFullYear()
};
