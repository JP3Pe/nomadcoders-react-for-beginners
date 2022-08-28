import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    const movie = json.data.movie;
    // console.log(json.data.movie);
    setLoading(false);
    setMovie(movie);

    return movie;
  };

  useEffect(() => {
    getMovie();
  }, []);
  return loading ? (
    <h1>Loading..</h1>
  ) : (
    <div>
      <Movie
        key={movie.id}
        id={movie.id}
        coverImage={movie.medium_cover_image}
        title={movie.title}
        summary={movie.summary}
        genres={movie.genres}
      />
    </div>
  );
}

export default Detail;
