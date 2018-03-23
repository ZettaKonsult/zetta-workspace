/* @flow */

/**
 * @date 2018-03-12
 */

import fetch from 'isomorphic-fetch';

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

export default async (params: {
  host: string,
  method: string,
  path: string,
  payload: Payload,
}) => {
  const { host, payload } = params;
  const { body, method } = payload;
  const bodyString = JSON.stringify(body);

  // console.log(`${method} REQUEST: ${params.path}: ${bodyString}.`);
  const args =
    body == null ? { headers, method } : { body: bodyString, headers, method };
  return new Promise(resolve => {
    fetch(`${host}/${params.path}`, args)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => {
        console.error(error);
      });
  });
};
