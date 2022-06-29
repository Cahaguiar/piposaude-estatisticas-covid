import React, { useState, useEffect } from "react";
import { getData } from "./services";
import { getDataBrazil } from "./services";
import Header from "./components/header/header.jsx";
import styles from "./style.css";
export default function CountryStatistics(props) {
  const [items, setItems] = useState([]);
  const [itemsBrazil, setItemsBrazil] = useState([]);
  useEffect(function () {
    getData()
      .then((response) => response.json())
      .then((response) => {
        const resposta = response.response;
        setItems(resposta);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(function () {
    getDataBrazil()
      .then((response) => response.json())
      .then((response) => {
        setItemsBrazil(response.data);
      })
      .catch((err) => console.error(err));
  }, []);
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
            {itemsBrazil.map((item) => {
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
      </div>
    </>
  );
}
