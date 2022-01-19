import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      return token;
    },

    async session({ session, user, token }) {
      session.user.uid = token.sub;
      session.token = token;
      return session;
    },
  },
});
