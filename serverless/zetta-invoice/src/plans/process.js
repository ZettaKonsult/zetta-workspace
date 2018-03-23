import { listAllPlansToProcess } from './list';
import { updateNextProcess } from './update';

export default async ({ db }) => {
  const plans = await listAllPlansToProcess({ db });

  /*
    How often should the cron job run?
    Is there someway we can make sure we don't miss a plan by say 6h
    After all plans have been fetched the plan list should be transformed to be
    {
      recipientId: [planId1, planId2, ....]
    }
    To make sure that they get as few mail as possible.

    TODO: DO SOME KIND OF PROCESS TO SEND INVOICE TO ALL PLANS.
  */

  console.log(`Checking for plans to update...`);
  const result = await updateNextProcess({ db, plans });

  if (result.length !== 0) {
    console.log(`Processed the following plans`);
    console.log(result);
  } else {
    console.log(`No plans were processed.`);
  }
};
