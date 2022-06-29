export const getData = () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "b37675ed39mshc96be10a276d74ap18e650jsneaf3afd93da5",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  return fetch("https://covid-193.p.rapidapi.com/statistics", options);
};
export const getDataBrazil = () => {
  return fetch("https://covid19-brazil-api.now.sh/api/report/v1", {
    method: "GET",
  });
};

export const getDataByDate = (date) => {
  return fetch(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/${date}`)
};
