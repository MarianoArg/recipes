const Recipe = require('../models/recipe');
const google = require('googleapis');
const service = google.youtube('v3');
const API_KEY = 'AIzaSyAyodZiMJTKgAMP513jOaooXAV9fdRUd_E';
const CHANNELS = {
    tastemadeEspanish: 'UCFVQMp9mG0pklc9yxFCgB1w',
    locosxelasado: 'UCMb_jTYA_oFqJVJneNUH0Zg'
};


let videos = [];
let channelsIds = [];

let channelsIndex = 0;
let videosIndex = 0;

for(let channel in CHANNELS) {
    channelsIds.push(CHANNELS[channel]);
}

const searchList = (channel = '', pageToken = '') => new Promise((resolve, reject) => {
     service.search.list({
        part: 'snippet',
        maxResults: 50,
        type: 'video',
        key: API_KEY,
        channelId: channel,
        pageToken: pageToken
    }, (err, response) => {
        if (err) {
          reject(err);
          return;
      }
      response.items.map(item =>{
         videos.push(item.id.videoId);
      });

      if(response.nextPageToken) {
        searchList(channel, response.nextPageToken)
        .then(() => resolve())
      } else {
        resolve()
      }
    });
});

const getSearchList = (index = 0) => new Promise((resolve, reject) =>{
    searchList(channelsIds[index])
    .then(() => {
        if(channelsIds[index+1]) {
            getSearchList(index+1)
       } else {
            resolve();
       }
    })
    .catch(err => {
        console.log('The API returned an error: ' + err);
    })
})
.then(() => {
    getVideo(videos[videosIndex]);
})

const getVideo= (videoId) => new Promise((resolve, reject) => {
    service.videos.list({
        part: 'snippet',
        key: API_KEY,
        id: videoId
    },(err, response)=> {
         if (err) {
              reject(err);
              return;
          }
          resolve(response);
    });
})
.then(response => {
    FILL_DB(response.items[0]);
    if(videos[videosIndex+1]) {
        getVideo(videos[videosIndex+1])
        videosIndex++
    }
})
.catch(err => {
        console.log('The API returned an error: ' + err);
})


// .then(mainReponse => Promise.all(mainReponse.items.map(item => requestVideo(item.id.videoId))))

const FILL_DB = (video) => {
     const query = Recipe.where({videoID: video.id});
     query.findOne((err, results) => {
        if(results === null) {
            const recipe = new Recipe({
                etag: video.etag,
                kind: video.kind,
                videoID: video.id,
                channelId: video.snippet.channelId,
                channelTitle: video.snippet.channelTitle,
                title: video.snippet.title,
                tags: video.snippet.tags,
                description: video.snippet.description,
                categoryId: video.snippet.categoryId,
                thumbnails: video.snippet.thumbnails,
                publishedAt: video.snippet.publishedAt,
                defaultLanguage: video.snippet.defaultLanguage,
                defaultAudioLanguage: video.snippet.defaultAudioLanguage,
                liveBroadcastContent: video.snippet.liveBroadcastContent,
                localized: video.snippet.localized
            });

            recipe.save((err) => {
                if(err) console.log(err)
            });
        }
        if(err) {
            // console.log(err);
        }
    });
};

const fetchYoutube = ()=> {
    getSearchList();
}
module.exports = fetchYoutube;
