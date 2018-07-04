var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Lab = require('../models/lab');
var passport = require('passport');
var Reservation = require('../models/resavation');
const jwt = require('jsonwebtoken');

/* GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/
router.post('/register', function (req, res, next) {
    addToDB(req, res);
});
async function addToDB(req, res) {
    var user = new User({
        email: req.body.email,
        username: req.body.username,
        password:req.body.password,
        creation_dt: Date.now()
    });
    try {
        doc = await user.save();
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
}

router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return res.status(501).json(err); }
        if (!user) { return res.status(501).json(info); }
        req.logIn(user, function (err) {
            if (err) { return res.status(501).json(err); }
            else {
                let payload = { subject: User._id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({ token });
            }
            
        });
    })(req, res, next);
});
/*router.post('/login', function (req, res) {
    var username = req.body.email;
    var password = req.body.password;

    User.findOne({ email: username, password: password }, function (err, user) {
        if (err) {
            console.log(err);
            return res.status(500).send();
        }
        if (!user) {
            return res.status(404).send();
        }
        req.session.user = user;
        console.log(user);
        return res.status(200).send();
    })
})*/

router.get('/getlabs', isValidUser, function (req, res) {
    //const user_id = req.user.user_id;
    
    Lab.find({}, (err, labs) => {
        res.json(labs)
    })
    
})

router.get('/logout', function (req, res, next) {
    req.logout();
    return res.status(200).json({ message: 'Logout Success' });
})

/*router.post('/reservation', function (req, res, next) {
    
    var reservation = new Reservation({
        //user_id : user._id,
        lab_name: req.body.lab_name,
        res_date: req.body.date,
        in_time: req.body.in_time,
        out_time: req.body.out_time,
        reason: req.body.reason,
        
    });
   // console.log(reservation);
    try {
        doc = reservation.save();
        return res.status(201).json(doc);
    }
    catch (err) {
        return res.status(501).json(err);
    }
    //console.log("btjt");
})*/

router.post('/resavation_checkbydate', function (req, res, next) {
    //console.log(req.params.id);

    var reservation = new Reservation({
        lab_name: req.body.lab_name,
        res_date: req.body.date
    });

    //Reservation.where("res_date" , "lab_name").equals(reservation.res_date, reservation.lab_name)
    Reservation.find({ res_date: reservation.res_date, lab_name: reservation.lab_name })
        .then(doc => {
        if (!doc) { return res.status(404).end(); }
        console.log(doc);
    return res.status(200).json(doc);

})
.catch(err => next(err));
    
    
})

router.get('/labs/:seat', function (req, res, next) {
    console.log(req.params.seat);
    Lab.where("seat").equals(req.params.seat)
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            //console.log(doc);
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
})

router.get('/typelabs/:type', function (req, res, next) {
    console.log(req.params.type);
    Lab.where("Type").equals(req.params.type)
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            //console.log(doc);
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
})

router.get('/conlabs/:type', function (req, res, next) {
    console.log(req.params.type);
    Lab.where("condition").equals(req.params.type)
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            //console.log(doc);
            return res.status(200).json(doc);
        })
        .catch(err => next(err));
})

router.post('/get_details', function (req, res, next) {
    var reservation = new Reservation({
        lab_name: req.body.lab_name,
        res_date: req.body.date,
    });

    //Reservation.where("res_date" , "lab_name").equals(reservation.res_date, reservation.lab_name)
    Reservation.find({ res_date: reservation.res_date, lab_name: reservation.lab_name })
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            return res.status(200).json(doc);
        })
        .catch(err => next(err));




})

