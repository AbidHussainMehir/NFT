import React, { useState, useEffect } from "react";
import logo from "../../logo.png";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { setUser } from "../../features/userSlice";
import { db } from "../../firebase";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import "./Header.css";
import Avatar from "@mui/material/Avatar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "none",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

let acc;
const Header = (props) => {
  const [address, setAddress] = useState(null);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  const history = useHistory();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    console.log("working");
  };

  const connectMetaMask = async () => {
    if (typeof window.ethereum !== "undefined") {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = accounts[0];
      alert("You Are Connected Now", account);
      setAddress(account);
      storeAddress(account);
    } else {
      alert(
        "Please Install MetaMask: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'"
      );
    }
  };

  const fetchData = async () => {
    const response = db.collection("userProfile").doc(address);
    response
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUserData(doc.data());
        } else {
          console.log("No such doc");
        }
      })
      .catch((error) => {
        console.log("Error getting doc", error);
      });
  };

  const storeAddress = (address) => {
    if (address) {
      var userDocRef = db.collection("userProfile").doc(address);
      userDocRef.get().then((doc) => {
        if (doc.exists) {
          console.log("Document exists");
        } else {
          history.push("/registration");
        }
      });
    }
  };
  const disconnect = () => {
    console.log("disconnect call");
    sessionStorage.removeItem("meta-address");
    setAddress(null);
  };
  useEffect(() => {
    const metaAddress = sessionStorage.getItem("meta-address");
    if (metaAddress) {
      setAddress(JSON.parse(metaAddress));
      acc = metaAddress;
    }
    // console.log(window.ethereum);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts) {
          console.log(accounts);
          if (acc) {
            acc = null;
          }
          disconnect();
        } else if (acc && acc !== accounts[0]) {
          connectMetaMask();
        }
      });

      // detect Network account change
      // window.ethereum.on("networkChanged", (networkId) => {
      //   console.log("networkChanged", networkId);
      //   if (networkId === "3") setBadge(false);
      //   else setBadge(true);
      // });
    }
  }, []);
  useEffect(() => {
    if (address) {
      dispatch(setUser(address));
      sessionStorage.setItem("meta-address", JSON.stringify(address));
      fetchData();
    }
    props.updateAddress(address);
  }, [address]);

  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <header id="header">
      {/* Navbar */}
      <nav
        data-aos="zoom-out"
        data-aos-delay={800}
        className="navbar navbar-expand"
      >
        <div className="container header">
          {/* Navbar Brand*/}
          <a className="navbar-brand" href="/">
            <img
              className="navbar-brand-sticky"
              src={logo}
              alt="sticky brand-logo"
            />
          </a>
          <div className="ml-auto" />
          {/* Navbar */}
          <ul className='navbar-nav items mx-auto'>
            <li className='nav-item '>
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                className="nav-link"
                href="/"
              >
                Home
              </a>
            </li>
            <li className="nav-item ">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                className='nav-link'
                href='/explore-3'
              // onClick={() => {
              //   history.push("/explore-3");
              // }}
              >
                Explore NFTs
              </a>
              {/* <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/auctions" className="nav-link">
                    Live Auctions
                  </a>
                </li>
                <li className="nav-item">
                  <a href="/allSale" className="nav-link">
                    Live Sale
                  </a>
                </li>
              </ul> */}
            </li>
            {/* <ul className="dropdown-menu"> */}
            {/* <li className="nav-item"><a href="/explore-1" className="nav-link">Explore Style 1</a></li>
                                <li className="nav-item"><a href="/explore-2" className="nav-link">Explore Style 2</a></li> */}
            {/* <li className="nav-item">
                  <a href="/explore-3" className="nav-link">
                    Explore Style 1
                  </a>
                </li> */}
            {/* <li className="nav-item"><a href="/explore-4" className="nav-link">Explore Style 4</a></li> */}

            {/* </ul>

            <li className="nav-item">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                href="/activity"
                // onClick={() => {
                //   history.push("/activity");
                // }}
                className="nav-link"
              >
                Activity
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                href="/auctions"
                // onClick={() => {
                //   history.push("/auctions");
                // }}
                className="nav-link"
              >
                Live Auctions
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a className="nav-link" href="#">
                Community <i className="fas fa-angle-down ml-1" />
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <a href="/help-center" className="nav-link">
                    Help Center
                  </a>
                </li>
              </ul>
            </li> */}
            <li className="nav-item">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                className='nav-link'
                href='/auctions'
              // onClick={() => {
              //   history.push("/authors");
              // }}
              >
                Auctions
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                className='nav-link'
                href='/activity'
              // onClick={() => {
              //   history.push("/authors");
              // }}
              >
                Activity
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                className='nav-link'
                href='/authors'
              // onClick={() => {
              //   history.push("/authors");
              // }}
              >
                Creators
              </a>
            </li>
            <li className="nav-item">
              <a
                style={{
                  fontSize: "small",
                  cursor: "pointer",
                }}
                href="/contact"
                // onClick={() => {
                //   history.push("/contact");
                // }}
                className="nav-link"
              >
                Contact
              </a>
            </li>
            <li className='nav-item mobile ml-3'>
              <a
                style={{
                  height: '50px',
                  padding: '16px 34px',
                  fontSize: 'smaller',
                  background: '1px solid #ED7014',
                  color: 'white'
                }}
                className='btn mt-1 mb-3 ml-lg-auto btn-bordered-white'
                onClick={() => {
                  connectMetaMask()
                }}
              >
                <i className=' mr-md-2' />
                SIGN IN WITH METAMASK
              </a>
            </li>
            <li className='nav-item mobile ml-3'>
              <a
                onClick={() => alert('Sign In with Metamask!')}
                style={{ height: '50px', fontSize: 'smaller' }}
                className='btn mt-1 pb-2 ml-lg-auto btn-bordered-white'
                href='#'
              >
                <i className=' mr-md-2' />
                Create
              </a>
            </li>
            <li onClick={() => { history.push('/user-profile')  }} style={{ cursor: 'pointer' }} className='nav-item mobile mt-2 ml-3 dropdown' >
            <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Link
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
          
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
              <Avatar alt='' src={userData?.Image || '/static/images/avatar/1.jpg'} />
            </li>
          </ul>
          {/* Navbar Icons */}
          <ul className="navbar-nav icons">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#search"
                ref={props.modalRef}
              >
                <i className="fas fa-search" />
              </a>
            </li>
          </ul>
          {/* Navbar Toggler */}
          <ul className="navbar-nav toggle">
            <li className="nav-item">
              <a
                href="#"
                className="nav-link"
                data-toggle="modal"
                data-target="#menu"
              >
                <i className="fas fa-bars toggle-icon m-0" />
              </a>
            </li>
          </ul>
          {/* Navbar Action Button */}
          <ul className='navbar-nav action'>
            {!address && (
              <li className="nav-item ml-3">
                <a
                  style={{
                    height: "50px",
                    padding: "16px 34px",
                    fontSize: "smaller",
                    background: "1px solid #ED7014",
                    color: "white",
                  }}
                  className="btn mt-1 mb-3 ml-lg-auto btn-bordered-white"
                  onClick={() => {
                    connectMetaMask();
                  }}
                >
                  <i className=" mr-md-2" />
                  SIGN IN WITH METAMASK
                </a>
              </li>
            )}
            {!address ? (
              <li className="nav-item ml-3">
                <a
                  onClick={() => alert("Sign In with Metamask!")}
                  style={{ height: "50px", fontSize: "smaller" }}
                  className="btn mt-1 pb-2 ml-lg-auto btn-bordered-white"
                  href="#"
                >
                  <i className=" mr-md-2" />
                  Create
                </a>

                {/* <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                      style={{ color: "black" }}
                    >
                      You are not connected to Metamask!
                    </Typography>
                    <Button
                      style={{
                        background: "#57048A",
                        color: "white",
                        border: "none",
                        margin: "10px",
                      }}
                      onClick={connectMetaMask}
                    >
                      SIGN IN WITH METAMASK
                    </Button>
                    <Button
                      style={{
                        background: "#57048A",
                        color: "white",
                        border: "none",
                      }}
                      onClick={handleClose}
                    >
                      CLOSE
                    </Button>
                  </Box>
                </Modal> */}
              </li>
            ) : (
              <li className="nav-item ml-3">
                <a
                  style={{ height: "50px", fontSize: "smaller" }}
                  className="btn pb-2 ml-lg-auto btn-bordered-white"
                  onClick={() => {
                    history.push("/create");
                  }}
                >
                  <i className=" mr-md-2" />
                  Create
                </a>
              </li>
            )}
            {address ? (
              <li
                // onClick={() => {
                //   history.push("/user-profile");
                // }}
                style={{ cursor: "pointer" }}
                className="nav-item  ml-3 navhere "
              >
                 <a class="nav-link dropdown-toggle" href="#" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                 <Avatar
                  alt=""
                  src={userData?.Image || "/static/images/avatar/1.jpg"}
                />
          </a>
          <ul class="dropdown-menu"  aria-labelledby="navbarScrollingDropdown">
            <li  onClick={() => {
                  history.push("/user-profile");
                }} ><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="/My_Collection">My Collection</a></li>
          
            
          </ul>
                
              </li>
            ) : null}

            {/* <li onClick={handleOpen} className="nav-item ml-3">
              <a
                style={{ height: "50px", fontSize: "smaller" }}
                className="btn pb-2 ml-lg-auto btn-bordered-white"
                href="#"
              >
                <i className=" mr-md-2" />
                Create
              </a>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                    style={{ color: "white" }}
                  >
                    You are not connected to Metamask!
                  </Typography>
                  <Button
                    style={{
                      background: "#57048A",
                      color: "white",
                      border: "none",
                      margin: "10px",
                    }}
                    onClick={connectMetaMask}
                  >
                    SIGN IN WITH METAMASK
                  </Button>
                  <Button
                    style={{
                      background: "#57048A",
                      color: "white",
                      border: "none",
                    }}
                    onClick={handleClose}
                  >
                    CLOSE
                  </Button>
                </Box>
              </Modal>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
