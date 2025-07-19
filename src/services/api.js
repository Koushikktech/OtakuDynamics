// src/services/api.js
export const fetchPopularAnimes = async () => {
  const query = `
    query {
      Page(page: 1, perPage: 20) {
        media(type: ANIME, sort: POPULARITY_DESC) {
          id
          title {
            romaji
            english
          }
          startDate {
            year
          }
          coverImage {
            large
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query }),
    });

    const json = await response.json();
    return json.data.Page.media;
  } catch (error) {
    console.error("Fetch failed:", error);
    return [];
  }
};

export const searchAnimes = async (searchQuery, page) => {
  const query = `
    query ($search: String, $page: Int) {
      Page(page: $page, perPage: 20) {
        pageInfo {
          total
          currentPage
          lastPage
          hasNextPage
        }
        media(type: ANIME, search: $search) {
          id
          title {
            romaji
            english
          }
          startDate {
            year
          }
          coverImage {
            large
          }
        }
      }
    }
  `;
  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: { search: searchQuery } }),
    });
    const json = await response.json();
    return json.data.Page.media;
  } catch (error) {
    console.error("Search failed:", error);
    return [];
  }
};

export const getAnimeInfo = async (animeId) => {
  const query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        title {
          romaji
          english
        }
        description
        coverImage {
          large
        }
        genres
        startDate {
          year
          month
          day
        }
        endDate {
          year
          month
          day
        }
        episodes
        averageScore
        status
        nextAiringEpisode {
          episode
          airingAt
          timeUntilAiring
        }
      }
    }
  `;

  try {
    const response = await fetch("https://graphql.anilist.co", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables: { id: animeId } }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();

    if (json.errors) {
      throw new Error(json.errors[0].message);
    }

    return json.data.Media;
  } catch (error) {
    console.error("Info Retrieval failed:", error);
    throw error;
  }
};
