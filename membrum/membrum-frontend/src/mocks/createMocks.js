import Plan from '../libs/Membership/Plan'
import Subscription from '../libs/Membership/Subscription'

const createPlan = (name = 'default', amount = '200', group = 'nations') =>
  new Plan({
    name,
    amount,
    interval: 'month',
    intervalCount: '6',
    group
  })

export const mockPlans = function(db, dbSubscription) {
  for (let index in nations) {
    db.saveItem(nations[index])
  }

  for (let index in obligatory) {
    db.saveItem(obligatory[index])
  }

  for (let index in unions) {
    db.saveItem(unions[index])
  }

  const sub = new Subscription()
  sub.addPlan(nations[12])
  sub.addPlan(unions[0])
  sub.addPlan(obligatory[0])

  dbSubscription.saveItem(sub)
}

const obligatory = [createPlan('TRF', '20', 'obligatory')]

const unions = [
  createPlan('Teknologkåren', '0', 'unions'),
  createPlan('Lunda Ekonomerna', '100', 'unions'),
  createPlan('Samhällsvetarkåren', '110', 'unions'),
  createPlan('Lunds Naturvetarkår', '120', 'unions')
]

const nations = [
  createPlan('Blekingska Nationen', '210'),
  createPlan('Göteborgs Nation'),
  createPlan('Hallands Nation'),
  createPlan('Helsingkrona Nation'),
  createPlan('Kalmar Nation'),
  createPlan('Kristianstads Nation'),
  createPlan('Lunds Nation'),
  createPlan('Malmö Nation'),
  createPlan('Östgöta Nation'),
  createPlan('Sydskånska Nationen'),
  createPlan('Västgöta Nation'),
  createPlan('Wermlands Nation', '210'),
  createPlan('Undefined Nation', '180')
]
