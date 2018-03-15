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
    To make sure that they get as few mail as possible

    DO SOME KIND OF PROCESS TO SEND INVOICE TO ALL PLANS
  */

  const result = await updateNextProcess({ db, plans });

  return result;
};
