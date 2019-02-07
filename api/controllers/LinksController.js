/**
 * LinksController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    list: function (req, res) {
        Links.find({}).sort({'createdAt': -1}).exec(function(err, links){
            if (err){
                res.send(500, {error: "DB Error"});
            }
            res.view('list', {links:links});
        })
    },
    add: function(req, res){
        res.view('add');
    },
    create: function(req, res){
        var title = req.body.title;
        var url = req.body.url;

        Links.create({title:title, url:url}).exec(function (err) {
            if (err){
                res.send(500, {error: 'DB Error'});
            }

            res.redirect('/links/list');
        })
    },
    out: function(req, res){
        var id = req.query.id;
        Links.findOne({_id: id}).exec(function(err, link){
            if (err){
                res.send(500, {error: "DB Error"});
            }
            var newClicks = link.clicks + 1;
            res.redirect(link.url);
            Links.update({_id: id}).set({clicks: newClicks}).then(function(){
                // console.log("Done");
            });
        })
    }
};

