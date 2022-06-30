import React, { useState } from "react";
import { getDataByDate } from "../../services";

const DataBrazilTime = () => {
  const [teste, setTeste] = useState([]);

  const handleChange = (e) => {
    getDateByTimeRange(e.target.value);
  };

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
      return setTeste(dataByDate);
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
    <section className={"tabelaBrasil"}>
      <h3>TESTE</h3>
      <div className={"containerSelect"}>
        <p>Buscar por: </p>
        <select className="select-state" onChange={handleChange}>
          <option value=""> Semana</option>
          <option value="7">1 semana</option>
          <option value="15">2 semanas</option>
        </select>
      </div>
      <table className={"tabelaBrasil-infos"}>
        <thead>
          <tr className={"tabelaBrasil-titulos"}>
            <th>Casos</th>
            <th>Óbitos</th>
            <th>Suspeitas</th>
          </tr>
          <hr />
        </thead>
        <tbody>
          {teste.map((item) => {
            return (
              <>
                <tr key={item.state} className={"tabelaBrasil-estados"}>
                  <td className={"paises"}> {item.state}</td>
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
  );
};
export default DataBrazilTime;
