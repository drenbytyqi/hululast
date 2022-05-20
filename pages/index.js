import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'
import React, { useEffect, useState } from "react";
import { userAccessToken, fetchUser } from "../utils/fetchUserDetails";
import { useRouter } from "next/router";



export default function Home({ results }) {
  console.log(results)

  const router = useRouter();
  const [user, setUser] = useState({})


  useEffect(() => {
    const accessToken = userAccessToken();
    if (!accessToken) {
      return () => {
        router.push("/login");
      }
    }
    const [userInfo] = fetchUser()
    setUser(userInfo);
  }, []);


  return (


    <div>
      <Head>
        <title>Hulu 2.9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Nav />

      <Results results={results} />


    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre

  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url
    }`
  ).then(res => res.json());

  return {
    props: {
      results: request.results,
    }
  }
}