import React, { Component } from "react";
import Web3 from "web3";
import Button from "react-bootstrap/Button";
import NewOrder from "./components/NewOrder";
import "./App.css";
import Balance from "./containers/balance";
import Logo from "./components/Logo";
import Account from "./components/Account";
import { Container, Row, Col } from "react-bootstrap";

const web3 = new Web3(Web3.givenProvider);

class App extends Component {
  state = {
    web3Connected: false, // boolean to determine if connection to blockchain is established
    networkName: "",
    currentAccount: "" // name of the Ethereum network
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
        this.setState({ currentAccount: _accounts[0] });
      }
    }
    console.log(web3);
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

  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col lg={2}>
              <Logo />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Account currentAccount={this.state.currentAccount} />
            </Col>
          </Row>
          <Row className="newOrderContainer">
            <NewOrder />
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
