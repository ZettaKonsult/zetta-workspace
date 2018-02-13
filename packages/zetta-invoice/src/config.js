/* @flow */

/**
 * @date 2017-02-13
 */

const settings = {
  providers: {},
};

export default (configuration: { [string]: string }) => {
  Object.keys(settings).forEach(key => {
    if (key in configuration) {
      settings[key] = configuration[key];
    }
  });
  return settings;
};
