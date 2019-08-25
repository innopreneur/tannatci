import React from "react";
import "./Account.css";
import { OverlayTrigger } from 'react-bootstrap';

export default class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

   renderTooltip(props){
    return (
      <div
        {...props}
        className="overlay"
      >
        <p>{this.props.currentNetwork}</p>
        <p>{this.props.balance} ETH</p>
        
      </div>
    );
   }  

  render() {
    return (
      <div className="account-container">
         <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={this.renderTooltip.bind(this)}
          >
          <p className="address-label">
            {this.props.currentAccount}
          </p>
        </OverlayTrigger>
      </div>
    );
  }
}
