var router = require('express').Router();
var pool = require('../modules/pool');

router.get('/', function(req, res){
    console.log('get koalas route');
    pool.connect(function(error, client, done){
        if(error){
            console.log(error);
            res.sendStatus(500);
        }else{
            client.query('SELECT * FROM Koala_Holla', function(queryError, resultObj){
                done();
                if (queryError){
                    console.log(queryError);
                    res.sendStatus(500);
                }else{
                    console.log(resultObj.rows);
                    res.send(resultObj.rows);
                }
            });
        
        }
    });
});

router.post('/', function(req, res){
    var koalaItem = req.body
    console.log('in post koala route', koalaItem );

    pool.connect(function(error, client, done) {
       
        if(error) {
            console.lot(error);
            res.sendStatus(500);
        } else {
            var queryString = 'INSERT INTO Koala_Holla (koala_name, age, gender, transferable, notes) VALUES ($1, $2, $3, $4, $5);';
            var values = [koalaItem.koala_name, koalaItem.age, koalaItem.gender, koalaItem.transferable, koalaItem.notes];
            client.query(queryString, values, function(queryError, resultObj) {
                done();
                if(queryError) {
                    console.log(queryError);
                    res.sendStatus(500);
                    } else {
                        res.sendStatus(200);
                    }
                });
            }  
        });
    });    
router.delete('/:id', function(req,res) {
    console.log('in delete route');
    console.log('req.params.id', req.params.id)
    var koalaId = req.params.id
    
    pool.connect(function(error, client, done) {
        
         if(error) {
             console.lot(error);
             res.sendStatus(500);
         } else {
             var queryString = 'DELETE FROM Koala_Holla WHERE id=$1;'[koalaId];
             client.query(queryString, values, function(queryError, resultObj) {
                 done();
                 if(queryError) {
                     console.log(queryError);
                     res.sendStatus(500);
                     } else {
                         res.sendStatus(200);
                     }
                })
            }
        })
    });  

module.exports = router;