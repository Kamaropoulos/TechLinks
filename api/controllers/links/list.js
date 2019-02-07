module.exports = function (req, res) {
  Links.find({}).sort({ 'createdAt': -1 }).exec(function (err, links) {
    if (err) {
      res.send(500, { error: "DB Error" });
    }
    res.view('pages/list', { links: links });
  })
}