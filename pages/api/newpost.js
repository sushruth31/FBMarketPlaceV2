import { newPost } from "../../lib/redis";

export default async function handler(req, res) {
  const id = await newPost(req.body);

  res.status(200).json({ id });
}
