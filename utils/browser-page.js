import puppeteer, { KnownDevices } from 'puppeteer';

/**
 * @param {string} url The URL to open.
 * @param {(page: import('puppeteer').Page, response: import('puppeteer').HTTPResponse) => Promise<void>} callback The callback to run once the page is loaded.
 * @param {boolean} [mobile=false] Whether to emulate a mobile device.
 * @param {string[]} [blocked=[]] An array of domain names to block.
 */
export default async (url, callback, mobile = false, blocked = []) => {
    const browser = await puppeteer.launch(mobile ? {} : { defaultViewport: { width: 1920, height: 1080 } });
    try {
        const pages = await browser.pages();
        const page = pages.length ? pages[0] : await browser.newPage();

        // Enable request interception
        await page.setRequestInterception(true);

        // Emulate mobile if needed
        if (mobile) await page.emulate(KnownDevices['iPhone 11']);

        // Add no-cache for the navigation requests
        page.on('request', request => {
            // If a blocked domain is requested, abort the request
            const domain = new URL(request.url()).hostname;
            if (blocked.includes(domain)) return request.abort();

            // Do nothing in case of non-navigation requests.
            if (!request.isNavigationRequest()) {
                request.continue();
                return;
            }

            // Add a new header for navigation request.
            const headers = request.headers();
            headers['Pragma'] = 'no-cache';
            headers['Cache'] = 'no-cache';
            headers['Cache-Control'] = 'no-cache';
            request.continue({ headers });
        });

        // Make the page request and check response
        const response = await page.goto(url, { waitUntil: 'domcontentloaded' });
        if (!response.ok()) throw new Error(`HTTP request failed: ${response.status()} ${response.statusText()}`);

        // Run the callback and screenshot on error
        try {
            await callback(page, response);
        } catch (err) {
            const screenshot = await page.screenshot({ fullPage: true });
            console.error(`data:image/png;base64,${screenshot.toString('base64')}`);
            throw err;
        }
    } finally {
        // Close the browser
        await browser.close();
    }
};
