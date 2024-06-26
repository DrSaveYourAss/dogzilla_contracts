const Web3 = require('web3')
const web3 = new Web3('https://eth-rpc-api.thetatoken.org/rpc')
const chainID = 361 // for the Theta Mainnet

const abi = [{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"computeNextVestingScheduleIdForHolder","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"}],"name":"computeReleasableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"computeVestingScheduleIdForAddressAndIndex","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_cliff","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"_revocable","type":"bool"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"createVestingSchedule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"getLastVestingScheduleForHolder","outputs":[{"components":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"cliff","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"uint256","name":"amountTotal","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"},{"internalType":"bool","name":"revoked","type":"bool"}],"internalType":"struct TokenVesting.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVestingIdAtIndex","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"}],"name":"getVestingSchedule","outputs":[{"components":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"cliff","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"uint256","name":"amountTotal","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"},{"internalType":"bool","name":"revoked","type":"bool"}],"internalType":"struct TokenVesting.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVestingScheduleByAddressAndIndex","outputs":[{"components":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"cliff","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"uint256","name":"amountTotal","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"},{"internalType":"bool","name":"revoked","type":"bool"}],"internalType":"struct TokenVesting.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingSchedulesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"getVestingSchedulesCountByBeneficiary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingSchedulesTotalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWithdrawableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"}],"name":"revoke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const address = '0xcfcf7b0b66a2ec1555fecf54e1fbfbe2db23ae94' // Vesting smart contract

const contract = new web3.eth.Contract(abi, address)

console.log("")
console.log("==========================================================================")
console.log("LP Token Vesting contract")
console.log("==========================================================================")
console.log("")


const tokenAddr = contract.methods.getToken().call((err, result) => { 
  return result;
});
const vestTotal = contract.methods.getVestingSchedulesTotalAmount().call((err, result) => { 
  return result;
});
const vestCount = contract.methods.getVestingSchedulesCount().call((err, result) => { 
  return result;
});

function vestID(i) {
  contract.methods.getVestingIdAtIndex(i).call((err, result) => {
    return result;
  });
}

const devWallet = [   "LP Vesting 1",
                      "LP Vesting 2",
                      "LP Vesting 3"
                  ];  

const readVestingContract = async () => {
  const token = await tokenAddr;
  const total = await vestTotal;
  const count = await vestCount;

  console.log("Associated token address:", token);
  console.log("Vesting total amount: " + total/1e18 + " DOGZ");
  console.log("Vesting count:",count);

  for (let i = 0; i < count; i++) {
    
    const id         = await contract.methods.getVestingIdAtIndex(i).call((err, result) => {return result;});
    const releasable = await contract.methods.computeReleasableAmount(id).call((err, result) => {return result;});
    const schedule   = await contract.methods.getVestingSchedule(id).call((err, result) => { return result });
    let initialTime  = new Date( schedule[1] * 1000);

    console.log("")
    console.log("==========================================================================")
    console.log("LP Vesting at index " + "["+i+"]: "+ devWallet[i])
    console.log("==========================================================================")
    console.log("")
    console.log("Vesting ID:", id);
    console.log("Vesting releasable amount: " + releasable/1e18+ " DOGZ");
    console.log("Beneficiary: ",schedule[0]);
    console.log("Initial vesting period: ", initialTime.toLocaleString());
    console.log("Vesting duration: ", schedule[3]/(30*24*3600) + " Months");
    console.log("Time between each release: ", schedule[4]/(30*24*3600) + " Months");
    console.log("Revocable: ", schedule[5]);
    console.log("Total amount: "+ schedule[6]/1e18 + " DOGZ");
    console.log("Released: "+ schedule[7]/1e18 + " DOGZ");
    console.log("Revoked: ", schedule[8]);
  }

};

readVestingContract();