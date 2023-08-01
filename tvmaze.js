// return a request via user search 
"use strict";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "http://api.tvmaze.com/";



const $searchForm = $("#searchForm");
async function searchShowsTerm(search){
  const res = await axios({
    baseURL:TVMAZE_API_URL,
    method:'GET',
    url:'search/shows',
    params:{
      q:search
    }
  })
}


async function searchForShowAndDisplay() {
  const search = $("#searchForm-term").val();
  const shows = await searchShowsTerm(search);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});
