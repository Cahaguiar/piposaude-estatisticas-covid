export const getData = () => {
    const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': 'b37675ed39mshc96be10a276d74ap18e650jsneaf3afd93da5',
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
      };
      
      return fetch('https://covid-193.p.rapidapi.com/statistics', options)
}