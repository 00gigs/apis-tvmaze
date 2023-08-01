"use strict";

const TVMAZE_API_URL = "http://api.tvmaze.com/";

const $searchForm = $("#searchForm");

async function getShowsByTerm(word) {
  const response = await axios({
    baseURL: TVMAZE_API_URL,
    url: "search/shows",
    method: "GET",
    params: {
      q: word
    }
    ,
  });

  

  return response.data.map(result => {
    const show = result.show;
    console.log(show.id,show.name,show.summary)
    return {
      id: show.id,
      // name: show.name,
      // summary: show.summary,
      // image: show.image ? show.image.medium : MISSING_IMAGE_URL,
    };
  });
 
}

async function searchForShowAndDisplay() {
  const word = $("#searchForm-term").val();
  const shows = await getShowsByTerm(word);

  // $episodesArea.hide();
  // populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});
