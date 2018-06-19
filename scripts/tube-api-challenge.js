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
      <h2>
      <a class="js-result-name" href="${youtubePrefix}${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
      <a class="js-result-name" href="${youtubePrefix}${result.id.videoId}" target="_blank"><p><img src="${result.snippet.thumbnails.medium.url}" alt="IMAGE"></p></a> 
    </div>
  `;
};

const displayYoutubeSearchData = function(data) {
  const results = data.items.map((item) => renderResults(item));
  $('.js-search-results').html(results);
};

const watchSubmit = function() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    console.log(query);
    getDataFromApi(query, displayYoutubeSearchData);
  });
};

$(watchSubmit);



