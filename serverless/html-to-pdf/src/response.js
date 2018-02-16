export default (status, data) => {
  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  };
};
