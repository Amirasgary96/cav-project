import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Table, Form, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [cavTableData, setCavTableData] = useState([]);
  const [definitionsTableData, setDefinitionsTableData] = useState([]);
  const [cavSearchTerm, setCavSearchTerm] = useState('');
  const [definitionsSearchTerm, setDefinitionsSearchTerm] = useState('');

  useEffect(() => {
    fetch('/cavData.json')
      .then(response => response.json())
      .then(data => setCavTableData(data.slice(1)));

    fetch('/definitionsData.json')
      .then(response => response.json())
      .then(data => setDefinitionsTableData(data.slice(1)));
  }, []);

  const filteredCavData = cavTableData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(cavSearchTerm.toLowerCase())
    )
  );

  const filteredDefinitionsData = definitionsTableData.filter(row =>
    Object.values(row).some(value =>
      value.toString().toLowerCase().includes(definitionsSearchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-light min-vh-100">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt="Your Logo"
              src="/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            CAV Project
          </Navbar.Brand>
        </Container>
      </Navbar>
      
      <Container className="py-4">
        <Tabs>
          <TabList>
            <Tab>CAV</Tab>
            <Tab>Definitions</Tab>
          </TabList>

          <TabPanel>
            <h2 className="mb-4">Critical Action Values</h2>
            <Form.Control
              type="text"
              placeholder="Search CAV..."
              className="mb-3"
              onChange={(e) => setCavSearchTerm(e.target.value)}
            />
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Test Name</th>
                    <th>Critical Low</th>
                    <th>Critical High</th>
                    <th>Units</th>
                    <th>Clinical Significance</th>
                    <th>Potential Causes & Risk Factors</th>
                    <th>Recommended Immediate Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCavData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.A}</td>
                      <td>{row.B}</td>
                      <td>{row.C}</td>
                      <td>{row.D}</td>
                      <td>{row.E}</td>
                      <td>{row.F}</td>
                      <td>{row.G}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </TabPanel>

          <TabPanel>
            <h2 className="mb-4">Definitions</h2>
            <Form.Control
              type="text"
              placeholder="Search Definitions..."
              className="mb-3"
              onChange={(e) => setDefinitionsSearchTerm(e.target.value)}
            />
            <div className="table-responsive">
              <Table striped bordered hover>
                <thead className="bg-primary text-white">
                  <tr>
                    <th>Term</th>
                    <th>Standardized Definition</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDefinitionsData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.A}</td>
                      <td>{row.B}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </TabPanel>
        </Tabs>
      </Container>
    </div>
  );
};

export default App;