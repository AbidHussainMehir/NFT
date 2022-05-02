import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap-buttons'
import Web3 from 'web3'
import {
  CONTRACT_ABI,
  CONTRACT_ADDRESS,
  ESCROW_CONTRACT_ABI,
  ESCROW_CONTRACT_ADDRESS
} from '../../config'

const handleCreateAuction = async () => {
  let id = window.location.pathname
  id = id.split('/')[2]
  id = Web3.utils.hexToNumber(id)
  let address
  if (typeof window.ethereum != 'undefined') {
    const web3 = new Web3(window.ethereum)
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    address = accounts[0]
    console.log('address', address)
    let price = document.getElementById('price').value
    price = web3.utils.toWei(price, 'ether')
    const duration = document.getElementById('duration').value

    const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)

    await nftContract.methods
      .approve(`${ESCROW_CONTRACT_ADDRESS}`, id)
      .send({
        from: address
        // to: CONTRACT_ADDRESS,
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaction Confirmed')
      })
      .on('error', async function () {
        console.log('Error Encountered')
      })

    // const nftContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS)
    const escrowContract = new web3.eth.Contract(
      ESCROW_CONTRACT_ABI,
      ESCROW_CONTRACT_ADDRESS
    )
    await escrowContract.methods
      .createAuction(id, duration, price)
      .send({
        from: address
        // gas: 23000
      })
      .on('transactionHash', function () {
        console.log('Transaction Processing............')
      })
      .on('receipt', function () {
        console.log('Reciept')
      })
      .on('confirmation', function () {
        console.log('Transaction Confirmed')
      })
      .on('error', async function () {
        console.log('Error Encountered')
      })
  } else {
    alert(
      "Please Install MetaMask: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'"
    )
  }
}

export default class AuctionModal extends Component {
  state = { tokenId: '', price: '', duration: '' }

  handleChange = e => this.setState({ tokenId: e.target.value })
  handleChange2 = e => this.setState({ price: e.target.value })
  handleChange3 = e => this.setState({ duration: e.target.value })

  render () {
    return (
      <Modal
        centered
        size='lg'
        show={this.props.isOpen}
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title> Auction</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '20px' }}>
          <Form.Group style={{ padding: '10px' }}>
            <Form.Label style={{ margin: '10px' }}>Reserve Price:</Form.Label>
            <Form.Control
              type='text'
              onChange={this.handleChange2}
              value={this.state.price}
              id='price'
              placeholder='Enter reserve price in Ethers'
            />
          </Form.Group>
          <Form.Group style={{ padding: '10px' }}>
            <Form.Label style={{ margin: '10px' }}>Duration:</Form.Label>
            <Form.Control
              type='text'
              onChange={this.handleChange3}
              value={this.state.duration}
              id='duration'
              placeholder='Enter duration in Hours'
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button
            variant="primary"
            type="submit"
            onClick={() => this.props.closeModal()}
          >
            Create Auction
          </Button> */}
          <button
            type='submit'
            style={{ color: 'black', background: 'white', border: 'none' }}
            onClick={handleCreateAuction}
          >
            Create Auction
          </button>
        </Modal.Footer>
      </Modal>
    )
  }
}
