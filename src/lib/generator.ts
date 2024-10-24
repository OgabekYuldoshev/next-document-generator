import puppeteer, { type Page, type Browser } from "puppeteer";

const maxRunningTime = 60 * 60 * 1000;

class Generator {
    private browser: Browser | null = null;

    private async getBrowser() {
        if (this.browser) {
            return this.browser;
        }

        const browser = await puppeteer.launch({
            args: [
                "--no-sandbox",
                "--disable-setuid-sandbox",
                "--disable-dev-shm-usage",
                "--disable-accelerated-2d-canvas",
                "--no-first-run",
                "--no-zygote",
                "--disable-gpu",
                "--disable-web-security",
            ],
        });

        (browser as any).__BROWSER_START_TIME_MS__ = Date.now();

        this.browser = browser

        return browser;
    }

    private async cleanup(browser: Browser) {
        if (
            Date.now() - (browser as any).__BROWSER_START_TIME_MS__ >=
            maxRunningTime
        ) {
            await this.getBrowser()
        }
    }

    private async pdf({ content }: { content: string }) {
        let page: Page | null = null;
        try {
            const browser = await this.getBrowser();
            console.log(browser)
            page = await browser.newPage();
            await page.setContent(content, { waitUntil: ['domcontentloaded', 'load'] });

            return await page.pdf({
                preferCSSPageSize: true,
                displayHeaderFooter: false,
                headerTemplate: "<div></div>",
                footerTemplate: '<div></div>',
                printBackground: true,
                scale: 1,
                margin: {
                    top: '2cm',
                    left: '1.5cm',
                    bottom: '2cm',
                    right: '1.5cm',
                },
            });
        } finally {
            if (page) {
                await page.close();
                page = null;
            }
            if (this.browser) {
                await this.cleanup(this.browser);
            }
        }
    }

    generate({ content }: { content: string }) {
        return this.pdf({ content });
    }
}

export default new Generator();
