import Header from "./components/header/header.jsx";

function App() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'df2194d5dbmsh522022e5d948b99p19cb42jsn5b1bbe778356',
      'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
    }
  };
  
  fetch('https://covid-193.p.rapidapi.com/history?country=usa&day=2020-06-02', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
