/* @flow */

import puppeteer from 'puppeteer';

let browser = undefined;

const getBrowserPage = async (): any => {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  return page;
};

const generatePDF = async ({ template }) => {
  const page = await getBrowserPage();
  await page.setContent(template);
  const buffer = await page.pdf({ format: 'A4' });
  await page.pdf({ path: 'test.pdf', format: 'A4' });
  return buffer;
};

const teardown = async () => {
  await browser.close();
  browser = undefined;
};

export default { generatePDF, teardown };
