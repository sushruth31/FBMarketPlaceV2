import { getPosts } from "../../lib/redis";
import checkAuth from "./checkAuth";

export default async function handler(req, res) {
  /*   const session = await checkAuth(req);

  if (!session) return res.status(401);
 */
  const { offset } = req.query;

  const posts = await getPosts(offset);

  res.status(200).json(posts);
}
