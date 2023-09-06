
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());



(async () => {
  try {
    // Create a browser instance
    const browser = await puppeteer.launch({ headless: true });

    // Create a new page
    const page = await browser.newPage();

    //Navigation items
const website_url =
  "https://www.copart.com/vehicleFinderSearch?searchStr=%7B%22MISC%22:%5B%22%23VehicleTypeCode:VEHTYPE_V%22,%22%23DamageTypeCode:DAMAGECODE_FR%22,%22%23OdometerReading:%5B0%20TO%209999999%5D%22,%22%23LotYear:%5B2013%20TO%202024%5D%22%5D,%22sortByZip%22:false,%22buyerEnteredZip%22:null,%22milesAway%22:null%7D%20&displayStr=FRONT%20END,%5B0%20TO%209999999%5D,%5B2013%20TO%202024%5D&from=%2FvehicleFinder";

let auction_hover =
  '//*[@id="main-container"]/div/app-root/lot-search-results/search-results/div/div[2]/div[2]/search-table-component';
    
    // Open URL in current page
    await page.goto(website_url);

    // Capture screenshot
    await page.screenshot({
      path: "screenshotOnLoad.jpg",
    });

    console.log(`check the screenshotOnLoad. ✨`);

    await page.waitForSelector("img");

    await page.waitForTimeout(2000);    

    // Evaluate the XPath expression to get the matching element
    let elementHandle = await page.waitForXPath(auction_hover);
    console.log(elementHandle);

    let h1_value = await page.evaluate((el) => el.textContent, elementHandle);
    //console.log(h1_value);

    // Use page.evaluate to extract the href attribute of the first <a> element
    let hrefValue = await page.evaluate((element) => {
      const firstAnchor = element.querySelector("a"); // Find the first <a> element
      return firstAnchor ? firstAnchor.getAttribute("href") : null; // Get the href attribute
    }, elementHandle);

    console.log(hrefValue);

    //console.log(typeof(hrefValue + website_url))

    if (hrefValue) {
      // Use page.goto to navigate to the URL specified in the href attribute
      await page.goto(website_url + hrefValue);
      
      // Now you are on the new page, and you can perform actions or extract data as needed.
      await page.waitForSelector('img')// wait for an image to appear

      await page.waitForTimeout(2000); 

      await page.screenshot({
        path: "screenshotOnCarPage.jpg",
      });
    }
    


    // Capture screenshot
    await page.screenshot({
      path: "screenshotOnClose.jpg",
    });

    // Close the browser instance
    await browser.close();

    //console.log(h1_value)
    console.log(`All done, check the screenshot. ✨`);
  } catch (error) {

    console.error(error);
  }
})();
