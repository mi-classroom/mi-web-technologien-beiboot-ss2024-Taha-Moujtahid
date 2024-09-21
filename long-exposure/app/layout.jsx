import localFont from "next/font/local";
import "./globals.css";
import { cookies } from 'next/headers'
import {jwtDecode} from 'jwt-decode'
import RBAC_Wrapper from './utils/auth/rbac_wrapper'
import React from "react";
import { createClient } from "./utils/supabase/server";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const emoji_font = localFont({
  src : [
      {
          path : "./fonts/AppleColorEmoji.ttf",
      }
  ],
  variable: "--font-emoji"
})

export default async function RootLayout({ children }) {

  const cookieStore = cookies()
  const supabase = createClient({
    cookies: () => cookieStore
  })

  const {
    data: { session }
  } = await supabase.auth.getSession()  

  //var session = (await supabase.auth.getSession()).data.session;
  var userRole = "anon";
  if(session){
    userRole = jwtDecode(session.access_token).user_role;
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${emoji_font.variable} antialiased`}
      >
        <RBAC_Wrapper role={userRole}>
          {children}
        </RBAC_Wrapper>
      </body>
    </html>
  );
}