router.post('/reservation', function (req, res, next) {
    //const user_id = req._id;
    console.log(req.user.username);
    var reservation = new Reservation({
        username: req.user.username,
        lab_name: req.body.lab_name,
        res_date: req.body.date,
        //in_time: req.body.in_time,
        //out_time: req.body.out_time,
        time: req.body.time,
        reason: req.body.reason,

    });
    console.log(reservation);
    try{
        Reservation.find({lab_name:reservation.lab_name,res_date:reservation.res_date,time:reservation.time},function (err,docs) {
            if(!docs.length){
                doc = reservation.save();
                // console.log(reservation);
                return res.status(201).json(doc);
            }
            else{
                return res.status(301).json(err);
            }

        })

    } catch (err) {
        return res.status(501).json(err);
    }
    /*gap = parseInt(reservation.out_time) - parseInt(reservation.in_time);
    
    
    try {
        
        Reservation.find({ lab_name: reservation.lab_name, res_date: reservation.res_date, in_time: reservation.in_time }, function (err, docs) {
             var done_reservation = 0;
            if (!docs.length) {
                if (gap > 1) {
                    var le = 1;
                    for (i = 1; i < gap; i++) {
                        timeree = parseInt(reservation.in_time) + i;

                        if (timeree < 10) {
                            timere = "0" + timeree.toString() + ":00";
                        } else {
                            timere = timeree.toString() + ":00";
                        }

                        console.log(timere);
                        Reservation.find({ lab_name: reservation.lab_name, res_date: reservation.res_date, in_time: timere.toString() }, function (err, docs1) {
                            if (!docs1.length) {

                                le = le + 1;
                                console.log(le);
                                console.log(gap);
                                if (le == gap) {
                                    try {
                                        doc = reservation.save();
                                      // console.log(reservation);
                                        return res.status(201).json(doc);
                                        
                                    }
                                    catch (err) {
                                        return res.status(501).json(err);
                                    }
                                }
                                else {
                                    return res.status(301).json(err);
                                    //console.log("bbb");
                                }


                            }
                            else {
                                return res.status(301).json(err);
                                //console.log("asd");
                            }



                        })
                    }
                } else {
                    Reservation.find({ lab_name: reservation.lab_name, res_date: reservation.res_date, out_time: reservation.out_time }, function (err, docs2) {
                        if (docs2.length) {
                            return res.status(301).json(err);
                            //console.log("asddd");
                        }
                        else {
                            try {
                                doc = reservation.save();
                                // console.log(reservation);
                                return res.status(201).json(doc);
                                
                            }
                            catch (err) {
                                return res.status(501).json(err);
                            }
                        }
                    })
                    
                }
                
               
            } else {
               
                //console.log("DDDDDDD");
                return res.status(301).json(err);

            }
        })
       
    }
    catch (err) {
        return res.status(501).json(err);
    }*/
    

    
})



router.post('/check', function (req, res, next) {

    var reservation = new Reservation({
        user_id: req.user.id,
        lab_name: req.body.lab_name,
        res_date: req.body.date,
        //in_time: req.body.in_time,
        //out_time: req.body.out_time,
        time: req.body.time,
        reason: req.body.reason,

    });
    console.log(reservation);


    try {
        Reservation.find({lab_name:reservation.lab_name,res_date:reservation.res_date,time:reservation.time},function (err,docs) {
            if(!docs.length){
                //doc = reservation.save();
                // console.log(reservation);
                return res.status(201).json();
            }
            else{
                return res.status(301).json(err);
            }

        })
        /*Reservation.find({ lab_name: reservation.lab_name, res_date: reservation.res_date, time: reservation.time }, function (err, docs) {
            var done_reservation = 0;
            if (!docs.length) {
                if (gap > 1) {
                    var le = 1;
                    for (i = 1; i < gap; i++) {
                        timeree = parseInt(reservation.in_time) + i;

                        if (timeree < 10) {
                            timere = "0" + timeree.toString() + ":00";
                        } else {
                            timere = timeree.toString() + ":00";
                        }

                        console.log(timere);
                        Reservation.find({ lab_name: reservation.lab_name, res_date: reservation.res_date, in_time: timere.toString() }, function (err, docs1) {
                            if (!docs1.length) {

                                le = le + 1;
                                console.log(le);
                                console.log(gap);
                                if (le == gap) {
                                    try {
                                       // doc = reservation.save();
                                        return res.status(201).json();
                                    }
                                    catch (err) {
                                        return res.status(501).json(err);
                                    }
                                }
                                else {

                                    //console.log("bbb");
                                    return res.status(301).json(err);
                                }


                            }
                            else {
                                //console.log("asd");
                                return res.status(301).json(err);
                            }



                        })
                    }
                } else {
                    Reservation.find({ lab_name: reservation.lab_name, res_date: reservation.res_date, out_time: reservation.out_time }, function (err, docs2) {
                        if (docs2.length) {
                            //console.log("asddd");
                            return res.status(301).json(err);
                        }
                        else {
                            try {
                                //doc = reservation.save();
                                return res.status(201).json();
                            }
                            catch (err) {
                                return res.status(501).json(err);
                            }
                        }
                    })

                }


            } else {

                //console.log("DDDDDDD");
                return res.status(301).json(err);

            }
        })*/

    }
    catch (err) {
        return res.status(501).json(err);
    }



})


function isValidUser(req, res, next) {
    if (req.isAuthenticated()) next();
    else return res.status(401).json({ message: 'Unauthorized Request' });
}

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}


module.exports = router;
