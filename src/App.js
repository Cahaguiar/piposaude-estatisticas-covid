import React, {useState, useEffect} from 'react';
import { getData } from './services';
import Header from "./components/header/header.jsx";

export default function CountryStatistics(props) { 
  const [items, setItems] = useState([]);

  useEffect(function() {
    getData()
    .then((response => response.json()))
    .then((response) => {
      const resposta= response.response;
      setItems(resposta)
    })
    .catch(err => console.error(err));
  }, [])
  return (
    <div className="App">  
      <Header />
      <table>
        <thead>
          <tr>
            <th>Países</th>
            <th>Total de Casos</th>
            <th>Novos Casos</th>
            <th>Total de Óbitos</th>
          </tr>
        </thead>
        <tbody>
        {items.map(item => {
          return (
          <tr>
            <td>{item.country}</td>
            <td>{item.cases.total}</td>
            <td>{item.cases.new}</td>
            <td>{item.deaths.total}</td>
          </tr>
        )
        })}
        </tbody>
        </table>
    </div>
  )
}

