import { getListings } from "../../lib/redis";

export default async function (req, res) {
  const listings = await getListings(0);

  res.status(200).json(listings);
}
