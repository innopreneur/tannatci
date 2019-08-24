import React, { Component } from "react";
import logo from "./logo.svg";
import Web3 from "web3";

import "./App.css";

const web3 = new Web3(Web3.givenProvider);

class App extends Component {

  state = {
    web3Connected: false, // boolean to determine if connection to blockchain is established
    networkName: '' // name of the Ethereum network
  }

  componentDidMount() {
    if (!web3.currentProvider) {
      this.setState({ web3Connected: false });
      return
    } else {
      this.setState({ web3Connected: true });

      // Identify which network MetaMask is connected to:
      this.getNetwork()

      // Make sure this gets updated when the user switches networks with MetaMask
      web3.currentProvider.isMetaMask && web3.currentProvider.publicConfigStore.on('update', () => {
        this.getNetwork()
      })
    }
    console.log(web3)
  }

  getNetwork = () => {
    let networkName = '';
    web3.eth.net.getId()
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
        })
      })
      .catch(err => {
        console.log(err);
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Automated DEX trading</p>
          <p>{this.state.networkName}</p>
        </header>
      </div>
    );
  }
}

export default App;
