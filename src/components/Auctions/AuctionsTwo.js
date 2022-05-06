import React, { Component, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import { withRouter } from "react-router";
import AuctionModal from "./AuctionModal";
import Web3 from "web3";
import {
  nftMarketContractAddress_Abi,
  nftMarketContractAddress,
} from "../Utils/Contract";
import { loadWeb3 } from "../../components/Api/api";
import CountdownTimer from "./Counter";
import Countdown from "react-countdown";
import moment from "moment";
const initData = {
  pre_heading: "Auctions",
  heading: " All Auctions",
  content:
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
  btnText: "Load More",
};

const data = [
  {
    id: "1",
    img: "/img/auction_1.jpg",
    date: "2021-12-09",
    title: "Virtual Worlds",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@Richard",
    price: "1.5 BNB",
    count: "1 of 1",
  },
  {
    id: "2",
    img: "/img/auction_2.jpg",
    date: "2021-10-05",
    title: "Collectibles",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@JohnDeo",
    price: "2.7 BNB",
    count: "1 of 1",
  },
  {
    id: "3",
    img: "/img/auction_3.jpg",
    date: "2021-09-15",
    title: "Arts",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@MKHblots",
    price: "2.3 BNB",
    count: "1 of 1",
  },
  {
    id: "4",
    img: "/img/auction_4.jpg",
    date: "2021-12-29",
    title: "Robotic Arts",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@RioArham",
    price: "1.8 BNB",
    count: "1 of 1",
  },
  {
    id: "5",
    img: "/img/auction_5.jpg",
    date: "2022-01-24",
    title: "Magazine Fall",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Inspiration",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "7",
    img: "/img/auction_7.jpg",
    date: "2022-01-24",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_7.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "8",
    img: "/img/auction_8.jpg",
    date: "2022-03-30",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_8.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "9",
    img: "/img/auction_9.jpg",
    date: "2022-03-30",
    title: "Design Illusions",
    seller_thumb: "/img/avatar_4.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "10",
    img: "/img/auction_10.jpg",
    date: "2022-03-30",
    title: "Infinity",
    seller_thumb: "/img/avatar_1.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "11",
    img: "/img/auction_11.jpg",
    date: "2022-01-24",
    title: "Sports",
    seller_thumb: "/img/avatar_2.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "12",
    img: "/img/auction_12.jpg",
    date: "2022-03-30",
    title: "Characteristics",
    seller_thumb: "/img/avatar_3.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
];

const NftView = ({ src }) => {
  const [img, setImg] = useState(true);
  const loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      setImg(false);
    };
    img.src = src;
  };
  useEffect(() => {
    loadMedia(src);
  }, []);

  return (
    <img
      style={{ height: "200px", width: "300px" }}
      className="card-img-top"
      src={src}
      alt=""
    />
  );
};
const Timer = ({ start, duration }) => {
  const [time, setTime] = useState(start + duration - Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((t) => t - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const showTime = (curr) => {
    let t = parseInt(curr / 1000);
    const sec = t % 60;
    t = parseInt(t / 60);
    const min = t % 60;
    t = parseInt(t / 60);

    let timer = "";
    if (t > 0) timer += t + "H ";
    if (min > 0) timer += min + "M ";
    timer += sec + "S";

    return timer;
  };

  if (time > 0) return <div>{showTime(time)}</div>;
  return <div>Ended</div>;
};
class AuctionsTwo extends Component {
  _isMounted = 1;

  state = {
    initData: {},
    data: [],
    liveAuctions: [],
    source: [],
    isOpen: false,
    currentLoad: 0,
  };

  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  fetchNFTs = async () => {
    let acc = await loadWeb3();
    const web3 = window.web3;

    console.log("web3", web3);

    let getItems = new web3.eth.Contract(
      nftMarketContractAddress_Abi,
      nftMarketContractAddress
    );
    let nftContractInstance = new web3.eth.Contract(
      nftMarketContractAddress_Abi,
      nftMarketContractAddress
    );
  };
  fetchImageObject = async () => {
    try {
      let resp;
      if (this._isMounted === 1) {
        this.state.liveAuctions.forEach((nft) =>
          axios
            .get(`https://gateway.pinata.cloud/ipfs/${nft.token.uri}`)
            .then((resp) =>
              this.setState({
                source: {
                  ...this.state.source,
                  [nft.id]: `https://ipfs.io/ipfs/${resp.data.url}`,
                },
              })
            )
        );
      }

      if (this._isMounted === 1) {
        this.setState(() => ({
          isLoaded: true,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  getLiveAuction = gql`
    {
      auctions(where: { status: OPEN }) {
        id
        status
        owner
        token {
          id
        }
        reservePrice
        auctionCreatedAt
        auctionEndedAt
        txnHash
        firstBidTime
        duration
        lastBid {
          bid
          bidder
        }
        bids {
          bidder
          bid
          timestamp
          status
        }
      }
    }
  `;
  getLiveAuction = async () => {
    const query = `
    {
      auctions (where:{status:OPEN}){
        id
        token {
          id
          uri
          name
          description
        }
        reservePrice
        owner
        firstBidTime
        duration
        lastBid {
          id
          bidder
          bid
          status
        }
        bids {
          id
          bidder
          bid
        }
        auctionCreatedAt
        auctionEndedAt
        txnHash
      }
    }
  `;
    try {
      const response = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(
          {
            isLoaded: true,
            liveAuctions: response.data.data.auctions,
            currentLoad:
              response.data.data.auctions.length > 8
                ? 8
                : response.data.data.auctions.length,
          },
          () => {
            this.fetchImageObject();
          }
        );
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };
  handleLoadMore = () => {
    if (this.state.currentLoad < this.state.liveAuctions.length) {
      if (this.state.currentLoad + 4 <= this.state.liveAuctions.length) {
        this.setState({ currentLoad: this.state.currentLoad + 4 });
      } else {
        this.setState({ currentLoad: this.state.liveAuctions.length });
      }
    } else {
    }
  };
  auction = async () => {
    const res = await axios.get(
      `https://wire-nft.herokuapp.com/get_auctions_list`
    );
    console.log("ressssssss", res);
    this.setState({
      liveAuctions: res.data.data,
      currentLoad: res.data.data.length > 8 ? 8 : res.data.data.length,
    });
    return res;
  };

  componentDidMount() {
    this._isMounted = 1;
    this.setState({
      initData: initData,
      data: data,
    });

    this.fetchNFTs();
    // this.getLiveAuction();
    this.auction();
  }
  completed = () => {
    console.log("Timer has completed");
  };

  tick = (milliseconds) => {
    console.log(milliseconds);
  };

  props = {
    // timeLeft: 56000,
    completeCallback: this.completed(),
    tickCallback: this.tick(),
  };
  render() {
    var { liveAuctions } = this.state;
    const { currentLoad } = this.state;
    const handleOpenModel = () => {
      this.setState({ isOpen: true });
    };
    console.log("liveAuctions", liveAuctions);
    console.log("currentLoad", currentLoad);

    return (
      <section className="live-auctions-area load-more">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.initData.pre_heading}</span>
                <h3 className="mt-3 mb-3">{this.state.initData.heading}</h3>
                {console.log("isOpen", this.state.isOpen)}

                {this.state.isOpen ? (
                  <AuctionModal
                    onHide={this.closeModal}
                    closeModal={this.closeModal}
                    isOpen={this.state.isOpen}
                    handleSubmit={this.handleSubmit}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <div className="row items">
            {liveAuctions &&
              // !!liveAuctions.length &&
              liveAuctions.slice(0, currentLoad).map((item, idx) => {
                return (
                  <div
                    key={`auct_${idx}`}
                    className="col-10 col-sm-4 mr-5 col-lg-3 mt-4"
                  >
                    <div
                      style={{
                        cursor: "pointer",
                        width: "120%",
                        margin: "40px",
                      }}
                      onClick={() =>
                        // this.props.history.push(
                        //   `/details/${item.token.id}`,
                        //   this.state.item
                        // )
                        handleOpenModel()
                      }
                      className="mr-5 card"
                    >
                      <div className="image-over">
                        <NftView src={this.state.source[item.id]} />

                        {/* <a href="/item-details">
                          <img className="card-img-top" src={item.img} alt="" />
                        </a> */}
                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body">
                          <div className="countdown-times mb-3">
                            <div
                              className="countdown d-flex justify-content-center"
                              data-date={item?.bidEndTime}
                            />
                            <CountdownTimer
                              timeLeft={moment(item?.bidEndTime * 1000).diff(
                                moment()
                              )}
                            />

                            {console.log(
                              "parseInt(Date.now()) / 1000",
                              moment(item?.bidEndTime * 1000).diff(moment())
                            )}

                            {/* {console.log(" item?.bidEndTime", item?.bidEndTime)} */}
                            {/* <Countdown
                              date={item?.bidEndTime - Date.now().valueOf()}
                              intervalDelay={0}
                              precision={3}
                              renderer={(props) => <div>{props.total}</div>}
                            /> */}
                          </div>
                          <h5
                            onClick={() =>
                              // this.props.history.push(
                              //   `/details/${item.token.id}`,
                              //   this.state.data
                              // )
                              handleOpenModel()
                            }
                            className="mb-0"
                          >
                            {item?.tokenId}
                          </h5>
                          <h6 className="mb-0 mt-2">{item?.price}</h6>
                          <a className="seller d-flex align-items-center my-3">
                            <span
                              className=""
                              style={{ fontSize: "10px", fontWeight: "bold" }}
                            >
                              {item?.owner}
                            </span>
                          </a>
                          <div className="card-bottom d-flex justify-content-between">
                            {/* <span>
                              {Web3.utils
                                .fromWei(item?.reservePrice, "ether")
                                .toString()}
                              ETH
                            </span> */}
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
          <div className="row">
            <div className="col-12 text-center">
              {currentLoad === this.state.liveAuctions.length ? null : (
                <a
                  onClick={this.handleLoadMore}
                  className="btn btn-bordered-white mt-5"
                  href="#"
                >
                  {this.state.initData.btnText}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(AuctionsTwo);
