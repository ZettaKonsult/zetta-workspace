/* @flow */

import puppeteer from 'puppeteer';

let browser;
let page;

const getBrowserPage = async (): any => {
  console.log(`Constructing browser page.`);
  if (!browser) {
    browser = await puppeteer.launch();
  }
  if (!page) {
    page = await browser.newPage();
  }
  console.log(`Constructed browser page.`);
  return page;
};

const generatePDF = async ({ tempalte }) => {
  const page = await getBrowserPage();
  await page.setContent(tempalte);
  console.log(`Set page content.`);
  const buffer = await page.pdf({ format: 'A4' });
  return buffer;
};

const teardown = async () => {
  console.log('teardown');
  await browser.close();
  browser = undefined;
  page = undefined;
};

export default { generatePDF, teardown };
