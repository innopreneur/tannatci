import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CButton from './CButton';
import './NewAccount.css';


export default class NewAccount extends React.Component {
    constructor(props){
        super(props);
        this.state = {}
    }

    createNewAccount(){
        //TODO : create trade account contract
        this.props.onCreate({isCreated: true})
    }
    render(){
        let label = "You don't seem to have account yet. Let's change this !!"
        return (
            <Container className="new-account-container">
                <Row className="new-account-label-row">
                    <Col lg={12}>
                       <p className="new-account-label">{label}</p>
                    </Col>
                </Row>
                <Row className="new-account-btn">
                    <Col lg={12}>
                        <CButton 
                            onClick={this.createNewAccount.bind(this)}
                            variant="dark"
                            size="lg"
                            >
                                Create New Account
                        </CButton>
                    </Col>
                </Row>
                
            </Container>
        )
    }
}
