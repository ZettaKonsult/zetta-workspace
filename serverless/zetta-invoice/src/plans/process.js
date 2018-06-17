import { listAllPlansToProcess } from './list';
import { updateNextProcess } from './update';

export default async ({ db, epoch }) => {
  const plans = await listAllPlansToProcess({ db, epoch });

  const plansToRecipientsMap = mapPlansToRecipients({ plans });

  /*
    let plansToRecipientsMap = mapPlansToRecipients({plans})
    let invoiceArray = convertToInvoice({plans,plansToRecipientsMap })

    THIS IS NOW READY FOR HANDOF TO INVOICE GENERATION AND SENDING
    invoiceArray.map(({recipientId, companyCustomerId, invocieRows}) => callInvoiceCreateFunc({recipientId, companyCustomerId, invoiceRows}))

    STORE AS A PROMISE ARRAY AND await PROMISE.all()

    TRY CATCH IT TO MAKE SURE THAT WE DON*T RUN updateNextProcess if it don't happen
  */

  const result = await updateNextProcess({ db, plans });
  return result;
};

export const mapPlansToRecipients = ({ plans }) =>
  plans.reduce((total, plan) => {
    const recipients = plan.recipientIds;

    const sub = recipients.reduce((tot, recipientId) => {
      const previous = total[recipientId] || {};
      const companyArray = previous[plan.companyCustomerId] || [];
      return {
        ...tot,
        [recipientId]: {
          ...previous,
          [plan.companyCustomerId]: [...companyArray, plan.id],
        },
      };
    }, {});

    return {
      ...total,
      ...sub,
    };
  }, {});

export const convertToInvoice = ({ plans, plansToRecipientsMap }) => {
  let resultArray = [];
  Object.keys(plansToRecipientsMap).forEach(recipientId => {
    let companyCustomerMap = plansToRecipientsMap[recipientId];
    Object.keys(companyCustomerMap).forEach(companyCustomerId => {
      let planIds = companyCustomerMap[companyCustomerId];
      let invoiceRows = planIds.map(planId =>
        planToInvoiceRow(plans.find(plan => plan.id === planId))
      );
      resultArray = [
        ...resultArray,
        { recipientId, companyCustomerId, invoiceRows },
      ];
    });
  });

  return resultArray;
};

const planToInvoiceRow = plan => ({
  price: plan.price || 0,
  unit: 1,
  description: plan.description || plan.name,
  tax: plan.tax || 0.25,
});
