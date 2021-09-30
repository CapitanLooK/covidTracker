
import React, { useEffect, useState } from 'react';
import '../base/base.css'
import '../pages/home.css'
import { Map } from "../components/map/Map";
import { Table } from '../components/table/Table'
import { sortData } from '../utils/Utils';
import { LineGraph } from "../components/linegraph/LineGraph";



function Home() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('Todo el Mundo')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [casesType, setCasesType] = useState('cases')
  const [mapZoom, setMapZoom] = useState(5)
  const [mapCenter, setMapCenter] = useState([-34.6083, -58.3712])


  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (e) => {
    const countryCode = e.target.value

    const url = countryCode === 'Todo el Mundo'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })

  }


  

  return (
    <div className="app-container">
      <div className="app-left">
        <div className="app-header">
          <h1>covid 19 tracker</h1>
          <form>
            <select value={country} onChange={onCountryChange}>
              <option value="Todo el Mundo">Todo el Mundo</option>
              {countries.map((country) => (
                <option value={country.value}>{country.name}</option>
              ))}
            </select>
          </form>
        </div>
        <div className="status">
            <div className="status-box">
                <p className="status-title">Casos Activos</p>
                <p className="status-cases">{countryInfo.todayCases}</p>
                <p className="status-total">Totales {countryInfo.cases}</p>
            </div>
            <div className="status-box">
                <p className="status-title">Recuperados</p>
                <p className="status-cases">{countryInfo.todayRecovered}</p>
                <p className="status-total">Totales {countryInfo.recovered}</p>
            </div>
            <div className="status-box">
                <p className="status-title">Fallecimientos</p>
                <p className="status-cases">{countryInfo.todayDeaths}</p>
                <p className="status-total">Totales {countryInfo.deaths}</p>
            </div>
        </div>
        <Map
        mapCenter={mapCenter}
        mapZoom={mapZoom}
        />
      </div>
      <div className="app-right">
      <div className="live-container">
            <h1>casos en vivo por pais</h1>
            <Table countries={tableData}/>
            <h2>casos nuevos en el mundo</h2>
            <LineGraph casesType={casesType}/>
        </div>
      </div>
      {/* Footer */}
    </div>
  );
}

export default Home;
