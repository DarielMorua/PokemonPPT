var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/jugar', function(req,res){
  const jugador1= req.body.eleccion;
  const jugador2= "piedra";
  
  if (jugador1 === jugador2) {
    res.send("Empate");
} else if (
    (jugador1 === "piedra" && jugador2 === "tijera") ||
    (jugador1 === "papel" && jugador2 === "piedra") ||
    (jugador1 === "tijera" && jugador2 === "papel")
) {
    res.send("Ganaste");
} else {
    res.send("Perdiste");
    console.log("Mandaste " + jugador1);
}
  

});


module.exports = router;