'use strict'; 
/* global $ */

const API_KEY = 'AIzaSyDdjaDtO9Q7xxkeLIWSnCXnyY4TFGwsuWs';

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

const getDataFromApi = function(searchTerm, callback) {
  const query = {
    q: searchTerm,
    key: API_KEY,
    part: 'snippet',
    maxResults: 25,
  };
  $.getJSON(YOUTUBE_URL,query, callback);
};

const renderResults = function(result){
  const youtubePrefix = 'https://www.youtube.com/watch?v=';
  return `
    <div>
      <a class="js-result-name" href="${youtubePrefix}${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
      <p><img src="${result.snippet.thumbnails.medium.url}" alt="IMAGE"></p>
    </div>
   `;
  // <div id="myModal" class="modal">
  //   <iframe width="560" height="315" src="${youtubePrefix}${result.id.videoId}" frameborder="0" allowfullscreen></iframe>
  //   <span class="close cursor" onclick="closeModal()">&times;</span>
  // </div>
};

const store = {
  arr: [],
};

const displayYoutubeSearchData = function(data) {
  console.log(data);
  const youtubePrefix = 'https://www.youtube.com/watch?v=';
  const results = data.items.map((item) => renderResults(item));

  const storeItems = data.items.map( (item) => console.log(item));

  $('.js-search-results').html(results);
  
  console.log(storeItems);
  
};

// const thumbnailClick = function(){
//   $('.js-search-results').on('click', 'p', event => {
//     const youtubePrefix = 'https://www.youtube.com/watch?v=';

//     return `
//     <video width="320" height="240" controls> 
//       <source src="   need to be able to access videoId  ">
//     </video>
//     `;
//     // $('html').getElementById('img').style.display = 'block';
//   });
// };

const watchSubmit = function() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, displayYoutubeSearchData);
  });
};


const runFunction = function(){
  // thumbnailClick();
  watchSubmit();
}

$(runFunction);



