import { getSession } from "next-auth/react";

export default async function checkAuth(req) {
  const session = await getSession({ req });

  return session;
}
