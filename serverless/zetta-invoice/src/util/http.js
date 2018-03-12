/* @flow */

/**
 * @date 2018-03-12
 */

import fetch from 'isomorphic-fetch';
import config from '../util/config';

type Payload = {
  body: any,
  headers?: {
    [string]: string,
  },
  method: string,
};

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
};
const PORT = config.port;
const HOST = `http://localhost:${PORT}`;

export default async (params: { path: string, payload?: Payload }) => {
  const { path, payload } = params;

  if (payload == null) {
    return await get({ path });
  } else {
    return await httpRequest({ path, payload });
  }
};

const get = async (params: { path: string }) => {
  // console.log(`GET REQUEST: ${params.path}.`);
  return new Promise(resolve => {
    fetch(`${HOST}/${params.path}`)
      .then(response => response.json())
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.error(error);
      });
  });
};

const httpRequest = async (params: { path: string, payload: Payload }) => {
  const { payload } = params;
  const { body, method } = payload;
  const bodyString = JSON.stringify(body);

  // console.log(`${method} REQUEST: ${params.path}: ${bodyString}.`);
  return new Promise(resolve => {
    fetch(`${HOST}/${params.path}`, { body: bodyString, headers, method })
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => {
        console.error(error);
      });
  });
};
