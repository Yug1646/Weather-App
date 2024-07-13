import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [weather, setWeather] = useState();
  const [submitted, setSubmitted] = useState(false);

  const api_key = "b592ca91af19e5f5a9a6c834010d8627";

  const api_url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api_key}`;

  useEffect(() => {
    fetchdata();
  }, []); //Hoisting

  const fetchdata = async () => {
    try {
      const fetch = await axios.get(api_url);
      console.log(fetch.data);
      setWeather(fetch.data);
      setSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  const formattime = (time) => {
    const date = new Date(time * 1000);
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return date.toLocaleTimeString([], options);
  };

  return (
    // <div className='text-red-500 bg-black mt-5'>Hello World</div>
    <div className="max-w-md mx-auto mt-8 rounded-lg overflow-hidden shadow-lg bg-black-500">
      <div className="flex items-center bg-black-600 border-b border-orange-500 p-2">
        <input
          type="text"
          className="flex-1 appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
          placeholder="Enter Place"
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          className="bg-white hover:bg-black-400 text-black font-bold py-2 px-4 rounded"
          onClick={fetchdata}
        >
          Submit
        </button>
      </div>

      {/* Weather Card */}

      {submitted
        ? weather && (
            <div className="p-4">
              <div className="text-white font-bold text-x1 mb-2">
                Weather Details
              </div>

              <div className="border border-gray-300 p-4 rounded-lg bg-white">
                <p className="mb-4">
                  <span className="font-bold">Co-ordinates : </span>Latitude :{" "}
                  {weather?.coord?.lat}, Longitude : {weather?.coord?.lon}
                </p>

                <p className="mb-2">
                  <span className="font-bold">Temperature : </span>
                  {Math.round(weather?.main?.temp - 273)} C
                </p>

                <p className="mb-2">
                  <span className="font-bold">Pressure : </span>
                  {weather?.main?.pressure} Pa
                </p>

                <p className="mb-2">
                  <span className="font-bold">Humidity : </span>
                  {weather?.main?.humidity} %
                </p>

                <div className="flex justify-between">
                  <p className="mb-2">
                    <span className="font-bold">Wind Speed : </span>
                    {weather?.wind?.speed} KM/H
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">Sunrise : </span>
                    {formattime(weather?.sys?.sunrise)}
                  </p>

                  <p className="mb-2">
                    <span className="font-bold">Sunset : </span>
                    {formattime(weather?.sys?.sunset)}
                  </p>
                </div>
              </div>
            </div>
          )
        : null}
    </div>
  );
};

export default App;
