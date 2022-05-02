import React, { Component, createRef } from "react";

import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Auctions from "../components/Auctions/AuctionsOne";
import TopSeller from "../components/TopSeller/TopSellerOne";
import Collections from "../components/Collections/Collections";
import Explore from "../components/Explore/ExploreOne";
import Work from "../components/Work/Work";
import Footer from "../components/Footer/Footer";
import ModalSearch from "../components/Modal/ModalSearch";
import ModalMenu from "../components/Modal/ModalMenu";
import Scrollup from "../components/Scrollup/Scrollup";

class ThemeOne extends Component {
  constructor(props) {
    super(props);
    this.modalRef = createRef();
  }
  closeModalSearch = () => {
    this.modalRef.current.click();
  };
  render() {
    return (
      <div className="main">
        {/* <Header modalRef={this.modalRef} /> */}
        <Hero />
        <Auctions />
        <Collections />
        <Work />
        <Footer />
        <ModalSearch closeModalSearch={this.closeModalSearch} />
        <ModalMenu />
        <Scrollup />
      </div>
    );
  }
}

export default ThemeOne;
