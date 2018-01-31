[![Build Status](https://travis-ci.org/fiddep/swedish-ssn.png)](https://travis-ci.org/fiddep/swedish-ssn)

## Installation

```
  npm install --save zk-dynamodb-wrapper
```

or

```
  yarn add zk-dynamodb-wrapper
```

## Usage

```javascript
import { ruleValidator } from ('rule-validator')

const validator = ruleValidator(rules,
  {
    sortKey: /* A attribute used for logical grouping of rules, if no sortKey is provided all rules will be run */
    alwaysEvaluateGroups: /* Specifiy groups that should be run even if they are not part of the grouping provided by sortKey */
  }
)

validator.evaluatePlan(Array<Plan>): boolean
validator.getErrors(Array<Plan>): Object
```
