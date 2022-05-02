import React, { useState, useEffect, useRef } from 'react'

import Web3 from 'web3'
import axios from 'axios'
import { loadWeb3 } from "../components/Api/api"
import { faker } from '@faker-js/faker'
import Header from "../components/Header/Header";
import Breadcrumb from "../components/Breadcrumb/Breadcrumb";
import ItemDetail from "../components/ItemDetails/ItemDetails";
import LiveAuctions from "../components/Auctions/AuctionsThree";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";
import { useParams, useHistory } from "react-router-dom";
import { nftMarketContractAddress_Abi, nftMarketContractAddress } from '../components/Utils/Contract'
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from 'react-redux'
import { incrementByAmount } from '../themes/counterSlice'


const ItemDetails = () => {

  let sellnft = useHistory()
  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, authenticate, isAuthenticated, user, initialize } = useMoralis()
  const [nftdata, setnftdata] = useState([])
  // const values = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  let simplleArray = [];


  console.log("time", nftMarketContractAddress);

  const { id } = useParams();
  console.log("You Clicked and recieved", id);
  const modalRef = useRef(null);
  const closeModalSearch = () => {
    modalRef.current.click();
  };



  const fetchNFTs = async () => {
    let acc = await loadWeb3();

    let myDummyArray = []
    let imageArray = [];
    initialize()
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
    console.log("Bahir", loopLength);
    let jsonUsrl = res.token_uri
    let name = res.name;
    let owner_of = res.owner_of;
    let token_address = res.token_address;
    let amount = res.amount;
    let symbol = res.symbol;
    let token_id = res.token_id;
    console.log("token_id", token_id);
    // if (jsonUsrl.startsWith("ipfs")) {
    //   jsonUsrl = "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
    // } else {
    //   jsonUsrl = jsonUsrl
    // }

    let finalUrl
    // = await axios.get(jsonUsrl);
    // finalUrl = finalUrl.data.image;
    imageArray = [...imageArray, { url: finalUrl, name: name, owner_of: owner_of, token_address: token_address, amount: amount, symbol: symbol, token_id: token_id }]
    console.log("Finally Url is ", finalUrl);
    console.log("count", imageArray);

    setnftdata(imageArray)

    dispatch(incrementByAmount(imageArray))

  };


  useEffect(() => {
    if (isInitialized) {
      fetchNFTs()
    }
  }, [isInitialized]);
  return (




    <section className="mt-4 item-details-area">
      <div className="container">
        {
          nftdata.map((items, index) => {
            return (
              <div className="row justify-content-between">

                <div className="col-12 col-lg-5">
                  <div className="item-info">
                    <div className=" p-4 item-thumb text-center">

                      {/* <img
                        style={{ width: "400px", height: "400px" }}
                        src={items.url}

                        alt=""
                      /> */}

                      <img src={faker.image.image()} alt="Avatar"
                        style={{ width: "400px", height: "400px" }}


                      />


                    </div>
                    <ul className="mt-5 p-2 netstorm-tab nav nav-tabs" id="nav-tab">
                      <li>
                        <a
                          className="active"
                          id="nav-home-tab"
                          data-toggle="pill"
                          href="#nav-home"
                        >
                          <h5 className="m-0">Bids</h5>
                        </a>
                      </li>
                      <li>
                        <a
                          id="nav-profile-tab"
                          data-toggle="pill"
                          href="#nav-profile"
                        >
                          <h5 className="m-0">History</h5>
                        </a>
                      </li>
                      <li>
                        <a
                          id="nav-contact-tab"
                          data-toggle="pill"
                          href="#nav-contact"
                        >
                          <h5 className="m-0">Details</h5>
                        </a>
                      </li>
                    </ul>
                    <div className="tab-content" id="nav-tabContent">
                      <div className="tab-pane fade show active" id="nav-home">
                        <ul className="list-unstyled">
                          {/* Single Tab List */}
                          {/* {this.state.tabData_1.map((item, idx) => { */}
                          {/* return ( */}
                          <li
                            // key={`tdo_${idx}`}
                            className="single-tab-list d-flex align-items-center"
                          >
                            <img
                              className="avatar-sm rounded-circle mr-3"
                              src={items.url}
                              alt=""
                            />
                            <p className="m-0">
                              {/* {this.state.auctions?.lastBid?.bid ? (
                  `Bid listed for
                    ${Web3.utils.fromWei(
                      this.state.auctions?.lastBid?.bid,
                      "ether"
                    )} ETH
                  by
                    ${this.state.auctions?.lastBid?.bidder}`
                ) : (
                  
                )} */}
                              <span>No Bids Yet</span>
                            </p>
                          </li>
                        </ul>
                      </div>
                      <div className="tab-pane fade" id="nav-profile">
                        <ul className="list-unstyled">
                          <li className="single-tab-list d-flex align-items-center">
                            <img
                              className="avatar-sm rounded-circle mr-3"
                              // src={`https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${id}.jpg`}
                              src={items.url}
                              alt=""
                            />

                            <p className="m-0">
                              {/* {this.state.type} for
                    <br />
                    {Web3.utils.fromWei(
                      this.state.auctions?.reservePrice,
                      "ether"
                    )}{" "}
                    ETH by {this.state.data.auction?.owner} */}
                              Listed for <br /> 1 ETH by
                            </p>
                            {/* {(this.state.auctions &&
              this.state.auctions?.reservePrice && (
                <p className="m-0">
                  {this.state.type} for
                    <br />
                    {Web3.utils.fromWei(
                      this.state.auctions?.reservePrice,
                      "ether"
                    )}{" "}
                    ETH by {this.state.data.auction?.owner}
               
                </p>
              )) ||
              (this.state.data.sale && (
                <p className="m-0">
                  Listed for
                  <br />
                  {Web3.utils.fromWei(
                    this.state.data.sale?.price,
                    "wei"
                  )}{" "}
                  ETH by {this.state.data.sale?.owner}
                </p>
              )) || (
                <p className="m-0">
                  {this.state.data.sale?.buyer ? (
                    `Bought for
                    ${this.state.data?.sale?.price} ETH
                  by ${this.state.data?.sale?.buyer}`
                  ) : (
                    <span>No Activity</span>
                  )}
                </p>
              )} */}
                          </li>
                          {/* ); */}
                          {/* })} */}
                        </ul>
                      </div>
                      <div className="tab-pane fade" id="nav-contact">
                        {/* Single Tab List */}
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${url}`}
                            target="_blank"
                          >
                            View On Ipfs
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${metaData}`}
                            target="_blank"
                          >
                            View MetaData
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${eth_base}${CONTRACT_ADDRESS}?a=${tokenId}`}
                            target="_blank"
                          >
                            View On EtherScan
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${opensea}${CONTRACT_ADDRESS}/${tokenId}`}
                            target="_blank"
                          >
                            View On OpenSea
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${rarible}${CONTRACT_ADDRESS}:${tokenId}`}
                            target="_blank"
                          >
                            View On Rarible
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${rarible}${CONTRACT_ADDRESS}:${tokenId}`}
                            target="_blank"
                          >
                            {items.amount}
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${rarible}${CONTRACT_ADDRESS}:${tokenId}`}
                            target="_blank"
                          >
                            {items.token_address}
                          </a>
                        </div>
                        <div className="owner-meta d-flex align-items-center mt-3">
                          <a
                            className="owner d-flex align-items-center ml-2"
                            // href={`${rarible}${CONTRACT_ADDRESS}:${tokenId}`}
                            target="_blank"
                          >
                            {items.token_id}
                          </a>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="col-12 col-lg-6">
                  <div className="content mt-5 mt-lg-0">
                    <h3 className="m-0">{items.name}</h3>
                    {/* {this.state.data.description && (
      <p>{this.showDescription(this.state.data.description)}</p>
    )} */}
                    <p>{items.symbol}</p>

                    <div className="row items">
                      <div className="col-12 col-md-6 item px-lg-2">
                        <div style={{ width: "540px" }} className="card no-hover">
                          <div className="single-seller d-flex align-items-center">
                            <a>
                              <img
                                className="avatar-md rounded-circle"
                                src={items.url}
                                alt=""
                              />
                            </a>
                            {/* Seller Info */}
                            <div
                              // onClick={() =>
                              //   this.props.history.push(
                              //     `/creator/${this.state.data.creator?.id}`
                              //   )
                              // }

                              className="seller-info ml-3"
                            >
                              <a style={{ fontSize: "25px" }} className="seller ">
                                <h5 style={{ fontSize: "14px", cursor: "pointer" }}>
                                  {/* {this.state.data.creator?.id} */}
                                  {items.owner_of}
                                </h5>
                              </a>
                              <span>Creator</span>
                            </div>
                          </div>
                        </div>
                      </div>


                      <div className="col-12 item px-lg-2">
                        <div className="card ">
                          {/* <h4 className="mt-0 mb-2">Highest Bid</h4> */}
                          {/* <h4 className='mt-0 mb-2'>Current Price</h4> */}
                          <div className="price row py-4">
                            <div className="col-lg-6">
                              <button className='btn btn-lg '
                                onClick={() => sellnft.push("/sellmain/" + id)}
                              >Sell</button>
                            </div>
                            <div className="col-lg-6">
                              <button className='btn btn-lg '
                                onClick={() => sellnft.push("/Auctionsbide/" + id)}
                              >Auctions</button>
                            </div>
                            <span>


                              {/* {this.state.auctions?.lastBid?.bid
                                     ? `${Web3.utils.fromWei(
                                  this.state.auctions.lastBid?.bid,
                                 "ether"
                                  )} ETH`
                                : "0 ETH"} */}
                              {/* 0 ETH */}


                            </span>

                            {/* <button className='btn btn-lg my-4 '
                              onClick={() => sellnft.push("/sellmain/" + id)}
                            >Auctions</button> */}
                            {/* <span>{this.state.auctions?.reservePrice}</span> /sellmain*/}
                          </div>
                          {/* <button className='btn btn-lg my-4'
                            onClick={() => sellnft.push("/sellmain/" + id)}
                          >Sell</button> */}
                        </div>

                        {/* <div className="card no-hover countdown-times my-4">
              <div className="countdown d-flex justify-content-center">
                <Timer
                  start={this.state.auctions.auctionCreatedAt * 1000}
                  duration={
                    this.state.auctions.duration * 60 * 60 * 1000
                  }
                />
                ENDED
              </div>
            </div> */}
                        {/* {this.state.auctions?.owner != address &&
              this.state.auctions.auctionCreatedAt * 1000 +
                this.state.auctions.duration * 60 * 60 * 1000 >
                Date.now() && (
                <div>
                  <input
                    type="text"
                    placeholder="Enter Bid Value in ETH"
                    className="d-block btn btn-bordered-white mt-4"
                    id="bid"
                  ></input>
                  <a
                    className="d-block btn btn-bordered-white mt-4"
                    onClick={this.placeBid}
                  >
                    Place Bid
                  </a>
                </div>
              )} */}
                      </div>

                    </div>
                  </div>

                </div>



              </div>
            )
          })
        }

      </div>
    </section>


  );
};

export default ItemDetails;
