import sub from './subscriptionStatus';

const organisationId = 'cjd1fwht400002wcvnclcfbqo';
const tlth = 'cjd1fwht500022wcvx6k52tyt';
const nation = 'cjd1fwht500082wcv20wmq5kl';
const smalands = 'cjd1fwht5000l2wcvd1p5nqth';
const af = 'cjd1fwht5000k2wcvmo4xxfln';
const trf = 'cjd1fwht5000j2wcvimbzapif';

const status = sub(organisationId);

(async function() {
  try {
    const result = await status.fetchUnpaidPlans('cjdbcy1i80001d0cvct9y23vs');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
})();
