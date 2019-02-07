module.exports = function (req, res) {
  var title = req.body.title;
  var urlRaw = req.body.url;

  var url = (urlRaw.indexOf('://') === -1) ? 'http://' + urlRaw : urlRaw;

  console.log(url);

  Links.create({ title: title, url: url }).exec(function (err) {
    if (err) {
      res.send(500, { error: 'DB Error' });
    }

    res.redirect('/links/list');
  })
}