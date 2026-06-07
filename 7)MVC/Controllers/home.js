exports.addHome=(req, res, next) => {
  res.render('addHome', {pageTitle: 'Add Home to airbnb'});
}

const Home = require("../Models/home");

exports.postHome=(req, res, next) => {
  console.log('Home Registration successful for:', req.body, req.body.houseName);
  const home = new Home(req.body.houseName, req.body.price, req.body.location).save();
  
  res.render('homeAdded', {pageTitle: 'Home Added Successfully'});
}

exports.gethome= (req, res, next) => {
  const registeredHomes = Home.fetchAll();
  console.log(registeredHomes);
  res.render('home', {registeredHomes: registeredHomes, pageTitle: 'airbnb Home'});
}

