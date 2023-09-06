
// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

(async () => {
  try {
    // Create a browser instance
    const browser = await puppeteer.launch({headless: true});

    // Create a new page
    const page = await browser.newPage();

    

    const website_url = 'https://www.copart.com/vehicleFinderSearch?searchStr=%7B%22MISC%22:%5B%22%23VehicleTypeCode:VEHTYPE_V%22,%22%23DamageTypeCode:DAMAGECODE_FR%22,%22%23OdometerReading:%5B0%20TO%209999999%5D%22,%22%23LotYear:%5B2013%20TO%202024%5D%22%5D,%22sortByZip%22:false,%22buyerEnteredZip%22:null,%22milesAway%22:null%7D%20&displayStr=FRONT%20END,%5B0%20TO%209999999%5D,%5B2013%20TO%202024%5D&from=%2FvehicleFinder';
    
    let auction_hover = '//*[@id="main-container"]/div/app-root/lot-search-results/search-results/div/div[2]/div[2]/search-table-component'
       
    
    // Open URL in current page
    await page.goto(website_url);

    await page.waitForSelector('img')

    await page.waitForTimeout(2000)

    // Capture screenshot
    await page.screenshot({
      path: 'screenshotOnLoad.jpg',
    });

    console.log(`check the screenshotOnLoad. ✨`)

    // Get the first h1 element using page.$x
   // let first_h1_element = await page.$x(auction_tab);

  // Get the textContent of the h1 element
    //let h1_value = await page.evaluate(el => el.textContent, first_h1_element[0])

    

    
    // Evaluate the XPath expression to get the matching element
    let elementHandle = await page.waitForXPath(auction_hover);
    console.log(elementHandle)

    let h1_value = await page.evaluate(el => el.textContent, elementHandle)
    console.log(h1_value)



    //await page.click(auction_selector)
    //await page.waitForSelector('img')

    // Capture screenshot
    await page.screenshot({
      path: 'screenshot.jpg',
    });


    

     
      

    // Close the browser instance
    await browser.close();

    //console.log(h1_value)
    console.log(`All done, check the screenshot. ✨`)
   
  } catch (error) {

    console.error(error);
  }
})();
