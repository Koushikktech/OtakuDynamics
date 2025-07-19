import { useState } from "react";
import AnimeInfo from "../components/AnimeInfo";
import { useUser } from "../contexts/UserContext";
import "../css/Watchlist.css";

function Completedlist({ anime }) {
  const [showAnimeInfo, setShowAnimeInfo] = useState(false);
  return (
    <>
      <AnimeInfo
        show={showAnimeInfo}
        onClose={() => setShowAnimeInfo(false)}
        animeId={anime.id}
      ></AnimeInfo>
      <div
        className="watchlist-card"
        onClick={() => {
          setShowAnimeInfo(true);
        }}
      >
        <div className="watchlist-poster">
          <img
            src={anime.coverImage?.large || anime.image}
            alt={anime.title?.english || anime.title?.romaji || anime.title}
          />
          <div className="watchlist-overlay"></div>
          <div className="watchlist-info">
            <p>{anime.title?.english || anime.title?.romaji || anime.title}</p>
            <p>{anime.startdate || anime.release_date}</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Watchlist() {
  const { completed } = useUser();
  console.log(completed);
  if (completed && completed.length > 0) {
    return (
      <>
        <img src="/ram.png" alt="" className="ram" />
        <div className="watchlist-grid">
          {completed.map((anime) => (
            <Completedlist key={anime.id} anime={anime} />
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="Favorites-Empty">
      <img src="/ram.png" alt="" className="ram" />
      <h3>No Animes in Watchlist yet...</h3>
    </div>
  );
}

export default Watchlist;
