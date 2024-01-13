import React from "react";
import { Button, Col, Container,  Row } from "react-bootstrap";
import Sidebar from "../../components/moledcules/Sidebar";
import DashboardContent from "../../components/organisms/DashboardContent";

const Home = () => {
  return (
    <Container fluid>
    <Row>
        <Col xs={2} id="sidebar-wrapper " className="p-0">      
            <Sidebar />
        </Col>
        <Col  xs={12} md={10} id="page-content-wrapper" className="p-0">
           <DashboardContent /> 
        </Col> 
    </Row>

</Container>
   
  );
};

export default Home;
