const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Proxy hedef URL'si
const targetUrl = 'http://oha.to';

// Proxy middleware ayarları
app.use('/addon.watched', createProxyMiddleware({
  target: targetUrl,
  changeOrigin: true,
  onProxyReq: (proxyReq, req, res) => {
    // User-Agent başlığını varsayılan değeri kullanacak şekilde ayarla
    proxyReq.setHeader('User-Agent', req.headers['user-agent'] || '');
  }
}));

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor...`);
});
