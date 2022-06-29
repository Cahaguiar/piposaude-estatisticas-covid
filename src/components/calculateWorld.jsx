import React, { useState, useEffect } from 'react';
import { getData } from '../services';

const CalculateWorld = () => {
  const [totalData, setTotalData] = useState({
    preDeaths: 0,
    preNewCases: 0,
    preCases: 0,
  });
  function calculateTotalData(response) {

    const totalData = response.reduce((acc, item) => {
      acc.preDeaths = acc.preDeaths + (item.deaths.total || 0);
      const newCases = item.cases.new ? parseInt(item.cases.new.replace('+', '')) : 0
      acc.preNewCases = acc.preNewCases + newCases;
      console.log(newCases);
      acc.preCases = acc.preCases + (item.cases.total || 0);
      return acc
    }, {
      preDeaths: 0,
      preNewCases: 0,
      preCases: 0,
    })
    setTotalData(totalData)
  }

  useEffect(function () {
    getData()
      .then((response => response.json()))
      .then((response) => {
        const answer = response.response;
        console.log(answer)
        calculateTotalData(answer)
      })
      .catch(err => console.error(err));

  }, [])
  return (
    <div className="container-totals-world" key="container-totals-world">
      <p>Total de casos no mundo: {totalData.preCases.toLocaleString()}</p>
      <p>Total de mortes no mundo: {totalData.preDeaths.toLocaleString()}</p>
      <p>Total de novos casos no mundo: {totalData.preNewCases.toLocaleString()}</p>
    </div>
  )
};

export default CalculateWorld;