import "../css/Animecard.css";
import { useAnimeContext } from "../contexts/animecontext.jsx";

function Animecard({ anime }) {
  const { favorites, addFavorites, removeFavorites, isFavorites } =
    useAnimeContext();
  const favorite = isFavorites(anime.id);

  function fav(e) {
    e.preventDefault();
    if (favorite) {
      removeFavorites(anime.id);
    } else {
      addFavorites(anime);
    }
  }

  return (
    <div className="anime-card">
      <div className="anime-poster">
        <img
          src={anime.coverImage?.large || anime.image}
          alt={anime.title?.english || anime.title?.romaji || anime.title}
        />
        <div className="anime-overlay">
          <button
            className={`Fav ${favorite ? "Fav-active" : ""}`}
            onClick={fav}
          >
            ❤︎
          </button>
        </div>
        <div className="anime-info">
          <p>{anime.title?.english || anime.title?.romaji || anime.title}</p>
          <p>{anime.startDate?.year || anime.release_date}</p>
        </div>
      </div>
    </div>
  );
}

export default Animecard;
