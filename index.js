const express = require('express');
const app = express();

const bodyparser = require('body-parser');

const convert = require('json2xml');
const fs = require('fs');

app.use(bodyparser.urlencoded({ 'extended': 'true' }));
app.use(bodyparser.json());
app.use(bodyparser.json({ type: 'application/vdn.api+json' }));

const path = require('path')

app.use(
    express.static(
        path.resolve(__dirname, 'public')
    )
)

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/', 'index.html');
});

app.post('/channel/create', (req, res) => {
    const body = req.body;

    const xmlHeader = `<?xml version="1.0" encoding="UTF-8" ?>\n<?xml-stylesheet type="text/css" href="rss-style.css" ?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n</rss>`;

    const channel = `
    <channel>
        <title>
            ${body.name}
        </title>
    </channel>
</rss>`;

    const fileLoc = path.resolve("test.xml");
    if (!fs.existsSync(fileLoc)) {
        fs.writeFileSync(fileLoc, xmlHeader, "utf-8");
    }

    let file = fs.readFileSync(fileLoc, "utf-8");
    let exists = false;

    file.replace(xmlHeader).split('<channel>').forEach(
        channel => channel.split('<title>').forEach(
            title => {
                if (title.substring(0, title.indexOf('<')) === body.name) {
                    res.status(400).json({ message: "Already exists." });
                    exists = true;
                }
            }
        ));

    if(exists) {
        return;
    }

    file = file.replace("</rss>", channel);

    fs.writeFileSync(fileLoc, file, "utf-8");

    res.status(200).json({channel});
});

app.post('/item/create', (req, res) => {
    const body = req.body;
    
    let description = "";
    Object.keys(body.item).forEach(key => description += body.item[key] + "\n                ");

    const item = `
        <item>
            <description>
                ${description}
            </description>
        </item>`;

    const fileLoc = path.resolve("test.xml");
    let file = fs.readFileSync(fileLoc, "utf-8");

    const channel = `
            ${body.name}
        </title>`;

    const desc = `
        <description>
            ${body.description}
        </description>`;     

    file = file.replace(channel, channel + desc + item);

    fs.writeFileSync(fileLoc, file, "utf-8");

    res.status(200).json(item);
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
