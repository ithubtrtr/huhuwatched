const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'addon.watched');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Dosya okunamadı.');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
  });
}
