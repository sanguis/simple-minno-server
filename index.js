const fs = require('fs');
const express = require('express');
const shortid = require('shortid');

const dataFolder = 'data';
const studyFolder = 'study';
const app = express();

if (!fs.existsSync(dataFolder)) fs.mkdirSync(dataFolder);
if (!fs.existsSync(studyFolder)) fs.mkdirSync(studyFolder);

// serve static files
// serve only index.html from root
app.get('/', (req,res) => res.sendFile(__dirname + '/index.html'));
app.use('/study', express.static(studyFolder));

app.post('/csv', (req, res) => {
    const fileStream = fs.createWriteStream(uniqueFilename());
    req.pipe(fileStream);
    req.on('end', () => res.sendStatus(1));

    function uniqueFilename(){ return `${dataFolder}/${shortid.generate()}.csv`; }
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

