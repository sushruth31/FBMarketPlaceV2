import { NextResponse } from "next/server";
import checkAuth from "./api/checkAuth";

export async function middleware(req, ev) {
  const { pathname } = req.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect("/login");
  }
}
