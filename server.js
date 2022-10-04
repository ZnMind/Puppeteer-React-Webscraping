const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');

const app = express();
app.use(cors());

async function startBrowser() {
    let browser;
    try {
        console.log("Opening the browser......");
        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-setuid-sandbox"],
            'ignoreHTTPSErrors': true
        });
    } catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
    return browser;
}

const scraperObject = {
    url: 'https://lol.fandom.com/wiki/LCS/2022_Season/Summer_Season',
    async scraper(browser) {
        try {
            let page = await browser.newPage();
            console.log(`Navigating to ${this.url}...`);
            await page.goto(this.url, { waitUntil: 'load', timeout: 0 });
            await page.waitForSelector('.main-container');
            let team = await page.$$eval('.wide-content-scroll .wikitable tbody tr td span .teamname', res => {
                res = res.map(el => el.innerText)
                return res;
            })
            let winner = await page.$$eval('.wide-content-scroll .wikitable tbody tr .md-winner', res => {
                res = res.map(el => el.innerText)
                return res;
            })
            let game = {};
            for (let i = 0; i < team.length; i++) {
                if (i % 2 == 0) {
                    game['game' + (i / 2 + 1)] =
                    {
                        "team1": team[i],
                        "team2": team[i + 1],
                        "winner": winner[(i / 2)]
                    }
                }
            }
            return game;
        } catch (err) {
            console.log(err);
        } finally {
            await browser.close();
        }
    }
}

async function scrapeAll(browserInstance) {
    let browser;
    try {
        browser = await browserInstance;
        let data = await scraperObject.scraper(browser);
        return data;
    }
    catch (err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

app.get("/scrape", async (req, res) => {
    scraperObject.url = req.query.value;
    let browserInstance = await startBrowser();
    let data = await scrapeAll(browserInstance);
    console.log(data)
    res.json(data);
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})