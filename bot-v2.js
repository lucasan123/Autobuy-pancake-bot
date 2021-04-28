const ethers = require('ethers');
var file="onlylogv2.html" ;
var fs = require("fs") ;

const addresses = {
  WBNB: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  router: '0x10ED43C718714eb63d5aA57B78B54704E256024E'
}

const provider = new ethers.providers.WebSocketProvider('wss://bsc-ws-node.nariox.org:443');
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
    if(token0 == addresses.WBNB) {
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
