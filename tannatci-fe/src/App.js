import React, { Component } from "react";
import Web3 from "web3";
import NewOrder from "./components/NewOrder";
import NewAccount from "./components/NewAccount";
import Orders from "./components/Orders";
import Navbar from "./components/Navbar";
import "./App.css";
import Logo from "./components/Logo";
import Account from "./components/Account";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import abi from "./abi/TradeAccount.json";
import factoryAbi from "./abi/TradeAccountsFactory.json";


const web3 = new Web3(Web3.givenProvider);

class App extends Component {
  state = {
    web3Connected: false, // boolean to determine if connection to blockchain is established
    networkName: "",
    currentAccount: "",
    balance: "",
    account: null
  };

  async componentDidMount() {
    if (!web3.currentProvider) {
      this.setState({ web3Connected: false }); //Unlock your metamask
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

      let _accounts = await web3.eth.getAccounts();
      console.log(_accounts[0]);
      if (_accounts.length > 0) {
        let balance = await this.getBalance(_accounts[0]);
        this.setState({ currentAccount: _accounts[0], balance });
      }

      await this.getFactoryContract()
      await this.getAccount()
      
    }
    
  }

  getFactoryContract = async () => {
    const factory = await new web3.eth.Contract(
      factoryAbi,
      "0x4f9a9Cf12EF461f6aE8bbFFF1c93C449A110991d"
    );
    this.setState({factory})
  }
  getAccount = async () => {
    const tradeAccount = await this.state.factory.methods.tradeAccounts(this.state.currentAccount).call()
    if (tradeAccount) {
      this.setState({account: tradeAccount});
    }
    console.log('tradeAccount of user: ', tradeAccount);
  }

  createAccount = async () => {
    this.state.factory.methods.createAccount().send({
      from: this.state.currentAccount
    });
  }

  async getBalance(account){
    let _balance = await web3.eth.getBalance(account);
    let balance = web3.utils.fromWei(_balance, 'ether');
    console.log(balance);
    return balance;
  }

  getNetwork(){
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
    // changePercent: "5.0"
    // changePeriod: "24 hours"
    // fromAmount: "0.0"
    // fromToken: "ETH"
    // toToken: "ETH"
    // tradeType: "Buy"
    const tradeParams = { type: "buy", amount: "1", value: "-2" };
    const hash = web3.utils.sha3(JSON.stringify(tradeParams));

    let signature = await web3.eth.personal.sign(
      JSON.stringify(tradeParams),
      this.state.currentAccount
    );
    // send transaction to store trade

    const contract = await new web3.eth.Contract(
      abi,
      this.state.account
    );

    const nonce = await web3.eth.getTransactionCount(this.state.currentAccount);

    await contract.methods.storeTrade(hash, nonce).send({
      from: this.state.currentAccount
    });
    const tradeData = {
      tradeParams: tradeParams,
      signature: signature,
      userAddress: this.state.currentAccount,
      nonce: nonce,
      hash: hash
    };
    axios.post(`api/trade/${this.state.account}`, tradeData).then(res => {
      console.log(res);
    });
  };

  _renderExisitingUser(){
    return (
      <Container>
        <Row className="newOrderContainer">
            <NewOrder onSubmit={this.submitTrade.bind(this)}/>
            <p>Your Account: {this.state.account}</p>
        </Row>
        <Row>
          <Navbar ethBalance={this.state.balance}/>
        </Row>
      </Container>
    )
  }

  _renderNewAccount(){
    return (
      <Row className="newOrderContainer">
          <NewAccount 
            onCreate={this.createAccount}
            />
      </Row>
    )
  }

  render() {
    return (
      <div className="App">
        <Container>
          <Row className="header">
            <Col lg={2}>
              <Logo />
            </Col>
            <Col lg={{offset: 6, span: 4}}>
              <Account 
              currentAccount={this.state.currentAccount}
              currentNetwork={this.state.networkName}
              balance={this.state.balance} />
            </Col>
          </Row>
          {
            this.state.account && this.state.account !== "0x0000000000000000000000000000000000000000" ? 
            this._renderExisitingUser() : 
            this._renderNewAccount()
            }
        </Container>
      </div>
    );
  }
}

export default App;
