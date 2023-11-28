import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const APIkey = "b6d57e82dd40c514f19c6286a5f35696";
const fetchWeather =async(query) => {
  const response = await axios.get(URL, {
    params: {
      q: query,
      units: 'metric',
      APPID:APIkey
    }
  });
  return response.data;
}

export default fetchWeather;