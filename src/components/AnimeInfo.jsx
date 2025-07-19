import "../css/Animeinfo.css";
import { getAnimeInfo } from "../services/api.js";
import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext.jsx";
import { useNavigate } from "react-router-dom";

function AnimeInfo({ show, onClose, children, animeId }) {
  const { removeCompleted, addToCompleted, completed, user } = useUser();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const isCompleted = completed.some(
    (completedAnime) => String(completedAnime.id) === String(animeId)
  );

  function handleCompletedAnime(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert("Please log in to add anime to WatchList");
      navigate("/login");
      return;
    }

    if (isCompleted) {
      const answer = confirm("Are you sure you want to remove the Anime?");
      if (answer) {
        removeCompleted(animeId);
      } else {
        return;
      }
    } else {
      const minimalAnime = {
        id: animeId,
        title: anime.title,
        coverImage: anime.coverImage,
        startdate: anime.startDate?.year || anime.release_date,
      };
      addToCompleted(minimalAnime);
    }
  }
  let timeUntil = "";
  const seconds = anime?.nextAiringEpisode?.timeUntilAiring;
  if (anime?.nextAiringEpisode?.timeUntilAiring != null) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const parts = [];
    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    timeUntil = parts.join(" ");
  }

  useEffect(() => {
    if (show && animeId) {
      setLoading(true);
      setError(null);
      getAnimeInfo(animeId)
        .then((data) => {
          setAnime(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch anime:", err);
          setError("Failed to load anime information");
          setLoading(false);
        });
    }
  }, [show, animeId]);

  if (!show) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div
        className="popup"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        {children}
        {loading && (
          <div className="animeinfo-loading">
            <img
              src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle fill='%23FF156D' stroke='%23FF156D' stroke-width='15' r='15' cx='40' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate></circle><circle fill='%23FF156D' stroke='%23FF156D' stroke-width='15' r='15' cx='100' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate></circle><circle fill='%23FF156D' stroke='%23FF156D' stroke-width='15' r='15' cx='160' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate></circle></svg>"
              alt="Loading..."
              width={100}
              height={60}
            />
          </div>
        )}
        {error && <p className="error">{error}</p>}
        {!loading && !error && (
          <div className="anime-info-wrapper">
            <div className="anime-info-vertical-wrapper">
              {anime && (
                <img
                  src={anime.coverImage.large}
                  alt={anime.title?.romaji || anime.title?.english}
                  className="anime-cover"
                ></img>
              )}
              <br />
              <div className="anime-information-wrapper">
                <br />
                {anime?.nextAiringEpisode && (
                  <p className="anime-airing">
                    Airing: <br />
                    Ep: {anime.nextAiringEpisode.episode} in {timeUntil}
                  </p>
                )}
                <div className="anime-information-div">
                  {anime && (
                    <p className="anime-information">
                      Status:{" "}
                      {anime.status.charAt(0).toUpperCase() +
                        anime.status.slice(1).toLowerCase()}
                    </p>
                  )}
                  {anime && (
                    <p className="anime-information">
                      Episodes: {anime.episodes || "N/A"}
                    </p>
                  )}
                  {anime && (
                    <p className="anime-information">
                      Start Date: {anime.startDate.day}-{anime.startDate.month}-
                      {anime.startDate.year}
                    </p>
                  )}
                  {anime && (
                    <p className="anime-information">
                      End Date: {anime.endDate.day}-{anime.endDate.month}-
                      {anime.endDate.year}
                    </p>
                  )}
                  {anime && (
                    <p className="anime-information">
                      Average Score: {anime.averageScore / 10}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="anime-info-title">
              <div className="title-completed">
                {anime && (
                  <h3 className="anime-title">
                    {anime.title?.english || anime.title?.romaji}
                  </h3>
                )}
                <button onClick={handleCompletedAnime} className="complete">
                  {isCompleted ? "Mark as Completed" : "Add to WatchList"}
                </button>
              </div>
              {anime && (
                <p className="anime-discription">{anime.description}</p>
              )}
              <br />
              {anime && (
                <p className="anime-genres">Genres: {anime.genres.join(" ")}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnimeInfo;
