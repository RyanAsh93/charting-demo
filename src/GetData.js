import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { X_RAPIDAPI_KEY } from './keys';
import CovidStatsTotal from './CovidStatsTotal'
import CovidBarChart from './CovidBarChart'
import List from './customComponents/List';
import CovidCard from './customComponents/CovidCard';

export default function GetData(props) {
  const [covidData, setCovidData] = useState([])
  
  useEffect(() => {
    getCovidStats()
  }, [])

  async function getCovidStats() {
    // *** Leaving this here as an example 'how to do this with fetch' ***
//     fetch("https://covid-193.p.rapidapi.com/statistics", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "covid-193.p.rapidapi.com",
// 		"x-rapidapi-key": "014756dc0emsh5d544eee5b7e9bfp1130a9jsn5c29ac5acffe"
// 	}
// })
// .then(response => {
//   console.log(response);
//   response.json().then( data => {
//    setCovidData(data.response
//     debugger
//     console.log(data)
//   })
// })
// .catch(err => {
//   console.log(err);
//   debugger
// });

  const res = await Axios.get("https://covid-193.p.rapidapi.com/statistics",{
    headers: {
      "x-rapidapi-host": "covid-193.p.rapidapi.com",
      "x-rapidapi-key": "014756dc0emsh5d544eee5b7e9bfp1130a9jsn5c29ac5acffe"
    }
  })
    setCovidData(res.data.response)
  }

  return (
    <div>
      <h1>Data here</h1>
      {covidData.length}
      <CovidBarChart covidData={covidData} count={10} />
      {/* <CovidStatsTotal covidData={covidData} /> */}
      <List 
      header='Covid stats by country'
      data={covidData} 
      renderItem={(item) => <CovidCard country={item}/>} />
      {/* <List data={covidData} renderItem={(item) => <div>{item.population}</div>} /> */}
    </div>
  )
}
