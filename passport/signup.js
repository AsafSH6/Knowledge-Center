var LocalStrategy   = require('passport-local').Strategy;
var User = require('../DB/models').User;
var models = require('../DB/models');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

    passport.use('signup', new LocalStrategy({
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) {
                console.log(username)
                console.log(password)
                console.log(req.param('email'))
                console.log(req.param('firstName'))
                console.log(req.param('lastName'))
                findOrCreateUser = function(){
                    // find a user in Mongo with provided username
                    User.findOne({ 'username' :  username }, function(err, user) {
                        // In case of any error, return using the done method
                        if (err){
                            console.log('Error in SignUp: '+err);
                            return done(err);
                        }
                        // already exists
                        if (user) {
                            console.log('User already exists with username: '+username);
                            return done(null, false, req.flash('message','User Already Exists'));
                        } else {
                            // if there is no user with that email
                            // create the user
                            models.Image.findById(req.body.imageId, function(err, image) {
                                var newUser = new User({
                                    username: username,
                                    password: createHash(password),
                                    email: req.body.email,
                                    firstName: req.body.firstName,
                                    lastName: req.body.lastName,
                                    street_addr: req.body.street_addr,
                                    city_addr: req.body.city_addr,
                                    profile_image: image,
                                });
                                newUser.save(function(err) {
                                    if (err){
                                        console.log('Error in Saving user: '+err);
                                        throw err;
                                    }
                                    console.log('User Registration succesful');
                                    return done(null, newUser);
                                });
                            })
                        }
                    });
                };
                // Delay the execution of findOrCreateUser and execute the method
                // in the next tick of the event loop
                process.nextTick(findOrCreateUser);
            })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }
}