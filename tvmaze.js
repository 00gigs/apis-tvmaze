// return a request via user search 
"use strict";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const TVMAZE_API_URL = "http://api.tvmaze.com/";
const episodesArea = ('#episodesArea')


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


  return res.data.map(result =>{
    const show = result.show
    return{
      id:show.id,
      name:show.name,
      summary:show.summary,
      image:show.image ? show.image.medium : MISSING_IMAGE_URL
    }
  })
}



  




// // add show images 
const showlist = $('#showsList')

function displayShow(shows) {

  for(let show of shows){
    const showinfo = $(`
    <div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
           <div class="media">
             <img src="${show.image}" alt="${show.name}" class="w-25 me-3">
             <div class="media-body">
               <h5 class="text-primary">${show.name}</h5>
               <div><small>${show.summary}</small></div>
               <button class="btn btn-outline-light btn-sm Show-getEpisodes">
                 Episodes
               </button>
             </div>
           </div>
        </div>
    `)
    showlist.append(showinfo)
  }
}


// passes form submission imput into function searchShowsTerm()
async function searchForShowAndDisplay() {
  const search = $("#searchForm-term").val();
  const shows = await searchShowsTerm(search);

  
  displayShow(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


//display episodes

