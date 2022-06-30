export function generateGraphData(data) {
    const mappedData = data.reduceRight((acc, item) => {
      acc.labels.push(item.datetime)
      acc.cases.push(item.cases)
      acc.deaths.push(item.deaths)
      acc.suspects.push(item.suspects)
      return acc
    }, {
      labels: [],
      cases: [],
      deaths: [],
      suspects: []
    })
  
    const datasets = [{
      label: "Casos",
      data: [],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.2)"
    }, {
      label: "Óbitos",
      data: [],
      borderColor: "rgb(237, 150, 80)",
      backgroundColor: "rgba(237, 150, 80, 0.2)"
    }, {
      label: "Suspeitos",
      data: [],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.2)"
    }]
  
    for (let i = 0; i < mappedData.labels.length; i++) {
      datasets[0].data.push(mappedData.cases[i])
      datasets[1].data.push(mappedData.deaths[i])
      datasets[2].data.push(mappedData.suspects[i])
  
    }
  
    return {
      labels: mappedData.labels,
      datasets: datasets
    }
  }
