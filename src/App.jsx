import React, { useState, useEffect } from "react";
import { getData } from "./services";
import { getDataBrazil } from "./services";
import Header from "./components/header/header.jsx";
import styles from "./style.css";

export default function CountryStatistics(props) {
  const [items, setItems] = useState([]);
  const [itemsBrazil, setItemsBrazil] = useState([]);
  const numDays = 40;
  const today = new Date();

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

  const reqs = [];
for(let i = 0; i < numDays; i++) {
  const currentDate = new Date(today)
  currentDate.setDate(currentDate.getDate() - i)
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()

  const date = year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0')
  
  const req = getDataByDate(date)
  reqs.push(req);
}

function getDataByDate(date) {
  const url = `https://covid19-brazil-api.vercel.app/api/report/v1/brazil/${date}`
  return fetch(url)
    .then(response => response.json())
}

Promise.all(reqs)
  .then(values => {
    const dataByDate = values.map(item => processData(item))
    console.log(dataByDate)
  })

function processData({data}) {
  const dataInThisDay = data.reduce((acc, item) => {
    acc.cases = item.cases + (acc.cases || 0)
    acc.deaths = item.deaths + (acc.deaths || 0)
    acc.suspects = item.suspects + (acc.suspects || 0)
    acc.refuses = item.refuses + (acc.refuses || 0)
    acc.datetime = item.datetime
    return acc
  }, {})
  return dataInThisDay
}

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
        <form>
          <label for="dateInicio">Data início:</label>
          <input type="date" id="dateInicio" name="date-inicio" />
          <label for="dateInicio">Data final:</label>
          <input type="date" id="dateInicio" name="date-inicio" />
        </form>
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
