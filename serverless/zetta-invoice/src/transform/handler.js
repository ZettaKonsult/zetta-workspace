/* @flow */

import puppeteer from 'puppeteer';

import mail from './emailDoc';
import prepareTemplate from './prepareTemplate';

let browser;

const getBrowserPage = async (): buffer => {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  return page;
};

export default async data => {
  try {
    let [renderedTemplate, page] = await Promise.all([
      prepareTemplate(data),
      getBrowserPage(),
    ]);
    page.setContent(renderedTemplate);

    const buffer = await page.pdf({ format: 'A4' });
    mail(buffer);
    return buffer;
  } catch (error) {
    throw error;
  } finally {
    browser.close();
  }
};
