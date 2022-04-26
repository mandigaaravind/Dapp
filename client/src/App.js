import React, { Component,useState,useEffect } from "react";
//import React from 'react';
import Navbar from './NavbarElements';
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

function App() {
  const [state, setState] = useState({ storageValue: 0, web3: null, accounts: null, contract: null });
  const [rough,setRough]=useState("");
  

  useEffect(() => {    
    async function init() {
      try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = SimpleStorageContract.networks[networkId];
        const instance = new web3.eth.Contract(
          SimpleStorageContract.abi,
          deployedNetwork && deployedNetwork.address
        );
        
    
        
        setState(value => ({ ...value, web3, accounts, contract: instance }));
      } catch (error) {
        alert("Failed to load web3, accounts, or contract. Check console for details.");
        console.error(error);
      }
    }
    init();
  }, []);
  
  useEffect(() => {
    async function runExample (accounts, contract) {
       console.log(accounts[0])
      // await contract.methods.set(25).send({from : accounts[0]});
      // const response = await contract.methods.get().call();
      // console.log(response);
      // setState(value => ({ ...value, storageValue: response }));
    };
    if(state.accounts != null && state.contract != null) {
      runExample(state.accounts, state.contract);
    }
  }, [state.accounts, state.contract]);
  
    if (!state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }



    const sendfunc=async(x)=>{
      await state.contract.methods.set(x).send({from : state.accounts[0]});
      const response = await state.contract.methods.get().call();
      console.log(response);
      setState(value => ({ ...value, storageValue: response}));
    }

    const Submiting=(e)=>{
      e.preventDefault();
        sendfunc(rough)
    }


    return (
      <div>
        
        <Navbar />
       
        
        <form onSubmit={Submiting}>
        
          <input type="text" placeholder="enter the value " value={rough} onChange={(e)=>
          {
            setRough(e.target.value);
          }}
           />
         
          <button type="submit"  className="btn btn-primary">click here</button>

        </form>
      

        <h1>This is a test {state.storageValue} </h1>
      </div>
    );
}


export default App;