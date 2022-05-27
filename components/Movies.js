
import fetch from 'isomorphic-unfetch';


const Movies = ({ notes }) => {
    console.log(notes)
    return (
        <div>flaka
            {/* {notes.map(m => {
                <p>
                    {m.title}
                </p>
            })} */}
        </div>
    )
}

Movies.getInitialProps = async () => {
    const res = await fetch('http://localhost:3000/api/notes');
    const { data } = await res.json();
  
    return { notes: data }
}
  
export default Movies;