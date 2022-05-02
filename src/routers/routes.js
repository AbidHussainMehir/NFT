import React, { createRef } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import ExploreOne from "../themes/explore-one";
import ExploreTwo from "../themes/explore-two";
import ExploreThree from "../themes/explore-three";
import ExploreFour from "../themes/explore-four";
import Auctions from "../themes/auctions";
import ItemDetails from "../themes/item-details";
import Activity from "../themes/activity";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
import HelpCenter from "../themes/help-center";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import Create from "../themes/create";
import Login from "../themes/login";
import Signup from "../themes/signup";
import Contact from "../themes/contact";
import Sale from "../themes/sale";
import Header from "../components/Header/Header";
import ModalSearch from "../components/Modal/ModalSearch";
import Userprofile from "../themes/userprofile";
import Editprofile from "../themes/edit-profile";
import Register from "../components/Register/Register";
import Registration from "../themes/register";
import AllSale from "../components/All SaLe/AllSale";
import allSale from "../themes/allSale";
import My_Collection from "../components/My_Collections/My_Collection";
import Sellmain from "../components/Sell/Sellmain";
import Purchase from "../components/Explore/Purchase";
import Auctionsbiding from "../components/Authors/Auctionsbiding";



class MyRouts extends React.Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
  }

  state = { address: null };

  closeModalSearch = () => {
    this.modalRef.current.click();
  };

  updateAddress = (addr) => {
    this.setState({
      address: addr,
    });
  };

  render() {
    return (
      <div>
        <Router>
          <Header modalRef={this.modalRef} updateAddress={this.updateAddress} />
          <ModalSearch closeModalSearch={this.closeModalSearch} />

          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/details/:id" component={(props) => ( <ItemDetails {...props} address={this.state.address}  hello={"hello"}
                />
              )}
            />
             <Route exact path="/sellmain/:id" component={(props) => ( <Sellmain {...props} address={this.state.address}  hello={"hello"}
                />
              )}
            />
            <Route exact path='/Auctionsbide/:id' component={Auctionsbiding} />

            <Route exact path='/purchase' component={Purchase} />
            <Route exact path="/explore-1" component={ExploreOne} />
            <Route exact path="/explore-2" component={ExploreTwo} />
            <Route exact path="/explore-3" component={ExploreThree} />
            <Route exact path="/explore-4/:id" component={ExploreFour} />
            <Route exact path="/auctions" component={Auctions} />
            <Route exact path="/user-profile" component={Userprofile} />
            <Route exact path="/edit-profile" component={Editprofile} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/allSaLe" component={allSale} />

            {/* <Route exact path="/item-details" component={ItemDetails} /> */}
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog-single" component={BlogSingle} />
            <Route exact path="/help-center" component={HelpCenter} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/author" component={Author} />
            <Route exact path="/creator/:id" component={Author} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/create" component={Create} />
            <Route exact path="/My_Collection" component={My_Collection} />
            {/* <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} /> */}
            <Route exact path="/contact" component={Contact} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;
