import React from "react";


const DataBrazilTime = ({ data, handleChange }) => {
  return (
    <section className={"tabelaBrasil"}>
      <h3>Gráfico de novos casos, óbitos e suspeitas do Covid-19 no Brasil</h3>
      <div className={"containerSelect"}>
        <p>Buscar por: </p>
        <select className="select-state" onChange={handleChange}>
          <option value="21">3 semanas</option>
          <option value="42">6 semanas</option>
        </select>
      </div>
      <div className={"scroll"}>
        <table className={"tabelaBrasil-infos"}>
          <thead>
            <tr className={"tabelaBrasil-titulos"}>
              <th>Data</th>
              <th>Casos</th>
              <th>Óbitos</th>
              <th>Suspeitas</th>
            </tr>
            <hr />
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <>
                  <tr key={item.state} className={"tabelaBrasil-estados"}>
                    <td>{item.datetime}</td>
                    <td>{item.cases}</td>
                    <td>{item.deaths}</td>
                    <td>{item.suspects}</td>
                  </tr>
                  <hr />
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      
    </section>
  );
};
export default DataBrazilTime;
