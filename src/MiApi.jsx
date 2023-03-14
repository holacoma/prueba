
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';

function MiApi() {

  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [search, setSearch] = useState("");
  const APIUrl = "https://www.feriadosapp.com/api/holidays-2019.json"
  
  useEffect(() => {
    fetch(APIUrl)
      .then(response => response.json())
      .then(json => {setData(json.data)})
      .catch(error => console.error(error));
  }, []);

  const holidays = ((holiday_data) =>
    <div className='holiday-table'>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th> Nombre </th>
            <th> Fecha </th>
          </tr>
        </thead>
        <tbody>
          {holiday_data.map((holiday, index) => (
            <tr>
              <td> {holiday.title} </td>
              <td> {holiday.date} </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )

  const handleSubmit = ((event) => {
    event.preventDefault();
    var dataFiltered = data.filter(holiday => holiday.title.includes(search.trim()));
    dataFiltered.sort((a, b) => b.title.localeCompare(a.title))
    dataFiltered.reverse()
    setSearchData(dataFiltered);
  })

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand> Dias Feriados Chile </Navbar.Brand>
        </Container>
      </Navbar>

      <Container>
        <div className='holiday-data'>
          {holidays(data)}
        </div>
        <div className='holiday-searcher'>
            <Form onSubmit={handleSubmit}>
              <div class="input-group">
                <input type="text" class="form-control" aria-describedby="basic-addon2" name="search" placeholder="Busqueda por Nombre" value={search} onChange={(event) => setSearch(event.target.value) }/>
                <button class="btn btn-primary input-group-addon" id="basic-addon2" type="submit"> Buscar </button>
              </div>
            </Form>
          <hr/>
            <div className="holiday-searcher-data">
              {holidays(searchData)}
            </div>
          <hr/>
        </div>
      </Container>

    </div>
  );
}

export default MiApi;
