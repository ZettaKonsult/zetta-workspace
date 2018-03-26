import { listAllPlansToProcess } from './list';
import { updateNextProcess } from './update';

export default async ({ db, epoch }) => {
  const plans = await listAllPlansToProcess({ db, epoch });

  /*
    How often should the cron job run?
    The cron job should run at the end of month.
    This should make all plans sync up eventually. The edge case is when a recipient is just added to the plan. This would make 2 invoices be sent rapidly. How to avoid this?

    All plans should be reduced to this format
    {
      recipientId: [planId1, planId2, ....]
    }
    To make sure that they get as few mail as possible.

    The format above needs a transform so it can be made a invoice

    TODO: DO SOME KIND OF PROCESS TO SEND INVOICE TO ALL PLANS.
    1) Transform plans to invoice
    2) use existing code to send invoice
  */

  console.log(`Checking for plans to update...`);
  const result = await updateNextProcess({ db, plans });

  if (result.length !== 0) {
    console.log(`Processed the following plans`);
    console.log(result);
  } else {
    console.log(`No plans were processed.`);
  }
  return result;
};
