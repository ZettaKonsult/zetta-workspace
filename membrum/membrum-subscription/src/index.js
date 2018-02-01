import initValidaiton from './subscriptionValidation';
import update from './subscriptionUpdate';

const organisationId = 'cjd1fwht400002wcvnclcfbqo';
const tlth = 'cjd1fwht500022wcvx6k52tyt';
const nation = 'cjd1fwht500082wcv20wmq5kl';
const smalands = 'cjd1fwht5000l2wcvd1p5nqth';
const af = 'cjd1fwht5000k2wcvmo4xxfln';
const trf = 'cjd1fwht5000j2wcvimbzapif';

const options = {
  sortKey: 'group',
  alwaysEvaluateGroups: ['obligatory'],
};

(async function() {
  try {
    // const valid = await initValidaiton(organisationId, options).isValidSubscription([tlth, nation, trf, af]);
    await update(organisationId, options).updateUserSubscription(
      '910504-0035',
      [tlth, nation, trf, af]
    );
  } catch (err) {
    console.error(err);
  }
})();