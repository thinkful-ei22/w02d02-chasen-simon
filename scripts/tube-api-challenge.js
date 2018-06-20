'use strict'; 
/* global $ */

const API_KEY = 'AIzaSyDdjaDtO9Q7xxkeLIWSnCXnyY4TFGwsuWs';

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

const getDataFromApi = function(searchTerm, callback) {
  const query = {
    q: searchTerm,
    key: API_KEY,
    part: 'snippet',
    maxResults: 5,
  };
  $.getJSON(YOUTUBE_URL,query, callback);
};

const renderResults = function(result){
  const youtubePrefix = 'https://www.youtube.com/watch?v=';
  return `
    <div>
      <a class="js-result-name" href="${youtubePrefix}${result.id.videoId}" target="_blank">${result.snippet.title}</a> 
      <img src="${result.snippet.thumbnails.medium.url}" alt="IMAGE" data-video-id='${result.id.videoId}'>
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
  $('.js-search-results').html(results);

  const indexItems = data.items.map((item) => {
    return {
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
    };
  });
  console.log(indexItems);
  
  
  // const indexItems = data.items.map((item) => {
  //   return item;
  // });
  // console.log(indexItems);
  // const storeItems = indexItems.map(index => {
  //   console.log(index);
  //   store.arr.push({
      
  // });
  
};



const thumbnailClick = function(){
  $('.js-search-results').on('click', 'img', event => {
    const youtubePrefix = 'https://www.youtube.com/embed/';
    const currentVidId = $(event.currentTarget).attr('data-video-id');
    $('.modal-content').html(`<iframe width="420" height="315" src="${youtubePrefix}${currentVidId}?autoplay=1"> </iframe>`);
    $('.modal').fadeIn();
  });
};

const modalExitClick = function(){
  $('.cursor').click(event => {
    console.log('modal exit ran');
    $('.modal').fadeOut();
    $('.modal-content').children('iframe').attr('src', '');
  });
};


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
  thumbnailClick();
  watchSubmit();
  modalExitClick();
};

$(runFunction);



