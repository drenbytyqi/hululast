import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'
import React, { useEffect, useState } from "react";
import { userAccessToken, fetchUser } from "../utils/fetchUserDetails";
import { useRouter } from "next/router";

export default function Home({ results, movies, useractivity }) {
  console.log(results)
  const router = useRouter();

  console.log(movies)

  useEffect(() => {
    const accessToken = userAccessToken();
    if (accessToken === null) {
      router.push("/login");
    }

  }, []);


  return (
    <div>
      <Head>
        <title>Hulu 2.9</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Nav />

       <Results results={results}  movies={movies} useractivity = {useractivity} />  
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre
  console.log(genre)

  const request = await fetch(
    `https://api.themoviedb.org/3${requests[genre]?.url || requests.fetchTrending.url
    }`).then((res) => res.json());

  const res = await fetch('https://hulu3-kappa.vercel.app/api/movies/');
  const { data } = await res.json();

  const usersApi = await fetch('https://hulu3-kappa.vercel.app/api/users/');
  const { dataU } = await usersApi.json();

  return {
    props: {
      results: request.results,
      movies: data,
      useractivity: dataU 
    }
  }
}