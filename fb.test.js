/**
 * @jest-environment jest-environment-webdriver
 */

const url = "https://www.facebook.com/";
const user= ''
const password= ''

beforeAll(async () => {
    await browser.manage().deleteAllCookies();
});
// afterAll(async () => {
            
//             // deletes all cookies
//             await browser.manage().deleteAllCookies();
       
// });
describe('LOGIN', () => {

test("login success1", async () => {
 await browser.manage().window().maximize();
 await browser.get(url);
 const originalWindow = await browser.getWindowHandle();
 expect((await browser.getAllWindowHandles()).length).toEqual(1);
   
 const url2= await browser.getCurrentUrl().toString();
 expect(url2).toMatch('https://www.facebook.com/');
}, 
30000);

test("login success", async () => {
  // let chromeoptions = new chrome.Options();
  // chromeoptions.addArguments("--incognito");
  

  /**
   * Store the ID of the original window
   */
  const originalWindow = await browser.getWindowHandle();

  const username = await browser.findElement(by.css("#email"));
  await username.sendKeys(user);
  const pass = await browser.findElement(by.css("#pass"));
  await pass.sendKeys(password);
  const submit = await browser.findElement(by.css("#u_0_b"));
  await submit.click();
  
  /**
   * Wait for the new window or tab in 10 seconds.
   * Assume that the browser is opening a new window so we make sure the total window/tab less than equal 2.
   */
 await browser.wait(async () => (await browser.getAllWindowHandles()).length <= 2, 10000);
/**
   * Loop through until we find a new window/tab to handle handle
   */
  const windows = await browser.getAllWindowHandles();
  windows.forEach(async (handle) => {
    if (handle !== originalWindow) {
      await browser.switchTo().window(handle);
    }
  });
  if (await browser.findElements(by.tagName("a[aria-label=\"Dyah\"] .a8c37x1j.ni8dbmo4")).size==0) {
  await submit.click();
} 
 try {
    await until.elementLocated(by.tagName("a[aria-label=\"Dyah\"] .a8c37x1j.ni8dbmo4"),30000);
    const title = await browser.findElement(by.tagName("a[aria-label=\"Dyah\"] .a8c37x1j.ni8dbmo4"),{ waitUntil: "domcontentloaded" }).getText();
  } catch (e) {
    expect(e).toMatch('error');
  }
   
  const title = await browser.findElement(by.tagName("a[aria-label=\"Dyah\"] .a8c37x1j.ni8dbmo4"),30000).getText();
  await expect(title).toContain("Dyah");


},
30000);

   
});
