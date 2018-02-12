import cuid from 'cuid';

export default data => ({
  id: cuid(),
  customerId: data.customerId,
  workplaceId: data.workplaceId,
  unit: data.unit,
  price: data.price,
  description: data.description,
  stage: 'pending',
});
