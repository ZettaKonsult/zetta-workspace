/* @flow */

/**
 * @date 2017-02-13
 */

const settings: { [string]: any } = {
  providers: {},
};

export default (configuration: { [string]: string }) => {
  Object.keys(settings).forEach((key: string) => {
    if ((key: string) in configuration) {
      settings[key] = configuration[key];
    }
  });
  return { settings, getTable };
};

const getTable = (params: { name: string }) => {
  if (!process.env[params.name]) {
    throw new Error(
      `Could not read database table from process.env.${params.name}.`
    );
  }
  return process.env[params.name];
};
