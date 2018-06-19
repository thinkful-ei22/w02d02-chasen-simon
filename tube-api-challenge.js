'use strict'; 

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(searchTerm, callback){
  const query = {
    q: `${searchTerm}`,
    key: 'AIzaSyDdjaDtO9Q7xxkeLIWSnCXnyY4TFGwsuWs',
    part: 'snippet',
    per_page: 5
  };
  $.getJSON(YOUTUBE_URL,query,callback);
}

let test = function(){
    console.log('alala');
}

console.log(getDataFromApi('a', test));
// function renderResults(result){



