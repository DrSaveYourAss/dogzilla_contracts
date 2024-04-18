# DogZilla (DOGZ) on Theta Network

<img src="./img/dogzilla.png" alt="DogZilla" width="350"/>

## Setup

Prerequisites:
* Git
* Node
* NPM

To install NPM dependencies:

```
npm install
```

## Contracts 

### TNT-20 Token 

TNT-20 token is based on Openzeppelin library.
To read TNT-20 Token in our dev wallets:

```
node scripts/read_token.js
```

### Token vesting

Cliff token vesting contract is taken form [AbdelStark](https://github.com/AbdelStark/token-vesting-contracts). 

This is an audited contract. The report can be found [here](https://github.com/AbdelStark/token-vesting-contracts/blob/main/audits/hacken_audit_report.pdf)

To read the vested contract:

```
node scripts/vesting/read_contract.js
```

To read all OTC vested contracts:
```
node scripts/vesting/read_otc_contract.js
```

