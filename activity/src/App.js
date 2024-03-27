import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [showState, setShowState] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);
  const [showCities, setShowCities] = useState(true);
  const [bool , setBool] = useState(false)

  async function fetcher(toSet, API) {
    let response = await fetch(API);
    let data = await response.json();
    switch (toSet) {
      case "countries":
        setCountries(data);
        break;
      case "states":
        setStates(data);
        break;
      case "cities":
        setCities(data);
        break;
      default:
        console.log("cant update the data");
        break;
    }
  }
  useEffect(() => {
    fetcher(
      "countries",
      "https://crio-location-selector.onrender.com/countries"
    );
  }, []);

  // function handleChangeCities(e){
  //   setSelectedCity(e.target.value); 
  //   fetcher(
  //     "cities",
  //     `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedCity}/cities`
  //   );
  //   setBool(true);
  // }
  function handleChange(e, isCity = false) {
    console.log("handleChange called");
    const variables = e.target.value;
    if (isCity) {
      fetcher(
        "cities",
        `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${variables}/cities`
      );
      setShowCities(false);
      setSelectedState(variables);
      setBool(false);
      return;
    }
    fetcher(
      "states",
      `https://crio-location-selector.onrender.com/country=${variables}/states`
    );
  
    setShowState(false);
    setSelectedCountry(variables);
    setBool(false);
  }
  return (
    <div className="App">
      <h1>Select Location</h1>

      {/* countries */}

      <select onClick={handleChange} style={{ height: "40px" }} defaultValue="Select Country">
        <option disabled>Select Country</option>
        {countries.map((opt, idx) => (
          <option value={opt} id={idx}>
            {opt}
          </option>
        ))}
      </select>

      {/* State */}

      <select
        onChange={(e) => handleChange(e, true)}
        style={{ height: "40px", width: "200px" }}
        disabled={showState && true}
        defaultValue="Select State"
      >
        <option disabled>Select State</option>
        {states.length && states.map((opt, idx) => (
          <option value={opt} id={idx}>
            {opt}
          </option>
        ))}
      </select>

      {/* cities */}

      <select
        
        style={{ height: "40px", width: "200px" }}
        disabled={showCities && true}
        onChange={(e) => { setSelectedCity(e.target.value); setBool(true); }}
        defaultValue="Select City"
      >
        <option disabled>Select City</option>
        {cities.map((opt, idx) => (
          <option value={opt} id={idx}>
            {opt}
          </option>
        ))}
      </select>
      {console.log(bool)}
      {bool &&  <h2>You selected {selectedCity}, {selectedState}, {selectedCountry}</h2>}
    </div>
  );
}

export default App;
