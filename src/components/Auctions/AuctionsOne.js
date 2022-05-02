import React, { Component, useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import axios from "axios";
import "./Auction.css";
import { withRouter } from "react-router";
import AuctionModal from "./AuctionModal";

const initData = {
  pre_heading: "Auctions",
  heading: "Live Auctions",
  btnText: "View All",
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
    title: "Design Illusions",
    seller_thumb: "/img/avatar_5.jpg",
    seller: "@ArtNox",
    price: "1.7 BNB",
    count: "1 of 1",
  },
  {
    id: "6",
    img: "/img/auction_6.jpg",
    date: "2022-03-30",
    title: "Photography",
    seller_thumb: "/img/avatar_6.jpg",
    seller: "@Junaid",
    price: "3.5 BNB",
    count: "1 of 1",
  },
];

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
const NftView = ({ src }) => {
  const [img, setImg] = useState(true);
  const loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      console.log(src);
      setImg(false);
    };
    img.src = src;
  };
  useEffect(() => {
    loadMedia(src);
  }, []);

  return (
    <img
      style={{ width: "450px", height: "300px" }}
      className="card-img-top"
      src={src}
      alt=""
    />
  );
};

class AuctionsOne extends Component {
  _isMounted = 1;

  state = {
    initData: {},
    data: [],
    liveAuctions: [],
    auctionNft: "",
    source: [],
    isOpen: false,
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => this.setState({ isOpen: false });
  handleSubmit = (tokenId, price) => {
    console.log(tokenId);
    console.log(price);
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
                  [nft.token.id]: `https://ipfs.io/ipfs/${resp.data.url}`,
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
      auctions(where: { status: "OPEN" }) {
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
      auctions (where:{status: "OPEN"}){
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
  componentDidMount() {
    this._isMounted = 1;

    this.setState({
      initData: initData,
      data: data,
    });
    // this.fetchImageObject();

    this.getLiveAuction();
  }
  componentWillUnmount() {
    this._isMounted = 0;
  }
  render() {
    var { liveAuctions } = this.state;
    var date = new Date(1627282552 * 1000);
    var auctionDate = date.toISOString();

    return (
      <section style={{ height: "850px" }} className="live-auctions-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <span>{this.state.initData.pre_heading}</span>
                  <a>
                    <h3 className="mt-3 mb-0">{this.state.initData.heading}</h3>
                  </a>
                </div>
                <div className="intro-btn">
                  <a href="/auctions" className="btn content-btn">
                    View All
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 row-10 mt-3 liveauction-card">
            <div className="swiper-container slider-mid items">
              <div className="swiper-wrapper">
                {/* Single Slide */}
                {liveAuctions &&
                  !!liveAuctions.length &&
                  liveAuctions.map((data, idx) => {
                    return (
                      <div
                        onClick={() =>
                          this.props.history.push(
                            `/details/${data.token.id}`,
                            this.state.data
                          )
                        }
                        // style={{ cursor: "pointer", height: "410px" }}
                        key={`auc_${idx}`}
                        className="swiper-slideitem liveauction-card"
                      >
                        <div
                          style={{ cursor: "pointer", width: "350px" }}
                          className="m-3 card"
                        >
                          <div
                            style={{
                              overflow: "visible",
                              // height: "250px",
                              // width: "350px",
                            }}
                            className="image-over"
                          >
                            <div
                              style={{
                                backgroundImage: `url(${
                                  this.state.source[data.token.id]
                                })`,
                                height: "250px",
                                width: "100%",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                              }}
                            ></div>
                            {/* <NftView src={this.state.source[idx]} /> */}

                            {/* <video
                              autoPlay
                              loop
                              muted
                              className="card-img-top"
                              src={this.state.source}
                              alt=""
                            ></video> */}
                          </div>
                          {/* Card Caption */}
                          <div className="card-caption col-12 p-0">
                            {/* Card Body */}
                            <div className="card-body">
                              <div className="countdown-times mb-3">
                                <div
                                  style={{ fontSize: "small" }}
                                  className="countdown d-flex justify-content-center"
                                >
                                  Created at:
                                  {new Date(
                                    data.auctionCreatedAt * 1000
                                  ).toISOString()}
                                </div>
                              </div>
                              <h5 className="mb-0"></h5>
                              <a className="seller d-flex align-items-center my-3">
                                {/* <img  className="avatar-sm rounded-circle" src="" alt="" /> */}
                                <span
                                  style={{ fontSize: "large" }}
                                  className="ml-2 mt-2"
                                >
                                  {data.token.name}
                                </span>
                              </a>
                              <div className="card-bottom d-flex justify-content-between">
                                <span
                                  style={{ width: "50%", fontSize: "small" }}
                                >
                                  Owned by:{data.owner}
                                </span>
                                <span>
                                  <Timer
                                    start={data.auctionCreatedAt * 1000}
                                    duration={data.duration * 60 * 60 * 1000}
                                  />
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="swiper-pagination" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(AuctionsOne);
