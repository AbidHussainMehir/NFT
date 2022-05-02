import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router";



// const BASE_URL =
// 'https://my-json-server.typicode.com/themeland/netstorm-json-1/activity'

class Activity extends Component {
  state = {
    data: []
    // filterData: [],
  }

  // getAuctionById = async (id) => {
  //     const response =
  // }

  // after auctions word
  // (where: {token:"${
  //                 '0x' + id
  //               }"},
  //               orderBy: timestamp, orderDirection: desc)

  async componentDidMount () {
    const res = await axios.post(
      'https://api.thegraph.com/subgraphs/name/vjbhandari61/saimart',
      {
        query: `{
  nftentities (orderBy: id, orderDirection: desc) {
    name
    id
    owner
    description
    uri
    sale {
      id
      price
      owner
      buyer
      saleCreatedAt
      saleEndedAt
    }
    auction {
      id
      token {
        id
        name
      }
      reservePrice
      owner
      lastBid {
        id
        bid
        bidder
        timestamp
      }
    }
    creator {
      id
    }
  }
}

              `
      }
    )

    try {
      console.log(res.data)
      this.setState({
        data: res.data.data.nftentities
      })
      console.log(this.state.data)
    } catch (err) {
      console.log(err)
    }
  }

  // axios
  //   .get(`${BASE_URL}`)
  //   .then((res) => {
  //     this.setState({
  //       data: res.data,
  //       tabData_1: res.data.tabData_1,
  //       tabData_2: res.data.tabData_2,
  //       tabData_3: res.data.tabData_3,
  //       filterData: res.data.filterData,
  //     })
  //     // console.log(this.state.data)
  //   })
  //   .catch((err) => console.log(err))

  // let urlElements =
  //   window.location.href.split('/')

  render () {
    return (
      <section className='activity-area load-more'>
        <div className='container'>
          <div className='row'>
            <div className='col-12'>
              {/* Intro */}
              <div className='intro mb-4'>
                <div className='intro-content'>
                  <span>CREATIVE</span>
                  <h3 className='mt-3 mb-0'>Activity</h3>
                </div>
              </div>
            </div>
          </div>
          <div className='row items'>
            <div className='col-12 col-md-6 col-lg-8'>
              {/* Netstorm Tab */}
              <ul className='netstorm-tab nav nav-tabs' id='nav-tab'>
                <li>
                  <a
                    className='active'
                    id='nav-home-tab'
                    data-toggle='pill'
                    href='#nav-home'
                  >
                    <h5 className='m-0'>All</h5>
                  </a>
                </li>
                <li>
                  <a
                    id='nav-profile-tab'
                    data-toggle='pill'
                    href='#nav-profile'
                  >
                    <h5 className='m-0'>Purchase</h5>
                  </a>
                </li>
                <li>
                  <a
                    id='nav-contact-tab'
                    data-toggle='pill'
                    href='#nav-contact'
                  >
                    <h5 className='m-0'>Recent</h5>
                  </a>
                </li>
              </ul>
              {/* Tab Content */}
              <div className='tab-content' id='nav-tabContent'>
                <div className='tab-pane fade show active' id='nav-home'>
                  <ul className='list-unstyled'>
                    {/* Single Tab List */}
                    {this.state.data.map((item, idx) => {
                      return (
                        <li
                          key={`ato_${idx}`}
                          className='single-tab-list d-flex align-items-center'
                        >
                          <a>
                            {/* <img
                                className='avatar-lg'
                                src={item.name}
                                alt=''
                              /> */}
                          </a>
                          {/* Activity Content */}
                          <div style={{cursor:"pointer"}} className='activity-content ml-4'>
                            <a onClick={()=>
                            this.props.history.push(
                              `/details/${item.id}`
                            )}>
                              <h5 className='mt-0 mb-2'>{item.name}</h5>
                            </a>
                            <p className='m-0'>
                              Bid listed for{' '}
                              <strong>{item.auction?.lastBid?.bid}</strong>{' '}
                              {item.auction?.lastBid?.timestamp} <br />
                              by <a onClick={()=>
                              this.props.history.push(
                                `/creator/${item.auction?.owner}`
                              )}>{item.auction?.owner}</a>
                            </p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className='tab-pane fade' id='nav-profile'>
                  <ul className='list-unstyled'>
                    {/* Single Tab List */}
                    {this.state.data.map((item, idx) => {
                      return (
                        <li
                          key={`ato_${idx}`}
                          className='single-tab-list d-flex align-items-center'
                        >
                          <a >
                            {/* <img
                                className='avatar-lg'
                                src={item.img}
                                alt=''
                              /> */}
                          </a>
                          {/* Activity Content */}
                          <div style={{cursor:"pointer"}}  className='activity-content ml-4'>
                            <a onClick={()=>
                            this.props.history.push(
                              `/details/${item.id}`
                            )}>
                              <h5 className='mt-0 mb-2'>{item.name}</h5>
                            </a>
                            <p className='m-0'>
                              Purchased at <strong>{item.sale?.price}</strong>{' '}
                              {item.sale?.saleCreatedAt} <br />
                              by <a onClick={()=>
                              this.props.history.push(
                                `/creator/${item.sale?.owner}`
                              )}>{item.sale?.owner}</a>
                            </p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
                <div className='tab-pane fade' id='nav-contact'>
                  <ul className='list-unstyled'>
                    {/* Single Tab List */}
                    {this.state.data.map((item, idx) => {
                      return (
                        <li
                          key={`ato_${idx}`}
                          className='single-tab-list d-flex align-items-center'
                        >
                          <a >
                            {/* <img
                                className='avatar-lg'
                                src={item.img}
                                alt=''
                              /> */}
                          </a>
                          {/* Activity Content */}
                          <div style={{cursor:"pointer"}}  className='activity-content ml-4'>
                            <a onClick={()=>
                            this.props.history.push(
                              `/details/${item.id}`
                            )}>
                              <h5 className='mt-0 mb-2'>{item.name}</h5>
                            </a>
                            <p className='m-0'>
                              Purchased at <strong>{item.sale?.price}</strong>{' '}
                              {item.sale?.saleEndedAt} <br />
                              by <a onClick={()=>
                              this.props.history.push(
                                `/creator/${item.sale?.buyer}`
                              )}>{item.sale?.buyer}</a>
                            </p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
            {/*  <div className='col-12 col-md-6 col-lg-4'>
              
              <div className='activity-content mt-5 mt-lg-0'>
              
                <div className='single-widget'>
                 
                  <div className='widget-content search-widget'>
                    <form action='#'>
                      <input
                        type='text'
                        placeholder='Enter your keywords'
                      />
                    </form>
                  </div>
                </div>
                
                <div className='single-widget'>
                  
                  <div className='widget filter-widget'>
                    <h4 className='title'>
                      {
                        this.state.data
                          .widgetTitle
                      }
                    </h4>
                
                    <div className='widget-content'>
                    
                      <div className='widget-content filter-widget-items mt-3'>
                        {this.state.filterData.map(
                          (item, idx) => {
                            return {
                              
                            }
                          }
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
              
            </div>
            */}
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Activity);
