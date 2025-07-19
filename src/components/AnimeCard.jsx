import "../css/Animecard.css";
import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AnimeInfo from "./AnimeInfo.jsx";
function Animecard({ anime }) {
  const { user, favorites, addToFavorites, removeFavorites } = useUser();
  const [showAnimeInfo, setShowAnimeInfo] = useState(false);
  const isFavorite = favorites.some((favAnime) => favAnime.id === anime.id);
  const navigate = useNavigate();

  function handleFavoriteToggle(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please log in to add anime to your favorites!");
      navigate("/login");
      return;
    }

    if (isFavorite) {
      removeFavorites(anime.id);
    } else {
      addToFavorites(anime);
    }
  }

  useEffect(() => {
    if (showAnimeInfo) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }, [showAnimeInfo]);

  return (
    <>
      <AnimeInfo
        show={showAnimeInfo}
        onClose={() => setShowAnimeInfo(false)}
        animeId={anime.id}
      ></AnimeInfo>
      <div
        className="anime-card"
        onClick={() => {
          setShowAnimeInfo(true);
        }}
      >
        <div className="anime-poster">
          <img
            src={anime.coverImage?.large || anime.image}
            alt={anime.title?.english || anime.title?.romaji}
          />
          <div className="anime-overlay">
            <button
              className={`Fav ${isFavorite ? "Fav-active" : ""}`}
              onClick={handleFavoriteToggle}
            >
              ❤︎
            </button>
          </div>
          <div className="anime-info">
            <p>{anime.title?.english || anime.title?.romaji}</p>
            <p>{anime.startDate?.year || anime.release_date}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Animecard;
