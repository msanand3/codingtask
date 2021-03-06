import React, { useEffect, useState } from 'react';
import Axios from "axios";
import Table from './table';

function Main(props) {

    let DEL = []
    let INT = []
    let OOD = []
    let DEX = []
    let NFI = []
    const [apiData,setApiData] = useState([]);
    const [filter, setFilter] = useState('DEL');
    const [shipments,setShipment] = useState([]);

    useEffect(() => {
        Axios.post("https://f0ztti2nsk.execute-api.ap-south-1.amazonaws.com/v1/consignment/fetch",
            {email : "s.mukul@iiitmanipur.ac.in"},
            {headers: { Authorization: "Bearer tTU3gFVUdP" }}
        ).then(res => {
            for (let index = 0; index < res.data.length; index++) {
                if(res.data[index]["current_status_code"]==="DEL"){
                    DEL.push(res.data[index]);
                }
            }
            setShipment(DEL);
            setApiData(res.data);
            
        });
        return () => {
        //
        };
    }, []);

    for (let index = 0; index < apiData.length; index++) {
        if(apiData[index]["current_status_code"]==="DEL"){
            DEL.push(apiData[index]);
        } else if(apiData[index]["current_status_code"]==="INT"){
            INT.push(apiData[index]);
        } else if(apiData[index]["current_status_code"]==="OOD"){
            OOD.push(apiData[index]);
        } else if(apiData[index]["current_status_code"]==="DEX"){
            DEX.push(apiData[index]);
        } else {
            NFI.push(apiData[index]);
        }
    }

    const DELHandler = (e) => {
        setFilter("DEL");
        setShipment(DEL);
    }
    const INTHandler = (e) => {
        setFilter("INT");
        setShipment(INT);
    }
    const OODHandler = (e) => {
        setFilter("OOD");
        setShipment(OOD);
    }
    const DEXHandler = (e) => {
        setFilter("DEX");
        setShipment(DEX);
    }
    const NFIHandler = (e) => {
        setFilter("NFI");
        setShipment(NFI);
    }
    return (
        <>
        <div className="cart-set">
            <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" onClick={DELHandler} className={filter==="DEL"? "cart-buttom-zero":"cart-buttom-one"}>
                    <p className="cart-head">DEL</p>
                    <p className="cart-body">{DEL.length}</p>
                </button>
                <button type="button" onClick={INTHandler} className={filter==="INT"? "cart-buttom-zero":"cart-buttom-one"}>
                    <p className="cart-head">INT</p>
                    <p className="cart-body">{INT.length}</p>
                </button>
                <button type="button" onClick={OODHandler} className={filter==="OOD"? "cart-buttom-zero":"cart-buttom-one"}>
                    <p className="cart-head">OOD</p>
                    <p className="cart-body">{OOD.length}</p>
                </button>
                <button type="button" onClick={DEXHandler} className={filter==="DEX"? "cart-buttom-zero":"cart-buttom-one"}>
                    <p className="cart-head">DEX</p>
                    <p className="cart-body">{DEX.length}</p>
                </button>
                <button type="button" onClick={NFIHandler} className={filter==="NFI"? "cart-buttom-zero":"cart-buttom-one"}>
                    <p className="cart-head">NFI</p>
                    <p className="cart-body">{NFI.length}</p>
                </button>
            </div>
        </div>
        <Table data={shipments}/>
        </>
    );
}

export default  Main;