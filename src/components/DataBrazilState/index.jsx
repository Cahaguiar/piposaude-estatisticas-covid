import React, { useState, useEffect } from "react";
import { getDataBrazil } from "../../services";

const DataBrazilState = () => {
  const [itemsBrazil, setItemsBrazil] = useState([]);
  const [itemsSelect, setItemsSelect] = useState([])

  useEffect(function () {
    getDataBrazil()
      .then((response) => response.json())
      .then((response) => {
        setItemsBrazil(response.data);
        setItemsSelect(response.data);
      
      })
      .catch((err) => console.error(err));
  }, []);

  const filterStates = (data, uf) => {
    if (!uf) {
      return itemsBrazil
    }
    return data.filter((item) => item.uf === uf)
  }

  const handleChange = (e) => {
    setItemsSelect(filterStates(itemsBrazil, e.target.value))
  }

  return (
    <section className={'tabelaBrasil'}>
      <select className="select-state" onChange={handleChange}>
        <option value="">Selecione um Estado</option>
        {itemsBrazil.map((item) => {
          return (
            <option value={item.uf}> {item.state}</option>
          )
        }
        )}
      </select>
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
          {itemsSelect.map((item) => {
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
  )    
} 
export default DataBrazilState;
