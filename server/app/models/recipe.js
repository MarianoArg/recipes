const mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const Schema = mongoose.Schema;
const elasticsearch = require('elasticsearch');

const client = new elasticsearch.Client({
    host: '127.0.0.1:9200',
    log : 'trace'
})
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});
const RecipeSchema = new Schema({
    etag: String,
    kind: String,
    videoID: String,
    channelId: String,
    channelTitle: {
        type: String,
        es_indexed:true
    },
    title: {
        type: String,
        es_indexed:true
    },
    tags: {
        type: Object,
        es_indexed:true
    },
    description: {
        type: String,
        es_indexed:true
    },
    categoryId: String,
    thumbnails: Object,
    publishedAt: String,
    defaultLanguage: String,
    defaultAudioLanguage: String,
    liveBroadcastContent: String,
    localized: Object
});

RecipeSchema.plugin(mongoosastic, {
    esClient: client,
    hydrate:true,
    bulk: {}
});

module.exports = mongoose.model('Recipe', RecipeSchema);
