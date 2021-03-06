import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import Avatar from "@mui/material/Avatar";
import { useHistory } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Box from "@mui/material/Box";
import { db } from "../../firebase";
import axios from "axios";
import { withRouter } from "react-router";
import { useSelector } from "react-redux";
import { selectUserAddress } from "../../features/userSlice";

const NftView = ({ src }) => {
  const [img, setImg] = useState("");
  const loadMedia = async () => {
    try {
      axios.get(`https://gateway.pinata.cloud/ipfs/${src}`).then((resp) => {
        // console.log(resp);
        setImg(`https://ipfs.io/ipfs/${resp.data.url}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadMedia();
  }, []);

  return (
    <>
      {img ? (
        <img
          style={{
            height: "350px",
            width: "350px",
            margin: "23px",
            cursor: "pointer",
          }}
          className="card-img-top"
          src={img}
          alt=""
        />
      ) : null}
    </>
  );
};

const UserProfile = () => {
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [userData, setUserData] = useState(null);
  const [nftData, setNftData] = useState(null);
  const [source, setSource] = useState([]);

  const useraddress = useSelector(selectUserAddress);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const fetchImageObject = async () => {
    try {
      nftData?.forEach((nft) =>
        axios
          .get(`https://gateway.pinata.cloud/ipfs/${nft.uri}`)
          .then((resp) => {
            setSource([...source, `https://ipfs.io/ipfs/${resp.data.url}`]);
          })
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getUserNFTs = async () => {
    const response = await axios.post(
      "https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart",
      {
        query: `{
          creators(where: {id: "${useraddress}"}) {
            id
            nfts {
              id
              name
              description
              uri
              owner
              auction{
                id
                token{
                  id
                  uri
                }
              }
              sale{
                id
                token{
                  id
                  uri
                }
              }
            }
          }
        }        
        `,
      }
    );
    // console.log(response.data.data.creators);
    setNftData(response.data.data.creators?.[0]?.nfts);
    // console.log(nftData);
    return response.data.data.creators;
  };

  useEffect(() => {
    // console.log(nftData);
    // fetchData();
    fetchImageObject();
  }, [nftData]);
  const fetchData = async () => {
    // console.log({ useraddress });
    const response = db.collection("userProfile").doc(useraddress);
    response
      .get()
      .then((doc) => {
        if (doc.exists) {
          let data = doc.data();
          setUserData(doc.data());
        } else {
          console.log("No such doc");
        }
      })
      .catch((error) => {
        console.log("Error getting doc", error);
      });
  };
  if (useraddress && !userData) {
    fetchData();
    // getUserNFTs();
  }
  if (useraddress && !nftData) {
    getUserNFTs();
  }
  useEffect(() => {}, []);
  return (
    <div className="userProfile">
      <div className="userProfile__container1">
        <Avatar
          alt=""
          src={userData?.Image || "/static/images/avatar/1.jpg"}
          sx={{ width: 280, height: 280 }}
        />
        <div className="container1__part2">
          <div className="content__1">
            <h3>{userData?.Name || "User Name"}</h3>
            <p>{userData?.Bio || "Bio"}</p>
          </div>

          <div className="content__2">
            <p>{userData?.MetamaskAddress || "Address"}</p>
            {useraddress && (
              <button
                onClick={() => {
                  history.push("/edit-profile");
                }}
                className="edit__button"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <Divider color="white" /> */}
      <div className="userProfile_container2">
        {/* <ul className="mt-5 p-2 netstorm-tab nav nav-tabs" id="nav-tab">
          <li className="list-item">
            <a
              className="active"
              id="nav-home-tab"
              data-toggle="pill"
              href="#nav-home"
            >
              <h5 className="m-0">Listed</h5>
            </a>
          </li>
          <li className="lis">
            <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
              <h5 className="m-0">Created</h5>
            </a>
          </li>
          <li className="list-item">
            <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
              <h5 className="m-0">Owned</h5>
            </a>
          </li>
        </ul> */}
        <ul
          style={{ display: "flex", textAlign: "center" }}
          className="mt-5 p-2 netstorm-tab nav nav-tabs"
          id="nav-tab"
        >
          <li>
            <a
              className="active"
              id="nav-home-tab"
              data-toggle="pill"
              href="#nav-home"
            >
              <h5 className="m-0 ml-3 mr-5">Listed</h5>
            </a>
          </li>
          <li>
            <a id="nav-profile-tab" data-toggle="pill" href="#nav-profile">
              <h5 className="m-0 mr-5">Created</h5>
            </a>
          </li>
          <li>
            <a id="nav-contact-tab" data-toggle="pill" href="#nav-contact">
              <h5 className="m-0 mr-5">Owned</h5>
            </a>
          </li>
        </ul>
        <div className="tab-content" id="nav-tabContent">
          <div className="tab-pane fade show active" id="nav-home">
            <ul className="p-4 list-unstyled">
              {/* Single Tab List */}
              {nftData ? (
                nftData.map((item, idx) => {
                  return (
                    <div
                      onClick={() => {
                        history.push(`/details/${item.id}`);
                      }}
                      key={`tdo_${idx}`}
                      style={{ display: "contents" }}
                    >
                      {item.auction || item.sale ? (
                        <NftView src={item.uri} />
                      ) : null}
                    </div>
                  );
                })
              ) : (
                <span>No Listings Yet!</span>
              )}
            </ul>
          </div>
          <div className="tab-pane fade" id="nav-profile">
            <div className="owner-meta d-flex align-items-center mt-3">
              <ul>
                {/* Single Tab List */}
                {nftData ? (
                  nftData.map((item, idx) => {
                    return (
                      <div
                        onClick={() => {
                          history.push(`/details/${item.id}`);
                        }}
                        style={{ display: "contents" }}
                        key={`tdo_${idx}`}
                      >
                        <NftView src={item.uri} />
                        {/* <span className="m-0">{item.uri}</span> */}
                      </div>
                    );
                  })
                ) : (
                  <span>No NFTs Created By {useraddress}</span>
                )}
              </ul>
            </div>
          </div>
          <div className="tab-pane fade" id="nav-contact">
            <div className="owner-meta d-flex align-items-center mt-3">
              <ul className="p-4 list-unstyled">
                {/* Single Tab List */}
                {nftData ? (
                  nftData.map((item, idx) => {
                    return (
                      <div
                        onClick={() => {
                          history.push(`/details/${item.id}`);
                        }}
                        key={`tdo_${idx}`}
                        style={{ display: "contents" }}
                      >
                        {item?.owner === useraddress ? (
                          <NftView src={item.uri} />
                        ) : (
                          <span></span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <span>No NFTs Yet Owned!</span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
