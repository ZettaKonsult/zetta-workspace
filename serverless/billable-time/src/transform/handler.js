import puppeteer from 'puppeteer';
import parser from 'serverless-event-parser';

import mail from './emailDoc';
import loadTemplate from './loadTemplate';
import response from './response';
import render from './render';
import testData from './testData';

export const createCompanyCustomer = async (event, context, callback) => {
  const { data } = parser(event);

  let html, browser;
  try {
    [html, browser] = await Promise.all([loadTemplate(), puppeteer.launch()]);

    const renderedTemplate = render(html, testData);

    const page = await browser.newPage();
    page.setContent(renderedTemplate);
    const buffer = await page.pdf({ format: 'A4' });
    mail(buffer);
    callback(null, response(200, true));
  } catch (err) {
    callback(err);
  } finally {
    browser.close();
  }
};
