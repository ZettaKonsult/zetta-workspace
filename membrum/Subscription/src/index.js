import initValidaiton from './subscriptionValidation';
import update from './subscriptionUpdate';
const options = {
  sortKey: 'group',
  alwaysEvaluateGroups: ['obligatory'],
};

const organisationId = 'cjd1fwht400002wcvnclcfbqo';
const tlth = 'cjd1fwht500022wcvx6k52tyt';
const nation = 'cjd1fwht500082wcv20wmq5kl';
const smalands = 'cjd1fwht5000l2wcvd1p5nqth';
const af = 'cjd1fwht5000k2wcvmo4xxfln';
const trf = 'cjd1fwht5000j2wcvimbzapif';

(async function() {
  const sub = initValidaiton(organisationId, options);

  try {
    // const valid = await sub.isValidSubscription([tlth, nation, trf, af]);
    update().findUser('9105040035');
  } catch (err) {
    console.error(err);
  }
})();
