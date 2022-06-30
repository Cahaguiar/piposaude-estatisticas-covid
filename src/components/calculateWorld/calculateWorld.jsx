import React, { useState, useEffect } from 'react';
import { getData } from '../../services';
import style from '../calculateWorld/calculateWorld.module.css';

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
        calculateTotalData(answer)
      })
      .catch(err => console.error(err));

  }, [])
  return (
    <section className={style.totalsSection} key="container-totals-world">
      <div className={style.totalCases}>
        <p>Total de <br /> casos no mundo</p>
        <p className={style.totalValues}>{totalData.preCases.toLocaleString()}</p>
      </div>
      <div className={style.totalDeaths}>
        <p>Total de <br /> óbitos no mundo</p>
        <p className={style.totalValues}>{totalData.preDeaths.toLocaleString()}</p>
      </div>
      <div className={style.totalNewCases}>
        <p>Total de <br /> novos casos no mundo</p>
        <p className={style.totalValues}>{totalData.preNewCases.toLocaleString()}</p>
      </div>
    </section>
  )
};

export default CalculateWorld;
