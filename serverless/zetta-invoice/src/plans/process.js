import { listAllPlansToProcess } from './list';
import { updateNextProcess } from './update';

export default async ({ db }) => {
  const plans = await listAllPlansToProcess({ db });

  /*
    DO SOME KIND OF PROCESS TO SEND INVOICE TO ALL PLANS
  */

  const result = await updateNextProcess({ db, plans });

  console.log(`Processed the following plans`);
  console.log(result);
};
