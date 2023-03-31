// const puppeteer = require("puppeteer");

// const res = async () => {
//   const browser = await puppeteer.launch({
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//   });

//   const page = await browser.newPage();
//   await page.goto("https://review-blogger.com/signup?redirect=");

//   // Fill in the username field
//   await page.type('input[name="usr"]', "pratham876");

//   // Fill in the password field
//   await page.type('input[name="pass"]', "pass@654");

//   // Fill in the email field
//   await page.type('input[name="email"]', "pratham@gmail.com");

//   // Submit the form
//   await page.click('input[type="submit"]');
//   await page.screenshot({ path: "ss.png" });
//   await browser.close();
// };

// res();

const puppeteerExtra = require("puppeteer-extra");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
puppeteerExtra.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: "1e7c2b15ff017ec0c4df9426562a997b", // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
    solveScoreBased:true
  })
);

// puppeteer usage as normal
puppeteerExtra
  .launch({
    executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    headless: false,
  })
  .then(async (browser) => {
    const page = await browser.newPage();
    await page.goto("https://review-blogger.com/signup?redirect=");

    await page.type('input[name="usr"]', "pratham876");

    await page.type('input[name="pass"]', "pass@6745");

    await page.type('input[name="email"]', "pratham@interbitsolutions.com");
    await page.screenshot({ path: "response.png", fullPage: true });

    await page.click(`#captcha_window > div > label > div.captcha_checkbox`);

    // let { captchas, filtered, error } = await page.findRecaptchas()

    // console.log(captchas)

    await page.waitForTimeout(2000);
    await page
      .solveRecaptchas()
      // .then((res) => {
      //   console.log("solved");
      //   console.log(res);
      //    page.click(`#captcha_verify_button`).then((res1)=>{
      //     console.log("i am response1" , res1)
      //      page.screenshot({ path: "response1.png", fullPage: true });
      //      Promise.all([
      //       page.waitForNavigation(),
      //       page.click(
      //         `#identity > footer.access-form__footer.signup__footer.hide_if_succesfuly > input.access-form__submit.signup-btn.submit-btn`
      //       ),
      //     ]);
      //   });
       
      // })
      // .catch((err) => {
      //   console.log("failed");
      //   console.log(err);
      // });

    

    // await browser.waitForTarget(() => false);
    await browser.close();
  });

// const puppeteerExtra = require("puppeteer-extra");
// const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");
// const DeathByCaptcha = require("deathbycaptcha");
// const { HttpClient } = require('deathbycaptcha');



// puppeteerExtra.use(
//   RecaptchaPlugin({
//     provider: {
//       id: "dbc",
//       username: "ecpecp",
//       password: "Ecp1122@@$$",
//     },
//     visualFeedback: true, // optional
//   })
// );

// const res = async () => {
//   const dbc = new DeathByCaptcha("ecpecp", "Ecp1122@@$$");

//   const browser = await puppeteerExtra.launch({
//     executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
//     headless: false,
//   });
//   const page = await browser.newPage();

//   const client = new HttpClient('ecpecp', 'Ecp1122@@$$');

//   await page.goto("https://review-blogger.com/signup?redirect=");

//   await page.click(`#captcha_window > div > label > div.captcha_checkbox`);
//   await page.screenshot({ path: "response.png", fullPage: true });

//   // solve reCAPTCHA challenge using DeathByCaptcha
//   await page.solveRecaptchas({
//     providerCallback: (token) => {
//       return new Promise((resolve, reject) => {
//         dbc.decode({ captcha: token }, (err, result) => {
//           if (err) reject(err);
//           resolve(result.text);
//         });
//       });
//     },
//   });
//   await page.click(`#captcha_verify_button`);

//   await page.screenshot({ path: "response1.png", fullPage: true });
// };

// res();
