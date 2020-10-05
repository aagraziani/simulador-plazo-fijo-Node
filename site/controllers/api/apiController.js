const puppeteer = require('puppeteer');

let controlador = {

    index: async (req, res) => {

        let tasasUrl = 'http://www.bcra.gov.ar/BCRAyVos/Plazos_fijos_online.asp';

        let browser = await puppeteer.launch();

        let page = await browser.newPage();

        await page.goto(tasasUrl, { waitUntil: 'networkidle2' });

        let data = await page.evaluate(() => {

            let rows = document.querySelectorAll('table tr');

            return Array.from(rows, row => {
                const columns = row.querySelectorAll('td');
                return Array.from(columns, column => column.innerText);
            });
        })

        await browser.close();

        return res.status(200).send(
            { data: data }
        );
    }

};

module.exports = controlador;