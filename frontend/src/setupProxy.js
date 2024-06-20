const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ratna-real-estate.onrender.com/',
      changeOrigin: true,
    })
  );
};
