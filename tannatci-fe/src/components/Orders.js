import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CButton from './CButton';
import './Orders.css';


export default class Orders extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    createNewAccount(){
        this.props.onCreate({isCreated: true})
    }
    render(){
        return (
            <Container className="new-account-container">
                <Row className="new-account-label-row">
                    
                </Row>
                
            </Container>
        )
    }
}
