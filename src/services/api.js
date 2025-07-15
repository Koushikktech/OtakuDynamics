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

export const searchAnimes = async (searchQuery) => {
  const query = `
    query ($search: String) {
      Page(page: 1, perPage: 20) {
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
