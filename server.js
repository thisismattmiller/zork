// server.js
// where your node app starts

// init project
const express = require('express');
var ejs = require('ejs');

const zorkData = require('./data');
const tells = [];
const jigs = [];

zorkData.forEach((d)=>{
  if (d.type==='tell'){
    tells.push(d)
  }else{
    jigs.push(d)
  }
})

const app = express();

app.set('view engine', 'ejs');


// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get(['/','/tell/'], function(request, response) {  
  
  // pick a random one
  var randomID = Math.floor(Math.random() * Math.floor(tells.length));
  
  response.redirect('/tell/'+tells[randomID].id);


  
  
  
});
app.get(['/jigs-up/'], function(request, response) {  
  
  // pick a random one
  var randomID = Math.floor(Math.random() * Math.floor(jigs.length));
  
  response.redirect('/jigs-up/'+jigs[randomID].id);


  
  
  
});

app.get('/jigs-up/:id', function(request, response) {  
  
  // pick a random one
  var use = null;
  for (let x=0; x<jigs.length;x++){
    use = jigs[x];
    if (use.id==parseInt(request.params.id)){
      break 
    }
    
  }
  
  use.mode='jig';
  
  use.url  = `https://github.com/historicalsource/zork${use.zork}/blob/master/${use.zork}actions.zil#L${use.line}`
  
  response.render('show', {data:use});
  
  
  
});

app.get('/tell/:id', function(request, response) {  
  
  // pick a random one
  var use = null;
  for (let x=0; x<tells.length;x++){
    use = tells[x];
    if (use.id==parseInt(request.params.id)){
      break 
    }
    
  }
  
  use.mode='tell';
  
  use.url  = `https://github.com/historicalsource/zork${use.zork}/blob/master/${use.zork}actions.zil#L${use.line}`
  
  response.render('show', {data:use});
  
  
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
