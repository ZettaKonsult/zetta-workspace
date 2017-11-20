## Membrum Payment Module

Generate orders.
Generate receipts.
Interface to third party payment services (e.g. DIBS).
Register payments.
Trigger payment reminders (including recurring).

### Dependencies

- JRE v8.
- Maven
- Npm
- Yarn

### Installation

    cd <folder>
    git clone https://github.com/ZettaKonsult/zetta-workspace

#### Verify installation

    cd zetta-workspace/membrum/Payment
    yarn test
    
#### Import into Eclipse

1. Open Eclipse.
2. Right-click in package explorer, select 'Import...'
3. Choose the folder containing Payment.
4. Select Payment, choose 'Finish.'
5. Right-click project root folder, hover 'Maven,' choose 'Update project...'
6. Choose OK.

### Generate a DIBS URL

#### From Eclipse

Right-click com.zetta.payment.test.run.DIBSTest.
Choose 'Run as...' and then 'Java Application.'

#### From command-line

	java -cp target/PaymentLambda.jar com.zetta.payment.run.DIBSRun