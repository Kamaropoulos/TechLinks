module.exports = function (req, res) {
  var id = req.query.id;
  Links.findOne({ _id: id }).exec(function (err, link) {
    if (err) {
      res.send(500, { error: "DB Error" });
    }
    var newClicks = link.clicks + 1;
    res.redirect(link.url);
    Links.update({ _id: id }).set({ clicks: newClicks }).then(function () {
      // console.log("Done");
    });
  })
}