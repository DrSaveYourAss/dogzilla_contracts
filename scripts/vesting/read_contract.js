const Web3 = require('web3')
const web3 = new Web3('https://eth-rpc-api.thetatoken.org/rpc')
const chainID = 361 // for the Theta Mainnet

const abi = [{"inputs":[{"internalType":"address","name":"token_","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"stateMutability":"payable","type":"fallback"},{"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"computeNextVestingScheduleIdForHolder","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"}],"name":"computeReleasableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"computeVestingScheduleIdForAddressAndIndex","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"},{"internalType":"uint256","name":"_start","type":"uint256"},{"internalType":"uint256","name":"_cliff","type":"uint256"},{"internalType":"uint256","name":"_duration","type":"uint256"},{"internalType":"uint256","name":"_slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"_revocable","type":"bool"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"createVestingSchedule","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"}],"name":"getLastVestingScheduleForHolder","outputs":[{"components":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"cliff","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"uint256","name":"amountTotal","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"},{"internalType":"bool","name":"revoked","type":"bool"}],"internalType":"struct TokenVesting.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getToken","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVestingIdAtIndex","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"}],"name":"getVestingSchedule","outputs":[{"components":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"cliff","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"uint256","name":"amountTotal","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"},{"internalType":"bool","name":"revoked","type":"bool"}],"internalType":"struct TokenVesting.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"holder","type":"address"},{"internalType":"uint256","name":"index","type":"uint256"}],"name":"getVestingScheduleByAddressAndIndex","outputs":[{"components":[{"internalType":"address","name":"beneficiary","type":"address"},{"internalType":"uint256","name":"cliff","type":"uint256"},{"internalType":"uint256","name":"start","type":"uint256"},{"internalType":"uint256","name":"duration","type":"uint256"},{"internalType":"uint256","name":"slicePeriodSeconds","type":"uint256"},{"internalType":"bool","name":"revocable","type":"bool"},{"internalType":"uint256","name":"amountTotal","type":"uint256"},{"internalType":"uint256","name":"released","type":"uint256"},{"internalType":"bool","name":"revoked","type":"bool"}],"internalType":"struct TokenVesting.VestingSchedule","name":"","type":"tuple"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingSchedulesCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_beneficiary","type":"address"}],"name":"getVestingSchedulesCountByBeneficiary","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getVestingSchedulesTotalAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWithdrawableAmount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"release","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"vestingScheduleId","type":"bytes32"}],"name":"revoke","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"},{"stateMutability":"payable","type":"receive"}]
const address = '0x5c0f2de5a4fa0d61dbb351cdf9cb941119927fd6' // Vesting smart contract

const contract = new web3.eth.Contract(abi, address)

console.log("")
console.log("==============================================================")
console.log("Token Vesting contract")
console.log("==============================================================")
console.log("")


let releasableAmount = []

contract.methods.getToken().call((err, result) => { 
  console.log("Associated token address:", result) 
  
  contract.methods.getVestingSchedulesTotalAmount().call((err, result) => { 
    console.log("Vesting total amount: " + result/1e18 + " DOGZ") 

    contract.methods.getVestingSchedulesCount().call((err, result) => { 
      // Vesting count
      let vestingCount = result
      console.log("Vesting count:",result) 
  
      for (let i = 0; i < vestingCount; i++) {

        
        contract.methods.getVestingIdAtIndex(i).call((err, result) => {
          console.log("["+i+"] " + "Vesting ID:", result)

          contract.methods.computeReleasableAmount(result).call((err, result) => {
          
            releasableAmount[i] = result/1e18
          })

          contract.methods.getVestingSchedule(result).call((err, result) => {
            //console.log("Vesting schedule: ",result)

            console.log("")
            console.log("==============================================================")
            console.log("Token Vesting at index " + "["+i+"]")
            console.log("==============================================================")
            console.log("")
            
            console.log("["+i+"] " + "Vesting releasable amount: " + releasableAmount[i] + " DOGZ")
            console.log("["+i+"] " + "Beneficiary: ",result[0])

            let initialTime = new Date( result[1] * 1000);
            console.log("["+i+"] " + "Initial vesting period: ", initialTime.toLocaleString())

            console.log("["+i+"] " + "Vesting duration: ", result[3]/(30*24*3600) + " Months")
            console.log("["+i+"] " + "Time between each release: ", result[4]/(30*24*3600) + " Months")
            console.log("["+i+"] " + "Revocable: ", result[5])
            console.log("["+i+"] " + "Total amount: "+ result[6]/1e18 + " DOGZ")
            console.log("["+i+"] " + "Released: "+ result[7]/1e18 + " DOGZ")
            console.log("["+i+"] " + "Revoked: ", result[8])

          })
        })
      }
    })
  })
})