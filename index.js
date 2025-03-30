const express = require('express');
const request = require('request');
const app = express();

app.use('/', (req, res) => {
    const targetUrl = 'https://huhu.to' + req.url;
    req.pipe(request(targetUrl)).pipe(res);
});

app.listen(3000, () => console.log('Proxy server running on port 3000'));
