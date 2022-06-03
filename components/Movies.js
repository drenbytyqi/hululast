
import fetch from 'isomorphic-unfetch';

const Movies = ({ movies }) => {
    console.log(movies)
    return (
        <div>dreni
        </div>
    )
}

Movies.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/movies');
    const { data } = await res.json();
  
    return { movies: data }
}
  
export default Movies;