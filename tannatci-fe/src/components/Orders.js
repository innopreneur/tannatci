import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import "./Orders.css";
import CButton from './CButton';
import axios from "axios";


export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: props.trs.slice(),
      selectedType: this.props.type,
      ordersToShow: []
    };
    console.log(props.trs);
  }

  async componentDidMount() {
    let ordersToShow = await this.filterOrders(
      this.state.orders,
      this.state.selectedType
    );
    this.setState({ ordersToShow });
  }

  async componentWillReceiveProps(nextProps) {
    let ordersToShow = await this.filterOrders(
      this.state.orders,
      nextProps.type
    );
    this.setState({ selectedType: nextProps.type, ordersToShow });
  }

  formatOrder(order) {
    let { value } = order;
    if (Number(value) > 0) {
      order["condition"] = "INCREASE";
    } else {
      order["condition"] = "DECREASE";
    }
    return order;
  }

  async filterOrders(orders, condition) {
    return await Promise.all(orders.filter(order => order.status == condition));
  }

  cancelTrade = (accountAddress, tradeId) => {
    axios.put(`api/${accountAddress}/${tradeId}`)
  }

  render() {
    console.log(this.state.selectedType)
    return (
      <Container className="order-container">
        <Row>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Action</th>
                <th>Amount</th>
                <th>From</th>
                <th>To</th>
                <th>Condition</th>
                <th>Percentage</th>
                <th>TimeFrame</th>
                {this.state.selectedType === "open" && <th>Cancel</th>}
              </tr>
            </thead>
            <tbody>
              {this.state.ordersToShow.map((order, i) => {
                let _order = this.formatOrder(order);
                return (
                  <tr key={_order._id}>
                    <td>{_order.type}</td>
                    <td>{_order.amount}</td>
                    <td>ETH</td>
                    <td>DAI</td>
                    <td>{_order.condition}</td>
                    <td>{Math.abs(_order.value)}</td>
                    <td>24h</td>
                    {this.state.selectedType === "open" && <td><CButton variant="danger" onClick={() => this.cancelTrade(_order.account, _order._id)}>Cancel</CButton></td>}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Row>
      </Container>
    );
  }
}
