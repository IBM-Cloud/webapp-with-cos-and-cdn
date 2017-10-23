const fs = require('fs');
const express = require('express');
const app = express();

app.get('*', (req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    const page = data.toString()
      .split('__CDN_URL__')
      .join(`https://${process.env.CDN_CNAME}`);
    res.setHeader('Content-Type', 'text/html');
    res.send(page);
  });
});

const port = process.env.PORT || 8080;
app.listen(port, function(){
  console.info(`server listening on http://localhost:${port}/`);
});
