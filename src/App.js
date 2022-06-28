import React, {useState, useEffect} from 'react';
//import Header from "./components/header/header";


export default function CountryStatistics(props) { 
  
  const [items, setItems] = useState([]);

  useEffect(function() {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b37675ed39mshc96be10a276d74ap18e650jsneaf3afd93da5',
        'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
      }
    };
    
    fetch('https://covid-193.p.rapidapi.com/statistics', options)
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