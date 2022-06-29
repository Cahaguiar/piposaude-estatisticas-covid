import React, { useState, useEffect } from "react";
import { getDataBrazil, getDataByDate, getData } from "./services";
import Header from "./components/header/header.jsx";
import styles from "./style.css";
import DataBrazilState from "./components/DataBrazilState/index.jsx";
import CalculateWorld from "./components/calculateWorld/calculateWorld.jsx";


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

  function getDateByTimeRange(numDays) {
    const today = new Date();
    const reqs = [];
    for (let i = 0; i < numDays; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() - i);
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const date =
        year.toString() +
        month.toString().padStart(2, "0") +
        day.toString().padStart(2, "0");
      const req = getDataByDate(date);
      reqs.push(req);
    }

    Promise.all(reqs).then((values) => {
      const dataByDate = values.map((item) => processData(item));
      console.log(dataByDate)
    });
  }

  function processData({ data }) {
    const dataInThisDay = data.reduce((acc, item) => {
      acc.cases = item.cases + (acc.cases || 0);
      acc.deaths = item.deaths + (acc.deaths || 0);
      acc.suspects = item.suspects + (acc.suspects || 0);
      acc.refuses = item.refuses + (acc.refuses || 0);
      acc.datetime = item.datetime;
      return acc;
    }, {});
    console.log(dataInThisDay)
    return dataInThisDay;
  }

  return (
    <>
      <Header />
      <main className={'App main'}>
        <h1><p>COVID19</p>Painel Coronavírus</h1>
        <CalculateWorld />
        
        <section className={'tabelaMundial'}>
          <h3>Síntese de casos, óbitos e novos casos do Covid-19 no mundo</h3>
          <table className={'tabelaMundial-infos'}>
            <thead>
              <tr className={'tabelaMundial-titulos'}>
                <th>Países</th>
                <th>Casos</th>
                <th>Novos Casos</th>
                <th>Óbitos</th>
              </tr>
              <hr />
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <>
                    <tr key={item.country} className={'tabelaMundial-paises'}>
                      <td className={'paises'}>{item.country}</td>
                      <td>{item.cases.total}</td>
                      <td>{item.cases.new}</td>
                      <td>{item.deaths.total}</td>
                    </tr>
                    <hr />
                  </>
                );
              })}
            </tbody>
          </table>
        </section>
        <section className={'tabelaBrasil'}>
          <h3>Síntese de casos, óbitos e suspeitas do Covid-19 no Brasil</h3>
          <table className={'tabelaBrasil-infos'}>
            <thead>
              <tr className={'tabelaBrasil-titulos'}>
                <th>Estado</th>
                <th>Casos</th>
                <th>Óbitos</th>
                <th>Suspeitas</th>
              </tr>
              <hr />
            </thead>
            <tbody>
              {itemsBrazil.map((item) => {
                return (
                  <>
                    <tr key={item.state} className={'tabelaBrasil-estados'}>
                      <td className={'paises'}> {item.state}</td>
                      <td> {item.cases}</td>
                      <td> {item.deaths}</td>
                      <td> {item.suspects}</td>
                    </tr>
                    <hr />
                  </>
                );
              })}
            </tbody>
          </table>
        </section>
        <DataBrazilState />
      </main>
    </>
  );
}
