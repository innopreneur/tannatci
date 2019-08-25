import React from "react";
import { Container, Row, Table } from "react-bootstrap";
import './Orders.css';


let trs = [
    {
        type: 'BUY',
        amount: 1,
        percentage: -2,
        from: 'ETH',
        to: 'DAI',
        timeFrame: '24h',
        status: 'open'
    },
    {
        type: 'SELL',
        amount: 100,
        percentage: -3.5,
        from: 'OCEAN',
        to: 'DAI',
        timeFrame: '7d',
        status: 'closed'
    }
]

export default class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            orders: trs.slice(),
            selectedType: this.props.type,
            ordersToShow: []
        }
    }

    async componentDidMount(){
        let ordersToShow = await this.filterOrders(
            this.state.orders, this.state.selectedType);
        this.setState({ordersToShow})

    }

    async componentWillReceiveProps(nextProps){
        let ordersToShow = await this.filterOrders(this.state.orders, nextProps.type);
        this.setState({selectedType: nextProps.type, ordersToShow})
    }
  
    formatOrder(order){
        let {percentange} = order;
        if(Number(percentange) > 0){
            order['condition'] = 'INCREASE';
        } else {
            order['condition'] = 'DECREASE';
        }
        return order;
    }

    async filterOrders(orders, condition){
        return await Promise.all(orders.filter(order => order.status == condition));
    }

    render(){
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
                        </tr>
                    </thead>
                    {
                    this.state.ordersToShow.map((order, i) => {
                        let _order = this.formatOrder(order);
                        return (
                            <tr key={i}>
                                <td>{_order.type}</td>
                                <td>{_order.amount}</td>
                                <td>{_order.from}</td>
                                <td>{_order.to}</td>
                                <td>{_order.condition}</td>
                                <td>{Math.abs(_order.percentage)}</td>
                                <td>{_order.timeFrame}</td>
                            </tr>
                        )
                    })}
                    </Table>
                </Row>
                
            </Container>
        )
    }
}
