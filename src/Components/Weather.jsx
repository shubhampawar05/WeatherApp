import React, { useState } from 'react';

const Weather = () => {
  const citys = ["London", "New York", "Los Angeles", "Las Vegas"];
  const [inputVal, setInputVal] = useState('');
  const [index, setIndex] = useState(0); //count value
  const [details, setDetails] = useState([]);// data
  const [addedCities, setAddedCities] = useState([]);
  const [deletedCities, setDeletedCities] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState(null); // state to keep track of highlighted row

  const getData = async () => {
    if (deletedCities.length > 0) {
      // Re-add the last deleted city
      const cityToReAdd = deletedCities.pop();
      const response = await fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${cityToReAdd}`);
      let data = await response.json();
      setDetails((prevDetails) => [...prevDetails, { ...data, city: cityToReAdd }]);
      setAddedCities((prevAddedCities) => [...prevAddedCities, cityToReAdd]);
    } else if (index < citys.length) {
      const response = await fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${citys[index]}`);
      let data = await response.json();
      setDetails((prevDetails) => [...prevDetails, { ...data, city: citys[index] }]);
      setIndex((idx) => idx + 1);
      setAddedCities((prevAddedCities) => [...prevAddedCities, citys[index]]);
    }
  };

  const changeValue = (value, i) => {
    const data = [...details];
    data[i].description = value;
    setDetails(data);
  };

  const deleteFunction = (idx) => {
    const deletedCity = details[idx].city;
    const filteredData = details.filter((_, i) => i !== idx);
    setDetails(filteredData);
    setDeletedCities((prevDeletedCities) => [...prevDeletedCities, deletedCity]);
    setAddedCities((prevAddedCities) => prevAddedCities.filter(city => city !== deletedCity));
  };

  const handleSearch = () => {
    const index = details.findIndex(detail => detail.city.toLowerCase() === inputVal.toLowerCase());
    if (index !== -1) {
      setHighlightedRow(index);
      setTimeout(() => {
        setHighlightedRow(null);
      }, 3000);
    }
  };

  return (
    <div className='w-full'>
      <div className='max-w-screen-xl border-2 border-black mx-auto'>
        {/* Header Part */}
        <header className='bg-[#4472C4] text-center'>
          <h1 className='text-white py-4 text-xl font-semibold'>Shubham's Weather App</h1>
        </header>
        <main className='w-full h-72 flex'>
          {/* left */}
          <div className='w-[20%] h-full border-r-2 border-black px-8 py-4'>
            {/* GetWeather btn */}
            <button className='px-2 py-2 border-2 w-full bg-[#4472C4] rounded-xl font-semibold text-white mb-2' onClick={getData}>
              Get Weather
            </button>

            {/* cities */}
            <div className='border border-black'>
              <div className='p-2 border border-black bg-[#4472C4] font-semibold text-white'>Cities</div>
              {citys.map((cityName, idx) => (
                <div key={idx} className={`p-2 border-2 font-semibold ${addedCities.includes(cityName) ? "border-green-500" : "border-black"}`}>
                  {cityName}
                </div>
              ))}
            </div>
          </div>

          {/* right */}
          <div className='w-[80%] border-l-2 border-black py-4 px-12'>
            {/* search Bar */}
            <div className='text-right mb-2'>
              <input type="text" placeholder='City Name..' value={inputVal} onChange={(e) => setInputVal(e.target.value)} className='border border-black rounded-l p-2 outline-none' />
              <button className='bg-[#4472C4] font-semibold text-white rounded-r py-2 px-4 border border-[#4472C4]' onClick={handleSearch}>Search</button>
            </div>

            {/* Table Part */}
            <table className='border w-full'>
              <thead>
                <tr className='bg-[#4472C4] font-semibold text-white'>
                  <th className='w-1/7 border py-2'>City</th>
                  <th className='w-2/7 border'>Description</th>
                  <th className='w-1/7 border'>Temperature</th>
                  <th className='w-1/7 border'>Pressure</th>
                  <th className='w-1/7 border'>Data age(hrs)</th>
                  <th className='w-1/7 border'>Delete</th>
                </tr>
              </thead>
              <tbody>
                {details.map((detail, idx) => {
                  return (
                    <tr key={idx} className={highlightedRow === idx ? 'bg-yellow-500' : ''}>
                      <td className='w-1/7 border py-2'>{detail.city}</td>
                      <td className='w-2/7 border'>
                        <input
                          type="text"
                          onChange={(e) => changeValue(e.target.value, idx)}
                          value={detail.description}
                          className='border p-1 rounded'
                        />
                      </td>
                      <td className='w-1/7 border'>{detail.temp_in_celsius}</td>
                      <td className='w-1/7 border'>{detail.pressure_in_hPa}</td>
                      <td className='w-1/7 border'>
                        {Math.round(((new Date() - new Date(detail.date_and_time)) / (1000 * 60 * 60)) * 100) / 100}
                      </td>
                      <td className='w-1/7 border'>
                        <button className=' underline text-[#4472C4]' onClick={() => deleteFunction(idx)}>Delete</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {details.length === 0 && <div className='text-center w-full'><h1 className='mt-20 font-bold text-2xl'>No Data</h1></div>}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Weather;
