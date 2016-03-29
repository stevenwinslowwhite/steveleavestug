exports.index = function(req, res) {
    res.render('hike', {title: 'My Hiking Log'});
};

exports.add_hike = function(req, res) {
};

exports.india = function(req, res) {
    res.render('hike', {title: 'INDIA!'});
};