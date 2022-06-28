import React, {useState, useEffect} from 'react';
import { getData } from './services';
//import Header from "./components/header/header";


export default function CountryStatistics(props) { 
  const [items, setItems] = useState([]);

  useEffect(function() {
    getData()
    .then((response => response.json()))
    .then((response => {
      console.log(response)
      return response
      }))
    .then((response) => {
      const resposta= response.response;
      setItems(resposta)
    })
    .catch(err => console.error(err));
  }, [])
  return (
    <div className="App">  
      {/* <Header /> */}
      {items.map(item => {
        return (
          <div key={item.country}>
            <p>Países: {item.country}</p>
            <p>Total de casos: {item.cases.total}</p>
            <p>Novos casos: {item.cases.new}</p>
            <p>Total de óbitos: {item.deaths.total}</p>
          </div>
        )
      }
      )}
    </div>
  )
}