import React, { useState, useEffect, useRef } from "react";
// import Footer from '../Footer/Footer'
// import Header from '../Header/Header'
// import SellNFt from './SellNFt'
// import axios from 'axios'

import "../Sell/Sell_style.css";
import { useParams, useHistory } from "react-router-dom";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";
import { incrementByAmount } from "../../themes/counterSlice";
import { loadWeb3 } from "../Api/api";

import { faker } from "@faker-js/faker";
import { toast } from "react-toastify";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
  nftMarketToken_Abi,
} from "../Utils/Contract";
import { BidingContact_Abi, BidingContact } from "../Utils/BidingContact";
import axios from "axios";

export default function Auctionsbiding() {
  const { id } = useParams();
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();
  const [nftdata, setnftdata] = useState([]);
  // const values = useSelector((state) => state.counter.value)
  const dispatch = useDispatch();

  let [tokenid, settoken_id] = useState();
  let [ownadd, setownadd] = useState();

  const inputdata_price = useRef();

  const selectoption = useRef();

  const [addrtype, setAddrType] = useState("Home");

  function handleAddrTypeChange(e) {
    setAddrType(e.target.value);
    console.log("addrtype", addrtype);
  }

  let token_address;
  let token_id;
  const fetchNFTs = async () => {
    let acc = await loadWeb3();
    // let polyg = new web3.eth.Contract(
    //   nftMarketContractAddress_Abi,
    //   nftMarketContractAddress
    // );

    // const polygRes = await polyg.methods.idToMarketItem(id).call();

    // console.log("id", polygRes);
    let myDummyArray = [];
    let imageArray = [];
    initialize();
    // Moralis.start()
    const options = {
      chain: "Bsc Testnet",
      address: acc,
    };
    const polygonNFTs = await Web3Api.account.getNFTs(options);

    let res = polygonNFTs.result[id];
    //  res = res[id];

    console.log("lengthtayya", res);
    let loopLength = res.length;
    // console.log("Bahir", loopLength);
    let jsonUsrl = res.token_uri;
    let name = res.name;
    let owner_of = res.owner_of;
    token_address = res.token_address;
    let amount = res.amount;
    let symbol = res.symbol;
    token_id = res.token_id;
    settoken_id(token_id);
    setownadd(token_address);
    // console.log("token_id", token_address);

    // if (jsonUsrl.startsWith("ipfs")) {
    //     jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
    // } else {
    //     jsonUsrl = jsonUsrl
    // }

    let finalUrl;
    //  = await axios.get(jsonUsrl);
    // finalUrl = finalUrl.data.image;
    imageArray = [
      ...imageArray,
      {
        url: finalUrl,
        name: name,
        owner_of: owner_of,
        token_address: token_address,
        amount: amount,
        symbol: symbol,
        token_id: token_id,
      },
    ];
    console.log("Finally Url is ", finalUrl);
    console.log("count", imageArray);

    setnftdata(imageArray);

    dispatch(incrementByAmount(imageArray));
  };

  const addOrder = async () => {
    let acc = await loadWeb3();
    // console.log("ACC=",acc)
    if (acc == "No Wallet") {
      toast.error("No Wallet Connected");
    } else if (acc == "Wrong Network") {
      toast.error("Wrong Newtwork please connect to test net");
    } else {
      try {
        const web3 = window.web3;
        let address = "0x4113ccD05D440f9580d55B2B34C92d6cC82eAB3c";
        let value_price = inputdata_price.current.value;
        let selecthere = selectoption.current.value;
        value_price = web3.utils.toWei(value_price);
        let curreny_time = Math.floor(new Date().getTime() / 1000.0);
        let current_time_and_days = 86400 * selecthere;
        current_time_and_days = current_time_and_days + curreny_time;

        console.log("selecthere", selecthere);
        console.log("current_time_and_days", current_time_and_days);
        console.log("curreny_time", curreny_time);

        console.log("ownaddress", tokenid);

        if (current_time_and_days > curreny_time) {
        }

        let nftContractOftoken = new web3.eth.Contract(
          nftMarketToken_Abi,
          ownadd
        );
        let nftContractInstance = new web3.eth.Contract(
          nftMarketContractAddress_Abi,
          nftMarketContractAddress
        );
        const getItemId = await nftContractInstance.methods
          .tokenIdToItemId(ownadd, tokenid)
          .call();

        console.log("tokenIdToItemId", getItemId);

        let getListingPrice = await nftContractInstance.methods
          .getListingPrice()
          .call();

        await nftContractOftoken.methods
          .setApprovalForAll(nftMarketContractAddress, true)
          .send({
            from: acc,
          })
          .then(() => {
            let getItemId = nftContractInstance.methods
              .tokenIdToItemId(ownadd, tokenid)
              .call();
            let polygRes = nftContractInstance.methods
              .idToMarketItem(getItemId)
              .call();
            toast.success("Approved Successfuly");
          })
          .catch((error) => {
            console.error("onRejected function called: " + error.message);
          });

        let nftContractOf = new web3.eth.Contract(
          nftMarketContractAddress_Abi,
          nftMarketContractAddress
        );

        await nftContractOf.methods
          .createMarketItem(
            tokenid,
            value_price,
            1,
            true,
            current_time_and_days,
            ownadd
          )
          .send({
            from: acc,
            value: getListingPrice,
          });
        const getAll = await nftContractOf.methods
          .idToMarketItem(getItemId)
          .call();
        console.log("getAll", getAll);
        await axios
          .post(`https://wire-nft.herokuapp.com/save_auction`, {
            itemId: getAll.itemId.toString(),
            tokenId: getAll.tokenId.toString(),
            bidEndTime: getAll.selecthere,
            isOnAuction: getAll.isOnAuction,
            sold: getAll.sold,
            nftContract: getAll.nftContract.toString(),
            owner: getAll.seller.toString(),
            price: getAll.price.toString(),
          })
          .then((response) => {
            console.log(response, "...ssssss");
          })
          .catch((error) => {
            console.log(error, "..eeeeee");
          });
        // toast.success("Transion Compelete");
      } catch (e) {
        console.log("Error while addOrder ", e);
      }
    }
  };

  useEffect(() => {
    if (isInitialized) {
      fetchNFTs();
    }
  }, [isInitialized]);

  return (
    <div>
      <section className="mt-4 item-details-area">
        <div className="container">
          {nftdata.map((items, index) => {
            return (
              <div className="row justify-content-between">
                <div className="col-12 col-lg-6">
                  <div className="content mt-5 mt-lg-0">
                    <h3 className="m-0">{items.name}</h3>
                    {/* {this.state.data.description && (
                                           <p>{this.showDescription(this.state.data.description)}</p>
                                        )} */}
                    <p>{items.symbol}</p>

                    <div className="row items">
                      <div className="col-12 item px-lg-2">
                        <div className="card no-hover">
                          <div className="single-seller d-flex align-items-center">
                            <div className="seller-info mt-3">
                              <h5>Price</h5>
                            </div>

                            <input
                              type="text"
                              placeholder="Enter Bid Value in ETH"
                              className="d-block btn btn-bordered-white mt-4 ml-4"
                              id="bid"
                              ref={inputdata_price}
                            />

                            {/* Seller Info */}
                          </div>
                        </div>
                      </div>

                      <div className="col-12 item px-lg-2">
                        <div className="card ">
                          <select
                            name="days"
                            class="dropdown__filter"
                            id=""
                            style={{ backgroundColor: "rgba(0, 0, 0, .12)" }}
                            ref={selectoption}
                          >
                            <option value="" selected disabled hidden>
                              Select Days
                            </option>
                            <option value="1" class="dropdown__select">
                              1 Day
                            </option>
                            <option value="3"> 3 Days</option>
                            <option value="7"> 7 Days</option>
                            <option value="90"> 3 Months</option>
                            <option value="180"> 6 Months</option>
                          </select>
                        </div>

                        <button
                          className="btn my-4 form-control btn-lg"
                          style={{ padding: "25px 25px 35px 25px" }}
                          onClick={() => addOrder()}
                        >
                          Complete Listing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-5">
                  <div className="item-info">
                    <div className=" p-4 item-thumb text-center">
                      {/* <img
                                                    style={{ width: "400px",F height: "400px" }}
                                                  src={items.url}
                                                    alt=""
                                                /> */}
                      <img
                        src={faker.image.image()}
                        alt="Avatar"
                        style={{ width: "400px", height: "400px" }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
