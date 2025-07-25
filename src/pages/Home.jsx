import { useState, useEffect, useCallback } from "react";
import Animecard from "../components/AnimeCard.jsx";
import { fetchPopularAnimes, searchAnimes } from "../services/api.js";
import "../css/Home.css";
import debounce from "lodash.debounce";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPopularAnimes().then((data) => {
      setAnimes(data);
      setLoading(false);
    });
  }, []);

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      const trimmedQuery = query.trim();

      if (trimmedQuery === "") {
        setLoading(true);
        fetchPopularAnimes().then((data) => {
          setAnimes(data);
          setLoading(false);
        });
      } else {
        setLoading(true);
        const results = await searchAnimes(trimmedQuery);
        console.log(results)
        setAnimes(results);
        setLoading(false);
      }
    }, 400),
    []
  );

  const Handlesearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") {
      setLoading(true);
      fetchPopularAnimes().then((data) => {
        setAnimes(data);
        setLoading(false);
      });
    } else {
      debouncedSearch(searchQuery);
    }
  };

  return (
    <div className="home">
      <form onSubmit={Handlesearch} className="search-form">
        <input
          type="text"
          placeholder="Search Anime"
          className="search-input"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            debouncedSearch(e.target.value);
          }}
        />
        <button type="submit" className="search-submit">
          <svg
            className="fill-icon-neutral"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.7407 10.5782C1.85599 8.69306 1.85599 5.62599 3.7407 3.7409C4.68325 2.79835 5.9211 2.32727 7.15933 2.32727C8.39718 2.32727 9.63503 2.79835 10.578 3.7409C12.4627 5.62561 12.4627 8.69228 10.5784 10.5774C10.578 10.5778 10.578 10.5778 10.5776 10.5782C10.5776 10.5785 10.5772 10.5785 10.5772 10.5789C8.69209 12.4625 5.62541 12.4629 3.7407 10.5782ZM17.6589 16.0127L12.9741 11.3282C14.9807 8.53125 14.7358 4.60661 12.224 2.09483C9.43169 -0.698277 4.88697 -0.698277 2.09425 2.09483C-0.698083 4.88717 -0.698083 9.4315 2.09425 12.2242C3.49042 13.6208 5.32507 14.3189 7.15933 14.3189C8.62457 14.3189 10.0859 13.8656 11.3277 12.9743L16.0125 17.6591C16.2399 17.8861 16.5379 17.9998 16.8359 17.9998C17.1335 17.9998 17.4315 17.8861 17.6589 17.6591C18.1137 17.2043 18.1137 16.4674 17.6589 16.0127Z"
              fillOpacity="0.87"
            ></path>
          </svg>
        </button>
      </form>
      <div className="anime-grid-container">
        {loading && (
          <div className="loading">
            <img
              src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><circle fill='%23FF156D' stroke='%23FF156D' stroke-width='15' r='15' cx='40' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.4'></animate></circle><circle fill='%23FF156D' stroke='%23FF156D' stroke-width='15' r='15' cx='100' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='-.2'></animate></circle><circle fill='%23FF156D' stroke='%23FF156D' stroke-width='15' r='15' cx='160' cy='100'><animate attributeName='opacity' calcMode='spline' dur='2' values='1;0;1;' keySplines='.5 0 .5 1;.5 0 .5 1' repeatCount='indefinite' begin='0'></animate></circle></svg>"
              alt="Loading..."
              width={100}
              height={60}
            />
          </div>
        )}
      </div>

      <div className="anime-grid">
      <img src="/ayanokoji.png" alt="" className="ayanokoji"/>
        {!loading &&
          animes.map((anime) => <Animecard key={anime.id} anime={anime} />)}
      </div>
    </div>
  );
}

export default Home;
