import Web3 from 'web3';
const web3 = new Web3("https://mainnet.infura.io/v3/b9cd616cbc124e03aea4ae248787f634")
const axios = require('axios');
var HTMLParser = require('node-html-parser');



export const getTr = async (contract ) => {
    try{
    const resp =  await axios.get('https://etherscan.io/txsPending?a='+contract +'&m=hf')
    var root = HTMLParser.parse(resp.data).getElementsByTagName('a');
    let arr = []
    root.map((elem) => {
      if (elem.rawAttrs.includes('/tx/')) {
        arr.push(elem.rawAttrs.slice(10,elem.rawAttrs.length-1))
      }

     
    } )
    const res = await web3.eth.getTransaction(arr[0])
    return ([res.input,res.value,res.gas])

  }catch (e) {

    console.log(e)
  }
}



export const  getPending = async (contract) => {

    try{
      const resp =  await axios.get('https://etherscan.io/txsPending?a='+ contract+ '&m=hf')
      let v = resp.data.lastIndexOf('A total of ')
      let obj =  resp.data.slice(v+5,v+20).match(/\d+/);
      let res = Object.values(obj)[0]
      return res 
    }catch (e) {
      console.log(e)
    }


   
  }
 export  const getTotalSupply = async (contract) => {
        const resp =  await axios.get('https://etherscan.io/token/'+ contract)
        var root = HTMLParser.parse(resp.data).getElementsByTagName('input');
        let res = ''
        root.map(a => {
        if (a.rawAttrs.includes('TotalSupply')) {
           res =  a.rawAttrs.slice(109,a.rawAttrs.length-2)
       }
     })
     return res
    }
    export  const getOS = async (contract) => {
      const resp =  await axios.get('https://api.opensea.io/api/v1/asset_contract/' + contract)

     return resp
  }
  export  const getTwi = async (name) => {
    const resp =  await axios.get('https://opensea.io/collection/' + name)
    let root = HTMLParser.parse(resp.data).getElementsByTagName('a');
    let res = ''
    root.map((elem) => {
      if (elem.rawAttrs.includes('twitter')) {
        console.log(elem.rawAttrs)
         res = elem
      }

     
    } )
   return res.rawAttrs
}


export  const getGasPrice = async () => {
  const resp =  await web3.eth.getGasPrice()

 return resp
}

export  const getEthPrice = async () => {
  const resp =  await axios.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD') 

 return resp
}