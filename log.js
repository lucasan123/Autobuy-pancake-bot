const ethers = require('ethers');
var file="pairs2.html" ;
const addresses = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  factory: '0xBCfCcbde45cE874adCB698cC183deBcF17952812',
  router: '0x05fF2B0DB69458A0750badebc4f9e13aDd608C7F'
}

const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed1.binance.org/');
const factory = new ethers.Contract(
  addresses.factory,
  ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
provider
);


function myWriteFile(file, content) {
  fs.appendFile(file, content, function (err) {
    if (err) return console.log(err) ;
  });
} ;

console.log(Date() + '    BOT STARTED');

factory.on('PairCreated', async (token0, token1, pairAddress) => {

    //The quote currency needs to be WBNB 
    let tokenIn, tokenOut;
    if(token0 === addresses.WBNB) {
      tokenIn = token0;
      tokenOut = token1;
    }

    if(token1 == addresses.WBNB) {
      tokenIn = token1;
      tokenOut = token0;
    }

    //The quote currency is not WBNB
    if(typeof tokenIn === 'undefined') {
      return;
    }

var content = (Date() + `    New pair detected </br>
    ================= </br>
    token: <a href="https://bscscan.com/address/${tokenIn}">https://bscscan.com/address/${tokenOut}</a> </br>
    token: <a href="https://bscscan.com/address/${tokenOut}">https://bscscan.com/address/${tokenOut}</a> </br>
    pairAddress: <a href="https://bscscan.com/address/${pairAddress}">https://bscscan.com/address/${pairAddress}</a> </br>
  `) ;
  myWriteFile(file, content) ;
  console.log(Date() + `    New pair detected

    =================
    tokenIn: ${tokenIn}
    tokenOut: ${tokenOut}
    pairAddress: ${pairAddress}
  `);
  
});
