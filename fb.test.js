/**
 * @jest-environment jest-environment-webdriver
 */

const url = "https://www.facebook.com/";
const user= ''
const password= ''

// beforeAll(async () => {
//   jest.setTimeout(1000000000);
// });
describe('LOGIN', () => {
test("login success", async () => {
  await browser.manage().window().maximize();
  await browser.get(url);
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

 //  await until.elementLocated(by.css("a[aria-label=\"Dyah\"] .a8c37x1j.ni8dbmo4"));
  const title = await browser.findElement(by.css("a[aria-label=\"Dyah\"] .a8c37x1j.ni8dbmo4")).getText();
  await expect(title).toContain("Dyah");


},
30000);
});