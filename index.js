const puppeteerExtra = require("puppeteer-extra");
const axios = require("axios");
const fs = require("fs");

const RecaptchaPlugin = require("puppeteer-extra-plugin-recaptcha");

puppeteerExtra.use(
  RecaptchaPlugin({
    provider: {
      id: "2captcha",
      token: process.env.KEY, // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
    },
    visualFeedback: true, // colorize reCAPTCHAs (violet = detected, green = solved)
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

    await page.type('input[name="usr"]', "pratham111");

    await page.type('input[name="pass"]', "pass@6745");

    await page.type('input[name="email"]', "pratham@interbitsolutions.com");

    await page.screenshot({ path: "response.png", fullPage: true });

    await page.click(`#captcha_window > div > label > div.captcha_checkbox`);

    await page.waitForTimeout(3000);

    // Wait for the element to appear on the page
    await page.waitForSelector("#imgs-window");

    // Get the dimensions of the element
    const divElement = await page.$("#imgs-window");
    const dimensions = await divElement.boundingBox();

    // Capture a screenshot of only the element
    await page.screenshot({
      path: "response4.png",
      clip: dimensions,
    });

    const image = fs.readFileSync("response4.png");

    // Convert the image data to Base64 encoding
    const base64Image = Buffer.from(image).toString("base64");

    let data = new FormData();
    data.append("method", "base64");
    data.append("recaptcha", "1");
    data.append("canvas", "0");
    data.append("key", "28e40c739f9bfab7cb86b88f59b9a874");
    data.append("body", base64Image);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://2captcha.com/in.php",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        let id = response.data.split("|")[1];

        const intervel = setInterval(() => {
          let config = {
            method: "get",
            maxBodyLength: Infinity,
            url: `http://2captcha.com/res.php?key=28e40c739f9bfab7cb86b88f59b9a874&action=get&id=${id}`,
          };

          axios
            .request(config)
            .then(async (response) => {
              if (response.data != "CAPCHA_NOT_READY") {
                let results = response.data
                  .split("|")[1]
                  .split(":")[1]
                  .split("/");

                for (element of results) {
                  await page.waitForSelector(`#captcha${element}`);
                  await page.click(`#captcha${element}`);
                }

                await page.click(`#captcha_verify_button`).then((res1) => {
                  clearInterval(intervel);
                  page.click(
                    `#identity > footer.access-form__footer.signup__footer.hide_if_succesfuly > input.access-form__submit.signup-btn.submit-btn`
                  );
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }, 5000); // Repeat every 5 seconds (5000 milliseconds)
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((err) => {
    console.log("errdata");
    console.log(err);
  });
