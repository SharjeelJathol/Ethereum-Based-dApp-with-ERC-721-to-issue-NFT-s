import React, {createContext} from "react";
import { useEffect } from "react";
import { useState } from "react";
import { wallet } from "../Functions";
import contracts from '../contract/ERC721.json'

const ContractContext=createContext()
let ContractProvider=({children})=>{
    const [contract, setContract]=useState();
    useEffect(()=>{
        console.log('Contract Context')
        wallet(contracts).then(contractInstance=>{
            setContract(contractInstance);
            console.log('Contract Instance:',contractInstance)
        })
    }, []);
    
    return <ContractContext.Provider value={contract}>{children}</ContractContext.Provider>
}




export {ContractContext, ContractProvider}