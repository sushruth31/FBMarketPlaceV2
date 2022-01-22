import axios from "axios";

async function getCities() {
  const data = await axios.post(
    "https://countriesnow.space/api/v0.1/countries/cities",
    { country: "united states" },
    { headers: { "Content-Type": "application/json" } }
  );

  return data.data.data;
}

export default async function handler(req, res) {
  const { query } = req.query;

  let cities = await getCities();

  cities = cities.filter(city => city.toLowerCase().includes(query.toLowerCase())).slice(0, 10);

  res.send(cities);
}
