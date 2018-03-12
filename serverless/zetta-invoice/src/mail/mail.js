/* @flow */

/**
 * @date 2018-03-12
 */

import puppeteer from 'puppeteer';

import mail from './emailDoc';
import prepareTemplate from './prepareTemplate';

let browser;

const getBrowserPage = async (): any => {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  return page;
};

export default async (params: { data: any }) => {
  const { data } = params;

  try {
    let [renderedTemplate, page] = await Promise.all([
      await prepareTemplate(data),
      await getBrowserPage(),
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
