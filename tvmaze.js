"use strict";

const MISSING_IMAGE_URL = "https://tinyurl.com/missing-tv";
const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const searchInput = document.querySelector("input")

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
	const url = `https://api.tvmaze.com/search/shows?q=${term}`;
	const result = await axios.get(url);

	const shows = result.data
		.map((item) => item.show)
		.map((item) => {
			return {
				id: item.id,
				name: item.name,
				summary: item.summary,
				rating: item.rating,
				image: item.image ? item.image.medium : MISSING_IMAGE_URL,
			};
		});
    return shows;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
	$showsList.empty();

	for (let show of shows) {
		const $show = $(
			`<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src= ${show.image}
              alt="${show.name}"
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <div><small>${show.rating.average}/10 rating</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `
		);

		$showsList.append($show);
	}
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
	const term = searchInput.value;
	const shows = await getShowsByTerm(term);

	// $episodesArea.hide();
	populateShows(shows);
}

$searchForm.on("submit", async function(e) {
	e.preventDefault();
	await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
