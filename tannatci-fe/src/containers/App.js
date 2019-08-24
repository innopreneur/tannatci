import React, { Component } from "react";
import logo from "./logo.svg";
import Web3 from "web3";
import Button from "react-bootstrap/Button";
import axios from 'axios';

import "./App.css";

const web3 = new Web3(Web3.givenProvider);

class App extends Component {
  state = {
    web3Connected: false, // boolean to determine if connection to blockchain is established
    networkName: "", // name of the Ethereum network,
    currentAccount: ""
  };

  async componentDidMount() {
    if (!web3.currentProvider) {
      this.setState({ web3Connected: false });
      return;
    } else {
      this.setState({ web3Connected: true });

      // Identify which network MetaMask is connected to:
      this.getNetwork();

      // Make sure this gets updated when the user switches networks with MetaMask
      web3.currentProvider.isMetaMask &&
        web3.currentProvider.publicConfigStore.on("update", () => {
          this.getNetwork();
        });
    }
    console.log(web3);
    //get user account 
    let _accounts = await web3.eth.getAccounts();
    if(_accounts.length > 0) {
      this.setState({
        currentAccount: _accounts[0]
      })
    }
  }

  getNetwork = () => {
    let networkName = "";
    web3.eth.net
      .getId()
      .then(netId => {
        switch (netId) {
          case 1:
            networkName = "Ethereum Mainnet";
            break;
          case 2:
            networkName = "Morden Testnet";
            break;
          case 3:
            networkName = "Ropsten Testnet";
            break;
          case 4:
            networkName = "Rinkeby Testnet";
            break;
          case 42:
            networkName = "Kovan Testnet";
            break;
          default:
            networkName = "Unknown";
        }
        this.setState({
          networkName
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  submitTrade = async () => {
    const tradeParams = {type: "buy", amount: "1", value: "-5"};
    let signature = await web3.eth.personal.sign(JSON.stringify(tradeParams), this.state.currentAccount);
    const tradeData = {tradeParams: tradeParams, signature: signature, userAddress: this.state.currentAccount }
    axios.post(`api/trade/123`, tradeData )
    .then(res => {
      console.log(res)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
            crossOrigin="anonymous"
          />
          <img src={logo} className="App-logo" alt="logo" />
          <p>Automated DEX trading</p>
          <p>{this.state.networkName}</p>
          <Button onClick={this.submitTrade}>Submit trade</Button>
        </header>
      </div>
    );
  }
}

export default App;
