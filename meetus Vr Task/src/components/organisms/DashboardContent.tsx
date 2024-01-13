import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import TasksContent from '../moledcules/TasksContent'
import AddTask from '../moledcules/AddTask'

const DashboardContent = () => {
  return (
    <Container className='dash-content'>
                <Row className="w-100">
                  <Col xs={12} > 
                    <div className="dashboard-title text-center" > 
                      Tasks
                    </div>
                  </Col>
                  <Col xs={12} >
                   <AddTask />
                      
                  </Col>
                    <TasksContent />
                </Row>
            </Container>
  )
}

export default DashboardContent