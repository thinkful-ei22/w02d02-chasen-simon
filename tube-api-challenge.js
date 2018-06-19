'use strict'; 
/* global $ */

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    key: 'AIzaSyDdjaDtO9Q7xxkeLIWSnCXnyY4TFGwsuWs',
    part: 'snippet',
    maxResults: 25
  };
  $.getJSON(YOUTUBE_URL,query,(response) => {
    console.log(response);
  });
}


// let test = function(){
//   console.log('alala');
// };

console.log(getDataFromApi('soccer'));
// function renderResults(result){



