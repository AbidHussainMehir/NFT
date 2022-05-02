import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router";
import SaleModal from "./SaleModal.js";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json/collections";

const NftView = ({ src }) => {
  const [img, setImg] = useState();
  const loadMedia = (src) => {
    setImg(true);
    var img = new Image();
    img.onerror = () => {
      console.log(src);
      setImg(false);
    };
    img.src = src;
  };
  useEffect(() => {
    loadMedia(src);
    console.log(img);
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

class Collections extends Component {
  _isMounted = 1;

  state = {
    data: {},
    collectionData: [],
    liveSale: [],
    ImgUri: [],
    nftImage: "",
    source: [],
    isOpen: false,
  };
  openModal = () => this.setState({ isOpen: true });
  closeModal = () => {
    console.log("ok");
    this.setState({ isOpen: false }, () => {
      console.log(this.state.isOpen);
    });
  };
  handleSubmit = (tokenId, price) => {
    console.log(tokenId);
    console.log(price);
  };

  fetchImageObject = async () => {
    try {
      if (this._isMounted === 1) {
        this.state.liveSale?.forEach((nft) =>
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

  getliveSale = async () => {
    const query = `
    {
      sales (where:{status:OPEN}){
        id
        token {
          id
          uri
        }
        
        price
        owner
        buyer
        status
        saleCreatedAt
        saleEndedAt
        txnHash
      }
    }`;
    try {
      const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(
          {
            isLoaded: true,
            liveSale: res.data.data.sales,
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
    axios
      .get(`${BASE_URL}`)
      .then((res) => {
        this.setState({
          data: res.data,
          collectionData: res.data.collectionData,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
    this._isMounted = 1;
    this.fetchImageObject();

    this.getliveSale();
  }
  componentWillUnmount() {
    this._isMounted = 0;
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    var { source } = this.state;

    return (
      <section
        className="popular-collections-area"
        style={{ marginTop: "15px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              {/* Intro */}
              <div className="intro d-flex justify-content-between align-items-end m-0">
                <div className="intro-content">
                  <a>
                    <span>On going sale</span>
                  </a>
                  <h3 className="mt-3 mb-0">Live Sale</h3>
                </div>
                <div className="intro-btn">
                  <a href="/allSale" className="btn content-btn text-left">
                    View All
                  </a>
                </div>
              </div>
            </div>
            <div className="row items">
              {this.state.liveSale &&
                !!this.state.liveSale.length &&
                this.state.liveSale.map((item, idx) => {
                  return (
                    <div
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        this.props.history.push(
                          `/details/${item.token.id}`,
                          this.state.data
                        )
                      }
                      key={`cd_${idx}`}
                      className="col-10 mr-5 col-sm-8 col-lg-3 item"
                    >
                      <div
                        style={{
                          height: "fit-content",
                          width: "300px",
                          margin: "40px",
                        }}
                        className="card ml-5 no-hover text-center"
                      >
                        <div style={{ height: "300px" }} className="image-over">
                          {/* <NftView src={this.state.source[idx]} /> */}
                          <div
                            style={{
                              backgroundImage: `url(${
                                this.state.source[item.id]
                              })`,
                              height: "220px",
                              width: "100%",
                              minWidth: "220px",
                              backgroundRepeat: "no-repeat",
                              backgroundPosition: "center",
                              backgroundSize: "cover",
                            }}
                          ></div>
                        </div>
                        {/* Card Caption */}
                        <div
                          className="card-caption col-12 p-0"
                          style={{ minWidth: "200px" }}
                        >
                          {/* Card Body */}
                          <div className="card-body mt-4">
                            <span>Status: {item.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Collections);
