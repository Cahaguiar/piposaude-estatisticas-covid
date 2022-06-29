import React, { useState, useEffect } from "react";
import { getData } from "./services";
import { getDataBrazil, getDataByDate } from "./services";
import Header from "./components/header/header.jsx";
import styles from "./style.css";

export default function CountryStatistics(props) {
  const [items, setItems] = useState([]);
  const [itemsBrazil, setItemsBrazil] = useState([]);

  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

function getDates(startDate, stopDate) {
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

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
    // getDataBrazil()
    //   .then((response) => response.json())
    //   .then((response) => {
    //     setItemsBrazil(response.data);
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  useEffect(function () {
    const getDate = getDates(new Date('2022-04-15'), new Date('2022-04-30'));
  
  getDate.map((date) => {
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    let dataCompleta = year.toString() + month.toString().padStart(2, '0') + day.toString().padStart(2, '0')
    getDataByDate(dataCompleta)
    .then((response) => response.json())
      .then((response) => {
        if(response.data.length > 0) {
          console.log(response.data)
          // setItemsBrazil(response.data);
        }
      })
      .catch((err) => console.error(err));
  })
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
        <form>
          <label for="dateInicio">Data início:</label>
          <input type="date" id="dateInicio" name="date-inicio" />
          <label for="dateInicio">Data final:</label>
          <input type="date" id="dateInicio" name="date-final" />
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
