import Image from 'next/image'
import { ThumbUpIcon, ThumbDownIcon } from '@heroicons/react/outline'
import { forwardRef, useState, useEffect } from 'react'
import { fetchUser } from '../utils/fetchUserDetails';


const Thumbnail = forwardRef(({ result, movie, useractivity }, ref) => {
    const BASE_URL = "https://image.tmdb.org/t/p/original/"


    var [count, setCount] = useState(null);
    var [hasLiked, setLiked] = useState(false);
    const [user, setUser] = useState([])
    useEffect(() => {
        if (movie) setCount(movie.total_votes);
        else setCount(0);
        if (useractivity) setLiked(useractivity.vote);
    }, [movie]);

    // const [form, setForm] = useState({ tmdb_id: result.id, tmdb_title: result.title || result.original_name, total_votes: count+1 })
    const increaseCount = async () => {
        setCount((prevCount) => prevCount + 1);
        const [userInfo] = fetchUser();
        setUser(userInfo)
        try {
            const res = await fetch(`https://hulu3-kappa.vercel.app/api/movies`,{
                method: 'POST',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tmdb_id: result.id, tmdb_title: result.title || result.original_name, total_votes: count+1 })
            })


            if(useractivity === undefined){
                const resU = await fetch(`https://hulu3-kappa.vercel.app/api/users`, {
                    method: 'POST',
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({user_id: userInfo.uid, user_movie_id: result.id, vote: true })
                })
            }
            const resU = await fetch(`https://hulu3-kappa.vercel.app/api/users/${useractivity._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: userInfo.uid, user_movie_id: result.id, vote: true })
            })
        } catch (error) {
            console.log(error);
        }

        setLiked(prevLiked => true)
    }



    const decreaseCount = async () => {
        setCount((prevCount) => prevCount - 1);
        const [userInfo] = fetchUser();
        setUser(userInfo)
        try {
            const res = await fetch(`https://hulu3-kappa.vercel.app/api/movies/${movie._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ tmdb_id: result.id, tmdb_title: result.title || result.original_name, total_votes: count - 1 })
            })
            const resU = await fetch(`https://hulu3-kappa.vercel.app/api/users/${useractivity._id}`, {
                method: 'PUT',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id: userInfo.uid, user_movie_id: result.id, vote: false })
            })

        } catch (error) {
            console.log(error);
        }

        setLiked(prevLiked => false)
    }

    return (
        <div ref={ref} className='p-2 group cursor-pointer transition duration-200 ease-in transform sm:hover:scale-105 hover:z-50'>
            <Image
                layout='responsive'
                src={
                    `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
                    `${BASE_URL}${result.poster_path}`
                }
                alt=""
                height={1080}
                width={1920}
            />

            <div className='p-2'>
                <p className='truncate max-w-md'>{result.overview}</p>
                <h2 className='mt-1 text-2xl text-white transition-all duration-100 ease-in-out group-hover:font-bold'>
                    {result.title || result.original_name}</h2>
                <p className='flex items-center opacity-0 group-hover:opacity-100'>
                    {result.media_type && `${result.media_type} ~`}{" "}
                    {result.release_date || result.first_air_date} ~{" "}
                    {hasLiked === false ?
                        (
                            <ThumbUpIcon className="h-5 mx-2" onClick={increaseCount} />
                        )
                        :
                        (
                            <ThumbDownIcon className="h-5 mx-2" onClick={decreaseCount} />
                        )
                    }
                    {count}
                </p>
            </div>
        </div>
    )
})
Thumbnail.displayName = 'MyThumbnail'

export default Thumbnail