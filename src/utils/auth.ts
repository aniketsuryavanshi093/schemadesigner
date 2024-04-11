import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import axiosInterceptorInstance from "@/http";
import { Fetch } from "./apiservice";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      type: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, _req) {
        try {
          // const res = await axiosInterceptorInstance.post(
          //   "user/login",
          //   credentials?.password
          //     ? {
          //         email: credentials?.email,
          //         password: credentials?.password || "",
          //       }
          //     : {
          //         loginCredential: credentials?.email,
          //         isGoogleLogin: true,
          //       },
          //   {
          //     headers: {
          //       "Content-Type": "application/json",
          //     },
          //   }
          // );
          const res = await axiosInterceptorInstance.post(
            "user/login",
            credentials?.password
              ? {
                email: credentials?.username,
                password: credentials?.password || "",
              }
              : {
                email: credentials?.username,
                isGoogleLogin: true,
              },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          // If no error and we have user data, return it
          const data = res.data;
          if (data.status === "fail") {
            return;
          }
          const user = {
            _id: data?.data?.User?._id,
            name: data?.data?.User?.name,
            profilePic: data?.data?.User?.profilePic,
            email: data?.data?.User?.email,
            createdAt: data?.data?.User?.createdAt,
            updatedAt: data?.data?.User?.updatedAt,
            authToken: data?.data?.Token,
          };
          return user;
        } catch (error: any) {
          console.log(error);
          throw Error(error?.response?.data?.message);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async jwt(params) {
      if (params.trigger === "update") {
        // Note, that `session` can be any arbitrary object, remember to validate it!
        let pic = params.token.profilePic;
        let usname = params.token.userName;
        params.token.profilePic = params.session?.profilePic || pic;
        params.token.userName = params.session?.userName || usname;
        await Fetch({
          token: params.token.authToken as string,
          data: {
            email: params.token.email,
            Bio: params.session?.Bio,
            userName: params.session?.userName,
            profilePic: params.session?.profilePic,
          },
          url: "user/update",
          method: "POST",
        });
      }

      if (params.user) {
        params.token.authToken = params.user.authToken;
        params.token._id = params.user._id;
        params.token.name = params.user.name;
        params.token.email = params.user.email;
        params.token.profilePic = params?.user?.profilePic;
        params.token.createdAt = params.user.createdAt;
        params.token.updatedAt = params.user.updatedAt;
      }
      return params.token;
    },
    async session({ token, session }) {
      // here we can add the role of the user this function will be called when the session is created
      if (token) {
        session.user.id = token._id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.profilePic = token.profilePic;
        session.user.createdAt = token.createdAt;
        session.user.updatedAt = token.updatedAt;
        session.user.authToken = token.authToken;
      }
      return session;
    },
  },
};
