import React, { useState, useEffect } from "react";
import { getData } from "./services";
import Header from "./components/header/header.jsx";
import "./style.css";
import DataBrazilState from "./components/DataBrazilState/index.jsx";
import CalculateWorld from "./components/calculateWorld/calculateWorld.jsx";
import DataBrazilTime from "./components/dataBrazilTime/dataBrazilTime";
import GraphicTime from "./components/dataBrazilTime/graphicTime";
import Footer from "./components/footer/footer";
import { getDataByDate } from "./services";
import {
  Chart as ChartsJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import 'chart.js/auto'

ChartsJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)


export default function CountryStatistics() {

  const [items, setItems] = useState([]);
  const [brazilTimeData, setBrazilTimeData] = useState([]);

  useEffect(function () {
    getData()
      .then((response) => response.json())
      .then((response) => {
        const resposta = response.response;
        setItems(resposta);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    getDateByTimeRange(e.target.value);
  };

  useEffect(getDateByTimeRange, [])

  function processData({ data }) {
    const dataInThisDay = data.reduce((acc, item) => {
      acc.cases = item.cases + (acc.cases || 0);
      acc.deaths = item.deaths + (acc.deaths || 0);
      acc.suspects = item.suspects + (acc.suspects || 0);
      acc.refuses = item.refuses + (acc.refuses || 0);

      const regex = /(\d{4})-(\d{2})-(\d{2})/
      const result = regex.exec(item.datetime)
      const [_, year, month, day] = result

      acc.datetime = `${day}/${month}/${year}`;
      return acc;
    }, {});
    return dataInThisDay;
  }

  function getDateByTimeRange(numDays = 21) {
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
      const dataByDate = values.map((item) => processData(item))
        .filter(item => item.cases);
      setBrazilTimeData(dataByDate);
    });
  }

  return (
    <>
      <Header />
      <main className={'App main'}>
        <h1><p>COVID19</p>Painel Coronavírus</h1>
        <CalculateWorld />
        <DataBrazilState />
        <DataBrazilTime data={brazilTimeData} handleChange={handleChange} />
        <GraphicTime data={brazilTimeData} />

        <section className={'tabelaMundial'}>
          <h3>Síntese de casos, óbitos e novos casos do Covid-19 no mundo</h3>
          <div className={'scroll'}>
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
                        <td>{item.cases.total || 0}</td>
                        <td>{item.cases.new || "+0"}</td>
                        <td>{item.deaths.total || 0}</td>
                      </tr>
                      <hr />
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
