import { useUser } from "../contexts/UserContext.jsx";
import Animecard from "../components/AnimeCard";
import "../css/Home.css";

function Favorite() {
  const { favorites } = useUser();

  if (favorites && favorites.length > 0) {
    return (
      <>
        <img src="/rem.png" alt="" className="rem" />
        <div className="anime-grid">
          {favorites.map((anime) => (
            <Animecard key={anime.id} anime={anime} />
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="Favorites-Empty">
      <img src="/rem.png" alt="" className="rem" />
      <h3>No Animes in Favorites yet...</h3>
    </div>
  );
}

export default Favorite;
