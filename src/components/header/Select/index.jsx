import React, { useState, useEffect } from "react";
import { getDataBrazil } from "../../../services";

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
    <>
      <label>Selecione um Estado:</label>
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
      </div>
    </>
  )    
} 
export default DataBrazilState;
