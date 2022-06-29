import React, { useState, useEffect } from "react";
import { getData } from "./services";
// import { getDataBrazil } from "./services";
import Header from "./components/header/header.jsx";
import styles from "./style.css";
import DataBrazilState from "./components/DataBrazilState";

export default function CountryStatistics(props) {

  const [items, setItems] = useState([]);
  // const [itemsBrazil, setItemsBrazil] = useState([]);
  // const [itemsSelect, setItemsSelect] = useState([])

  useEffect(function () {
    getData()
      .then((response) => response.json())
      .then((response) => {
        const resposta = response.response;
        setItems(resposta);
      })
      .catch((err) => console.error(err));
  }, []);

  // useEffect(function () {
  //   getDataBrazil()
  //     .then((response) => response.json())
  //     .then((response) => {
  //       setItemsBrazil(response.data);
  //       setItemsSelect(response.data);
      
  //     })
  //     .catch((err) => console.error(err));
  // }, []);

  // const filterStates = (data, uf) => {
  //   if (!uf) {
  //     return itemsBrazil
  //   }
  //   return data.filter((item) => item.uf === uf)
  // }

  // const handleChange = (e) => {
  //   setItemsSelect(filterStates(itemsBrazil, e.target.value))
    
  // }
  
  return (
    <>
      <Header />
      <div className={`App data ${styles.data}`}>
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
            {items.map((item) => {
              return (
                <tr key={item.country}>
                  <td>{item.country}</td>
                  <td>{item.cases.total}</td>
                  <td>{item.cases.new}</td>
                  <td>{item.deaths.total}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <DataBrazilState />
      
      {/* <label>Selecione um Estado:</label>
      <select className="select-state" onChange={handleChange}>
        <option value="">Selecione um Estado</option>
        {itemsBrazil.map((item) => {
          return (
            <option value={item.uf}> {item.state}</option>
          )
        }
        )}
      </select>
      
      <div className="data-Brazil">
        <table>
          <thead>
            <tr>
              <th>Estado</th>
              <th>Número de Casos</th>
              <th>Número de Óbitos</th>
              <th>Número de Suspeitas</th>
            </tr>
          </thead>
          <tbody>
            {itemsSelect.map((item) => {
              return (
                <tr key={item.state}>
                  <td> {item.state}</td>
                  <td> {item.cases}</td>
                  <td> {item.deaths}</td>
                  <td> {item.suspects}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div> */}
    </>
  );
}
