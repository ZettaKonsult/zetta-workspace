import plandb from './plan';
import initValidaiton from './subscriptionValidation';
import update from './subscriptionUpdate';

const organisationId = 'cjd1fwht400002wcvnclcfbqo';
const tlth = 'cjd1fwht500022wcvx6k52tyt';
const nation = 'cjd1fwht500082wcv20wmq5kl';
const smalands = 'cjd1fwht5000l2wcvd1p5nqth';
const af = 'cjd1fwht5000k2wcvmo4xxfln';
const trf = 'cjd1fwht5000j2wcvimbzapif';

const planDatabase = plandb(organisationId);

const options = {
  sortKey: 'group',
  alwaysEvaluateGroups: ['obligatory'],
};

(async function() {
  try {
    const result = await planDatabase.updatePlan({
      id: 'cjd4nsjv00000yocvtcpisewk',
      amount: 110,
    });
    // const result = await planDatabase.getPlan('cjd4njlfo0000gscv6gnowm47');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
