import InfoBox from './components/InfoBox';
import { useState, useEffect } from 'react';
import './styles/App.css'
import axios from 'axios';

import {getTr,getPending,getTotalSupply,getOS,getTwi, getGasPrice, getEthPrice} from './utils/interact.js'
import InfoField from './components/InfoField';

function App() {
  const [post, setPosts] = useState([
    {id:"1" ,name: 'Contract: ', info: ''},
    {id:"2" ,name: 'Pending: ', info: ''},
    {id:"3" ,name: 'Value: ', info: ''},    
    {id:"4" ,name: 'Totalsupply: ', info: ''},
    {id:"5" ,name: 'Data: ', info: ''},
    {id:"6" ,name: 'Write: ', info: ''},
    {id:"7" ,name: 'Read: ', info: ''},
    {id:"8" ,name: 'Opensea: ', info: ''},
    {id:"9" ,name: 'Gaslim: ', info: ''},
    {id:"10" ,name: 'Gasprice: ', info: ''}
  ])

  const [osInfo,setOsInfo] = useState([
    {id:"1" ,name: 'image: ', info: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8YmVlcnxlbnwwfHwwfHw%3D&w=1000&q=80'},
    {id:"2" ,name: 'Name: ', info: ''},
    {id:"3" ,name: 'Twitter: ', info: ''},    
    {id:"4" ,name: 'Discord: ', info: ''},
    {id:"5" ,name: 'Webpage: ', info: ''},
    {id:"6" ,name: 'Fee: ', info: ''},
    {id:"7" ,name: 'Transaction fee eth: ', info: ''},
    {id:"8" ,name: 'Transaction fee $: ', info: ''}
  ])
  const [contract,setContract] = useState('')
  const [refresh,setRefresh] = useState(0)
  const [submited, setSubmited] = useState(false)

 useEffect(() => {
  if (submited) {
    setTimeout(async () =>{
      setRefresh(refresh+1)    
      const newArr1 = [...post]
      let resGetPending = await getPending(contract)
      newArr1[1].info = resGetPending
      let resTotalSupply = await getTotalSupply(contract)
      newArr1[3].info = resTotalSupply
      let resGasPrice = await getGasPrice()
      newArr1[9].info = Math.trunc(resGasPrice/1000000000) 
      console.log('РАБОТАЕТ')


    }, 3000)

    
  }
  else {
    console.log('ждем пака')
  }
  

 }, [refresh,submited]);




  const submiHandler = async (e) => {
    e.preventDefault()
    setSubmited(true)
    const newArr = [...post]
    let newArrOs = [...osInfo]
    newArr[0].info = <a href={`https://etherscan.io/address/${contract}`} >{contract}</a>
 
    let resGetTr = await getTr(contract)
    let resGasPrice = await getGasPrice()
    let resGetPending = await getPending(contract)
    newArr[1].info = resGetPending
    let resTotalSupply = await getTotalSupply(contract)
    newArr[3].info = resTotalSupply
    newArr[5].info = <a href={`https://etherscan.io/address/${contract}#writeContract` } >WRITE</a>
    newArr[6].info = <a href={`https://etherscan.io/address/${contract}#readContract` } >Read</a>
    try{
      newArr[4].info = resGetTr[0]

    }catch {
      newArr[4].info = 'hui'
      
    }
    try{
      newArr[8].info = resGetTr[2]

    }catch {
      newArr[8].info = 'hui'
    }
    try{
      newArr[2].info = resGetTr[1]/1000000000000000000

    }catch {
      newArr[2].info = 'hui'
    }
    try{
      newArr[9].info = Math.trunc(resGasPrice/1000000000) 
    }catch {
      newArr[2].info = 'hui'
    }
       
    try{
      let respOS = await getOS(contract)
      newArr[7].info = <a href={`https://opensea.io/collection/${respOS.data.collection.slug}`} >OPENSEA</a>
      newArrOs[0].info  = respOS.data.collection.image_url
      newArrOs[1].info = respOS.data.name
      newArrOs[3].info = <a href={respOS.data.collection.discord_url} >{respOS.data.collection.discord_url}</a>
      newArrOs[4].info = <a href={respOS.data.collection.external_url} >{respOS.data.collection.external_url}</a>
      newArrOs[5].info = respOS.data.seller_fee_basis_points/100 +'%'
      newArrOs[6].info = newArr[9].info * newArr[8].info /1000000000
      let resTwi = await getTwi(respOS.data.collection.slug)
      let arrResTwi = resTwi.split(' ')
      newArrOs[2].info = <a href={arrResTwi[2].slice(6,arrResTwi[2].length-1)} >{arrResTwi[2].slice(6,arrResTwi[2].length-1)}</a>
      
    }catch {
    }
    
    try {
      let resEthPrice = await getEthPrice()
      newArrOs[7].info = resEthPrice.data.USD * newArrOs[6].info 
    }
    catch {
     
    }


    

    setOsInfo(newArrOs)
    setPosts(newArr)
   


    

  }
  
  return (
    <div className='main-container'>
      <div className='form-container'>
        <h1 style={{textAlign: 'center',  fontFamily: 'Brush Script MT, Brush Script Std, cursive'}}>DEGEN HELPER</h1>
        <form onSubmit={submiHandler}>
          <input className='my-input' type="text" placeholder='ВВЕДИТЕ АДРЕС КОНТРАКТА' onChange={(e) => {
            setContract(e.target.value)
          }} />
        </form>
      </div>
        <div className="info-container">
          {/* <button onClick = {getTotalSupply} >КНОПКА ПРОБНАЯ</button> */}          
          <InfoBox posts = {post}/>
          <div  className='opensea-info'>
              <div className='img-name'>
                <img src={osInfo[0].info} className= 'image' width='40%'  />
                <h1>{osInfo[1].info}</h1>
              </div>
              <div>
              <hr />
              <InfoField name='Discord: ' info = {osInfo[3].info}/>
              <hr />
              <InfoField name='Website: ' info = {osInfo[4].info}/>
              <hr />     
              <InfoField name='Twitter: ' info = {osInfo[2].info}/>
              <hr />
              <InfoField name='Fee: ' info = {osInfo[5].info}/>
              <hr />
              <InfoField name='Transaction fee eth:  ' info = {osInfo[6].info}/>
              <hr />              
              <InfoField name='Transaction fee $: ' info = {osInfo[7].info}/>
              <hr />              
              </div>
          </div>
        </div>
      </div>
  );
}

export default App;
