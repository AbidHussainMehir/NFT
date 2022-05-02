import React, { useState, useEffect, useRef } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SellNFt from "./SellNFt";
import axios from "axios";

import "./Sell_style.css";
import { useParams, useHistory } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "../../features/userSlice";
import { loadWeb3 } from "../Api/api";

import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
  nftMarketToken_Abi,
} from "../Utils/Contract";
// import { getallNFTs } from "../../reducers/Get_Nfts/grt_nft.reducer";
import { getAllNFT } from "../../reducers/Get_Nfts/getNFT.reducer";

export default function Sellmain() {
  const { id } = useParams();
  const Web3Api = useMoralisWeb3Api();

  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();
  const dispatch = useDispatch();

  const [nftdata, setnftdata] = useState([]);
  const order_deatails = useSelector((state) => state);
  //   const value = useSelector((state) => state.user.value)
  const getNFT = async () => {
    const options = {
      chain: "Bsc Testnet",
      address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
    };
    const polygonNFTs = await Web3Api.account.getNFTs(options);
    dispatch(getAllNFT(polygonNFTs));
  };
  useEffect(() => {
    getNFT();
  }, []);

  let [tokenid, settoken_id] = useState();
  let [ownadd, setownadd] = useState();

  const inputdata_price = useRef();

  //   const fetchNFTs = async () => {
  //     let acc = await loadWeb3();

  //     let myDummyArray = []
  //     let imageArray = [];
  //     initialize()
  //     // Moralis.start()
  //     const options = {
  //       chain: "Bsc Testnet",
  //       address: "0x1BC322e7412b625cafC95f2a29f37a076e1C8a92",
  //     };
  //     const polygonNFTs = await Web3Api.account.getNFTs(options);

  //     let res = polygonNFTs.result[1];
  //     //  res = res[id];

  //     // console.log("lengthtayya", res);
  //     // let loopLength = res.length;
  //     // console.log("Bahir", loopLength);
  //     // let jsonUsrl = res.token_uri
  //     // let name = res.name;
  //     // let owner_of = res.owner_of;
  //     // let token_address = res.token_address;
  //     // let amount = res.amount;
  //     // let symbol = res.symbol;
  //     // let token_id = res.token_id;
  //     // settoken_id(token_id)
  //     // setownadd(token_address)
  //     // console.log("token_id", token_id);
  //     // // if (jsonUsrl.startsWith("ipfs")) {
  //     // //   jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
  //     // // } else {
  //     // //   jsonUsrl = jsonUsrl
  //     // // }

  //     // let finalUrl
  //     // // = await axios.get(jsonUsrl);
  //     // // finalUrl = finalUrl.data.image;
  //     // imageArray = [...imageArray, { url: finalUrl, name: name, owner_of: owner_of, token_address: token_address, amount: amount, symbol: symbol, token_id: token_id }]
  //     // console.log("Finally Url is ", finalUrl);
  //     // console.log("count", imageArray);

  //     // setnftdata(imageArray)

  //     dispatch(incrementByAmount(res))

  //   };

  // const addOrder=async()=>{
  //     let acc = await loadWeb3();
  //     // console.log("ACC=",acc)
  //     if (acc == "No Wallet") {
  //      toast.error("No Wallet Connected")
  //     }
  //     else if (acc == "Wrong Network") {
  //       toast.error("Wrong Newtwork please connect to test net")
  //     }else{
  //         try{
  //             const web3 = window.web3;
  //             let address="0x4113ccD05D440f9580d55B2B34C92d6cC82eAB3c"
  //             let value_price=inputdata_price.current.value;
  //             value_price=web3.utils.toWei(value_price)
  //             let curreny_time=	Math.floor(new Date().getTime()/1000.0)

  //             console.log("tayyab",address)

  //             console.log("ownaddress",tokenid)

  //             let nftContractOftoken = new web3.eth.Contract(nftMarketToken_Abi,ownadd);
  //              let getodernumberhere = new web3.eth.Contract(nftMarketContractAddress_Abi, nftMarketContractAddress);

  //             let getorderhere= await getodernumberhere.methods.tokenIdToItemId(tokenid).call();
  //             console.log("getorderhere", getorderhere)
  //             let getListingPrice= await getodernumberhere.methods.getListingPrice().call();

  //             console.log("getListingPrice",getListingPrice);

  //             await nftContractOftoken.methods.setApprovalForAll(nftMarketContractAddress,true).send({
  //                 from :acc,
  //             })
  //             toast.success("Approved Successfuly")

  //             let nftContractOf = new web3.eth.Contract(nftMarketContractAddress_Abi,nftMarketContractAddress);
  //                await nftContractOf.methods.createMarketItem(tokenid,value_price,1,false,curreny_time,ownadd).send({
  //                 from :acc,
  //                 value:getListingPrice
  //             })

  //             toast.success("Transion Compelete")

  //         }
  //         catch(e){
  //             console.log("Error while addOrder ",e)
  //         }
  //     }
  // }

  return (
    <div>
      {console.log("order_deatails", order_deatails.getnft)}

      {/* <Header/>
        <SellNFt/>
        <Footer/> */}
    </div>
  );
}
