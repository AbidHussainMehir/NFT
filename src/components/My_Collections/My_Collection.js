import React, { useState, useEffect } from "react";
import axios from "axios";
import Web3 from "web3";
import { loadWeb3 } from "../Api/api";
import { useHistory } from "react-router-dom";
import { wireNftContractAbi, wireNftContractAddress } from "../Utils/wireNft";
import { useMoralisWeb3Api, useMoralis } from "react-moralis";
import { useSelector, useDispatch } from "react-redux";

import { incrementByAmount } from "../../themes/counterSlice";
import { faker } from "@faker-js/faker";

// import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../../config'

function My_Collection() {
  let [btnTxt, setBtTxt] = useState("Connect");
  let [imageArray, setImageArray] = useState([]);
  let [initialLimit, setInitialLimit] = useState(0);
  let [finalLimit, setFinalLimit] = useState(6);
  let [mywalletLength, setMyWalletLength] = useState();
  let [pageNumber, setPageNumber] = useState(1);
  let [totalPages, setTotalPages] = useState(1);
  let myHistory = useHistory();

  const Web3Api = useMoralisWeb3Api();
  const { isInitialized, authenticate, isAuthenticated, user, initialize } =
    useMoralis();
  const [nftdata, setnftdata] = useState([]);
  // const values = useSelector((state) => state.counter.value)

  const getAccount = async () => {
    let acc = await loadWeb3();
    console.log("ACC=", acc);
    if (acc == "No Wallet") {
      setBtTxt("No Wallet");
    } else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network");
    } else {
      let myAcc =
        acc?.substring(0, 4) + "..." + acc?.substring(acc?.length - 4);
      setBtTxt(myAcc);
    }
  };

  const fetchNFTs = async () => {
    let acc = await loadWeb3();

    let myDummyArray = [];
    let imageArray = [];
    initialize();
    // Moralis.start()
    const options = {
      chain: "Bsc Testnet",
      address: acc,
    };

    const polygonNFTs = await Web3Api.account.getNFTs(options);

    let res = polygonNFTs.result;
    console.log("length", res);
    let loopLength = res.length;
    console.log("Bahir", loopLength);
    for (let i = 0; i < loopLength; i++) {
      console.log("count", i);
      console.log("length", res[i]);
      console.log("Images , ", res[i].token_uri);
      let jsonUsrl = res[i].token_uri;
      let name = res[i].name;
      let owner_of = res[i].owner_of;
      let token_address = res[i].token_address;
      let amount = res[i].amount;
      let symbol = res[i].symbol;
      let token_id = res[i].token_id;
      // if (jsonUsrl.startsWith("ipfs")) {
      //   jsonUsrl= "https://ipfs.moralis.io:2053/ipfs/" + jsonUsrl.split("ipfs://ipfs").slice(-1)[0];
      // console.log("jsonUsrl",jsonUsrl);

      // } else {
      //   jsonUsrl= jsonUsrl
      // console.log("jsonUsrlghg",jsonUsrl);

      // }

      let finalUrl;
      // =await axios.get(jsonUsrl);
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
    }
    setnftdata(imageArray);
  };

  const loadMore = () => {
    let a = finalLimit + 6;
    if (a >= mywalletLength) {
      setInitialLimit(initialLimit + 6);
      if (pageNumber < totalPages) {
        setPageNumber(pageNumber + 1);
      }
      console.log("Loading More Up");
      setFinalLimit(mywalletLength);
    } else {
      console.log("Loading More");
      if (pageNumber < totalPages) {
        setPageNumber(pageNumber + 1);
      }
      setInitialLimit(initialLimit + 6);
      setFinalLimit(finalLimit + 6);
    }
  };

  const loadLess = () => {
    let b = finalLimit - 6;

    if (b <= 6) {
      setFinalLimit(6);
      setInitialLimit(0);
      if (pageNumber > 1) {
        setPageNumber(pageNumber - 1);
      }
    } else {
      setInitialLimit(initialLimit - 6);
      setPageNumber(pageNumber - 1);
      setFinalLimit(finalLimit - 6);
    }
  };
  const allImagesNfts = async () => {
    let acc = await loadWeb3();
    if (acc == "No Wallet") {
      console.log("wallet");
      setBtTxt("Connect Wallet");
    } else if (acc == "Wrong Network") {
      setBtTxt("Wrong Network");
    } else if (acc == "Connect Wallet") {
      console.log("Connect Wallet");
    } else {
      const web3 = window.web3;
      let nftContractOf = new web3.eth.Contract(
        wireNftContractAbi,
        wireNftContractAddress
      );
      let simplleArray = [];
      let walletOfOwner = await nftContractOf.methods.walletOfOwner(acc).call();
      let walletLength = walletOfOwner.length;
      setMyWalletLength(walletLength);
      console.log("walletOfOwner", walletOfOwner);
      let ttlPage = parseInt(walletLength) / 6;
      ttlPage = Math.ceil(ttlPage);
      setTotalPages(ttlPage);
      console.log("Total Pages", ttlPage);
      if (parseInt(walletLength) > 0) {
        {
          let myImgArry = [];
          let myNameDate = [];
          for (let i = 1; i <= walletLength; i++) {
            console.log("For loop", i);
            try {
              let res = await axios.get(
                `https://gateway.pinata.cloud/ipfs/QmXQc7AEmCqrtShVv3k5PdRbhfwgMoHL1HKXMZU4seCe9S/${walletOfOwner[i]}.jpg`
              );
              // let imageUrl = res.data.image;
              // let dna = res.data.dna
              simplleArray = [...simplleArray, { imageUrl: res }];
              setImageArray(simplleArray);
              console.log("Getting Response", res);
            } catch (e) {
              console.log("Error while Fetching Api", e);
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isInitialized) {
      fetchNFTs();
    }
  }, [isInitialized]);

  useEffect(() => {
    allImagesNfts();
    getAccount();
    fetchNFTs();

    // setInterval(() => {

    // }, 1000);
  }, []);
  return (
    <section className="mt-4 author-area">
      <div className="container">
        <div className="row justify-content-between">
          <div className="">
            {/* Intro */}
            <div className="intro mt-5 mt-lg-0 mb-4 mb-lg-5">
              <div className="intro-content">
                <span>Get Started</span>
                <h3 className="mt-3 mb-0">My Collections</h3>
              </div>
            </div>

            <div className="row items">
              {nftdata.map((item, index) => {
                // let myVar = index+1;
                let myvar = index;

                console.log("myVar ", myvar);

                return (
                  <div className="col-10 col-sm-4 mr-5 col-lg-3 mt-4">
                    <div
                      style={{
                        cursor: "pointer",
                        width: "120%",
                        margin: "40px",
                      }}
                      onClick={() => myHistory.push("/details/" + myvar)}
                      className="mr-5 card"
                    >
                      <div className="image-over">
                        {/* <NftView src={this.state.source[item.id]} /> */}
                        {/* <img src={item.seller_thumb} alt="" /> */}
                        {/* <img src={imageArray[index].imageUrl.config.url} className='myCollectionsImage' alt="" /> */}
                        {/* <img src={item.url} className='myCollectionsImage' alt="" /> */}
                        {/* <img src="avtar" className='myCollectionsImage' alt="" /> */}
                        <img
                          src={faker.image.image()}
                          alt="Avatar"
                          className="avatar myCollectionsImage"
                        ></img>

                        {/* <a href="/item-details">
                          <img className="card-img-top" src={item.img} alt="" />
                        </a> */}
                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body">
                          {/* <div className="countdown-times mb-3">
                            <div
                              className="countdown d-flex justify-content-center"
                              data-date={item.date}
                            
                            />
                          </div> */}
                          <h5
                            // onClick={() =>
                            //   myHistory.push("/details/"+ myVar)
                            //   this.props.history.push(
                            //     `/details/${item.token.id}`,
                            //     this.state.data
                            //   )
                            // }
                            className="mb-0"
                          >
                            {item.name}
                          </h5>
                          <a className="seller d-flex align-items-center my-3">
                            <span
                              className=""
                              style={{ fontSize: "10px", fontWeight: "bold" }}
                            >
                              {/* {item.title} */}
                              {/* 12$ */}
                              {item.token_id}
                            </span>
                          </a>

                          <div className="card-bottom d-flex justify-content-between">
                            <span>
                              {/* {Web3.utils.fromWei(item.reservePrice, "ether")}{" "} */}
                              ETH
                            </span>
                            {/* <span>  <Timer
                      start={liveAuctions.auctionCreatedAt * 1000}
                      duration={liveAuctions.duration * 60 * 60 * 1000}
                    /></span> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="row d-flex flex-row justify-content-center justify-content-evenly">
              <div
                onClick={() => loadLess()}
                className="col-1 d-flex align-items-center justify-content-center"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png"
                  style={{ position: "absolute" }}
                />
                <img
                  src="https://i.ibb.co/NjDtXXY/Vector12.png"
                  style={{ position: " relative" }}
                />
              </div>
              <div className="col-lg-3 col-md-5 col d-flex flex-row align-items-center justify-content-evenly">
                {/* <span className='MyCollectionspan'>{mywalletLength}</span> */}

                {/* <span className='MyCollectionspan'>/{mywalletLength}</span> */}
              </div>
              {/* <button className='btn '> */}
              <div
                onClick={() => loadMore()}
                className="col-1 d-flex align-items-center justify-content-center ms-4"
                style={{ cursor: "pointer" }}
              >
                <img
                  src="https://i.ibb.co/FBMT5Lv/Rectangle-551.png"
                  style={{ position: "absolute" }}
                />
                <img
                  src="https://i.ibb.co/n1ZWTmj/Vector13.png"
                  style={{ position: " relative" }}
                />
              </div>
              {/* </button> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default My_Collection;
