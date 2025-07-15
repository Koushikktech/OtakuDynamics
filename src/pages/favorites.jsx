import { useAnimeContext } from "../contexts/animecontext";
import Animecard from "../components/anime_card";
import "../css/home.css";

function Favorite() {
  const { favorites } = useAnimeContext();

  if (favorites && favorites.length > 0) {
    return (
      <div className="anime-grid">
        {favorites.map((anime) => (
          <Animecard key={anime.id} anime={anime} />
        ))}
      </div>
    );
  }
  return (
    <div className="Favorites-Empty">
      <h3>No Favorites yet....</h3>
    </div>
  );
}

export default Favorite;
