export const success = body => {
  return response(200, body);
};

export function failure(body) {
  return response(500, body);
}

const response = (status, data) => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};
