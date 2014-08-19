var canvas, c, w, h,
    twoPI = Math.PI * 2,
    mX, mY,
    resize = true,
    nomousemove = true,
    per = { x: 0, y: 0 },
    mtn, trackmouse = false;

//window.onload = function(){
(function(){
  canvas = document.createElement('canvas'),
    w = canvas.width = window.innerWidth;
  h = canvas.height = 2280;
  c = canvas.getContext('2d');
  document.body.appendChild(canvas);
  
  //!resize || window.addEventListener('resize', function(e){ w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; });
  nomousemove || canvas.addEventListener('mousemove', function(e){
    trackmouse = true;
    mX = e.pageX-20; mY = e.pageY-20;
    per = { x: mX, y: mY };
  });
  
  mX = w/2;
  mY = w/2;
  
  per = { x: w/2, y: h/2, step: 1.2 }
  window.setInterval(animate, 60);
})();
  
  function newGradient(gradient){
    var grad;
    switch(gradient.type){
      case "radial":
        grad = c.createRadialGradient(gradient.x1, gradient.y1, gradient.r1, gradient.x1, gradient.y1, gradient.r2);
        break;
      case "linear":
        grad = c.createLinearGradient(gradient.x1, gradient.y1, gradient.x2, gradient.y2);
        break;
    }
    
    for(var i = 0; i < gradient.stops.length; i++){
      grad.addColorStop(gradient.stops[i].s, gradient.stops[i].c);
    }
    
    return grad;
  }

function animate(){
  if(!trackmouse){
    per.x = mX = w/2 + Math.round(Math.cos(per.step)*w/2) * .7;
    per.y = mY = h/2 + Math.round(Math.sin(per.step)*h/2);
    per.step += 0.04;
    if(per.step > twoPI)
      per.step = 0;
  }
  
  c.save();
  c.globalCompositeOperation = "source-over";
  c.fillStyle = newGradient(
    {
      type: "radial",
      x1: mX,
      y1: mY,
      r1: 0,
      r2: w,
      stops: [
        { s: 0, c: "rgba("+ parseInt(h-mY) +","+ parseInt(h-mY) +","+ parseInt(h-mY) +",1)" },
        { s: 0.06, c: "rgba("+ parseInt(h-mY) +","+ parseInt(h-mY-128) +",128,1)" },
        { s: .2, c: "rgba(0,"+ parseInt(h-mY-128) +","+ parseInt(h-mY) +",0.5)" }
        
      ]
    }
  );
  c.fillRect(0,0,w,h);
}

