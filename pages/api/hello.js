import checkAuth from "./checkAuth";

export default async (req, res) => {
  const session = await checkAuth(req);

  if (!session) {
    return res.status(402);
  }

  res.json(session);
};
