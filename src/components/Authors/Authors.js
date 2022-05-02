import React, { Component } from "react";
import axios from "axios";
import { gql } from "@apollo/client";
import { withRouter } from "react-router";

const BASE_URL =
  "https://my-json-server.typicode.com/themeland/netstorm-json-1/authors";

class Authors extends Component {
  _isMounted = 1;

  state = {
    data: [],
    authorData: [],
    creatorData: [],
    error: null,
  };
  loadMedia = (src) => {
    var img = new Image();
    img.onerror = () => {
      this.setState({ ...this.state, vid: src });
    };
    img.onload = () => {
      this.setState({ ...this.state, img: src });
    };
    img.src = src;
  };
  fetchImageObject = async (uri) => {
    try {
      axios
        .get(`https://gateway.pinata.cloud/ipfs/${uri}`)
        .then((resp) =>
          this.loadMedia(
            `https://ipfs.io/ipfs/${resp.data.image?.split("ipfs://")[1]}`
          )
        );
    } catch (error) {
      console.log(error);
    }
  };
  getAllCreator = gql`
    {
      creators {
        id
        nfts {
          id
        }
      }
    }
  `;
  getAllCreator = async (query) => {
    try {
      const response = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query,
        }
      );
      if (this._isMounted === 1) {
        this.setState(() => ({
          creatorData: response.data.data.creators,
        }));
      }
    } catch (error) {
      this.setState(() => ({ error }));
      console.log(error);
    }
  };

  getNftOfCreator = async (id) => {
    try {
      const res = await axios.post(
        "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
        {
          query: `{
                nftentities(where: {creator: "${id}"}) {
                  name
                  description
                  id
                  uri
                  owner
                  creator {
                    id
                  }
                }
              }`,
        }
      );

      this.setState(() => ({
        isLoaded: true,
        data: res.data.data.nftentities,
      }));
      this.fetchImageObject(res.data.data.nftentity.uri);
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
          authorData: res.data.authorData,
        });
        // console.log(this.state.data)
      })
      .catch((err) => console.log(err));
    this._isMounted = 1;
    const query = `
    {
        creators {
          id
          nfts {
            id
          }
        }
      }
    `;
    this.getAllCreator(query);

    const path = window.location.pathname;
    const id = path.split("/")[2];
    this.getNftOfCreator(id);
  }
  componentWillUnmount() {
    this._isMounted = 0;
  }
  render() {
    var { creatorData } = this.state;
    return (
      <section className="popular-collections-area">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-7">
              {/* Intro */}
              <div className="intro text-center">
                <span>{this.state.data.preHeading}</span>
                <h3 className="mt-3 mb-0">Our Creators</h3>
              </div>
            </div>
          </div>
          <div className="row items">
            {creatorData &&
              !!creatorData.length &&
              creatorData.map((data, idx) => {
                return (
                  <div
                    key={`ad_${idx}`}
                    className="col-12 col-sm-6 col-lg-3 item"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      this.props.history.push(`/creator/${data.id}`)
                    }
                  >
                    <div className="card no-hover text-center">
                      <div className="image-over">
                        {/* Seller */}
                        <a className="seller">
                          <div className="seller-thumb avatar-lg">
                            <img
                              className="rounded-circle"
                              alt=""
                              src="/img/auction_2.jpg"
                            />
                          </div>
                        </a>
                      </div>
                      {/* Card Caption */}
                      <div className="card-caption col-12 p-0">
                        {/* Card Body */}
                        <div className="card-body mt-4">
                          <h5>{data.id}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Authors);
