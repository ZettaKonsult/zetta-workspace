export const validateEmailParams = params => {
  const requiredProperties = ['to', 'from', 'subject'];
  requiredProperties.forEach(property => {
    if (!params.hasOwnProperty(property)) {
      throw new Error(`request does not have required property: ${property}`);
    }
  });

  return true;
};
