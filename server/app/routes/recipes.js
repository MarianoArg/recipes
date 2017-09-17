const express = require('express');
const Recipe = require('../models/recipe');
const router = express.Router();
const app = express();

    Recipe.on('es-indexed', function (err, res) {
    console.log('model added to es index');
});
    Recipe.indexFiles = function () {
    console.log('[ElasticSearch] Start indexing documents');

    var stream = Recipe.synchronize();
    var count = 0;

    stream.on('data', function (err, doc) {
      count++;
    });
    stream.on('close', function () {
      console.log('[ElasticSearch] Indexed ' + count + 'documents!');
    });
    stream.on('error', function (err) {
      console.log('mongoosastic ERROR');
      console.log(err);
    });
  };
  // Recipe.indexFiles();
router.get('/', (req, res)=> {
    res.json({messag: 'API version v0.1'});
})

router.route('/recipes/')
    // .post((req, res) => {
    //     let recipe = new Recipe();
    //     recipe.name = req.body.name;

    //     recipe.save((err)=> {
    //         if(err) {
    //             res.send(err);
    //         }

    //         res.json({message: 'recipe created'})
    //     });
    // })
    .delete((req, res) => {
        Recipe.remove({}, (err, recipe) => {
            if(err) {
                res.send(err);
            }

            res.json({ message: 'Successfully deleted'});
        })
    })

    .get((req, res)=> {
        Recipe.find((err, recipes)=> {
            if(err) {
                res.send(err);
            }

            res.json({'Amount': recipes.length, recipes:recipes});
        })
        .limit( 9 );
    });

// router.route('/recipes/:recipe_id')
//     .get((req, res) => {

//         Recipe.findById(req.params.recipe_id, (err, recipe) => {
//             if(err) {
//                 res.send(err);
//             }
//             res.json(recipe);
//         });
//     })

    // .put((req, res) => {
    //     Recipe.findById(req.params.recipe_id, (err, recipe) => {
    //          if(err) {
    //             res.send(err);
    //         }

    //         recipe.name = req.body.name;

    //         recipe.save((err)=> {
    //             if(err){
    //                 res.send(err);
    //             }

    //             res.json({message: 'Recipe updated!'});
    //         })
    //     });
    // })

    // .delete((req, res) => {
    //     Recipe.remove({
    //         _id: req.params.recipe_id
    //     }, (err, recipe) => {
    //         if(err) {
    //             res.send(err);
    //         }

    //         res.json({ message: 'Successfully deleted'});
    //     })
    // })
router.route('/recipes/channel/:channel_id')
    .get((req, res)=> {
        Recipe.find({'channelId': req.params.channel_id}, (err, recipes)=>{
            if(err) {
                res.send(err)
            }
            res.json(recipes);
        });
    })
router.route('/recipes/recipe/_search')
    .get((req, res) => {
        Recipe.search({
                        multi_match: {
                            query: req.query.q,
                            fields: ['title', 'tags', 'description']
                        }
        },(err, recipes)=> {
                 if(err) {
                    res.json({error: err})
                }
                res.json({recipes: recipes.hits.hits});
            });

    })
module.exports = router;
