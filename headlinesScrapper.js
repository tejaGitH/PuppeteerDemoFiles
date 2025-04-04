const puppeteer = require('puppeteer');

async function scrapeHeadlines() {
    //launch the browser in headless mode
    const browser = await puppeteer.launch({headless: false});
    //creates a newpage(tab) in the browser
    const page = await browser.newPage();
try{
      //go to news website
      await page.goto('https://www.theguardian.com/world', {waitUntil: 'networkidle2'});
        // Wait for the headlines to be present in the DOM(prevents issue when the content is dynamically loaded)
        await page.waitForSelector('h2');
      //Extract headlines(evaluate() runs the js code in the browser's context)
      const headlines = await page.evaluate(()=>{
          return Array.from(document.querySelectorAll('h2')).map((el)=>el.textContent.trim());
      });
      console.log('News Headlines:', headlines);
    }catch(error){
        console.error('Error:', error);
    }finally{
        await browser.close();
    }
      
}
//run the function
scrapeHeadlines();

