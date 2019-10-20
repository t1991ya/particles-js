var canH=500;
var canW=1200;
var pSize=2;
var ratio=canW/canH;
var q=new particle(50,400,"blue");
var partNumber=10;
var cloud=[];
var id=0;
const c=document.getElementById("c");
var ctx=c.getContext('2d');
c.addEventListener('click',addParticles);
document.getElementById("stop").addEventListener('click',stopAnimation);
document.getElementById("start").addEventListener('click',startAnimation);
cloudInit();

/*##########################################################################################################################
###                                     Functions                                                                          #
###########################################################################################################################*/
// initalize the cloud
function cloudInit()
{
    for(let i=0;i<partNumber;i++)
    {
        var color='rgba(255,255,255,0.8)';
        var p=new particle(Math.floor(Math.random()*canW),Math.floor(Math.random()*canH),color);
        p.target=new particle(Math.floor(Math.random()*canW),Math.floor(Math.random()*canH),color);
        p.init();
        cloud.push(p);
    }
    
    
}
//start the animation
function startAnimation()
{
    id=requestAnimationFrame(move);
}
function distanceCalculator(a,b)
{
    var x=a.x-b.x;
    var y=a.y-b.y;
    return Math.sqrt(x*x+y*y);
}
//stop the animation
function stopAnimation()
{
    cancelAnimationFrame(id);
}
// set a particle target
function addParticles(e)
{
   for(let i=0;i<10;i++)
   {
    var color='rgba(255,255,255,0.8)';   
    var m=new particle(e.offsetX,e.offsetY,color);
       m.target= new particle(Math.floor(Math.random()*canW),Math.floor(Math.random()*canH),color);
       m.init();
       cloud.push(m);
   }
   
}

// particle
function particle(a,b,color) {
    this.width =pSize;
    this.x = a;
     this.y = b;
     this.color=color;
     this.target={x:0,y:0,color};
     this.init=function()
     {
    this.speedX=ratio*(this.target.x-this.x)/canW;
    this.speedY=(this.target.y-this.y)/canH;

     }
     this.move=function()
     {
        this.x+=this.speedX;
        this.y+=this.speedY;
     }
     this.stop=function()
     {
       var a=this.x-this.target.x;
       var b=this.y-this.target.y;
       var distance=Math.sqrt(a*a+b*b);
       if(distance<2)
       return true;
       else
       return false;
     }

}
function mto(x){
    ctx.moveTo(x.x,x.y);
}
function lto(x)
{
    ctx.lineTo(x.x,x.y);
}
//draw lines 
function link(c)
{
ctx.strokeStyle="rgba(255,255,255,0.3)";
ctx.fillStyle="red";
ctx.beginPath();
for(let i=0;i<c.length;i++)
{
    
 for(let j=0;j<c.length;j++)
 {
    mto(c[i]);
   if(distanceCalculator(c[i],c[j])<75)
    lto(c[j]); 
 }
 
}
ctx.stroke();
}
//draw a partcle
function draw(p) {
   ctx.beginPath();
  
   ctx.arc(p.x, p.y,p.width, 0, 2 * Math.PI);
   ctx.fillStyle = p.color;
   ctx.fill();

}
// moving particles
function move()
{
    ctx.fillStyle="black";
    ctx.fillRect(0,0,canW,canH);
    
   cloud.forEach(p => {

        p.move();
    draw(p);

     if(p.stop())
    {
        p.target=new particle(Math.floor(Math.random()*canW),Math.floor(Math.random()*canH),p.color);
        p.init();
    }
    });
   link(cloud);
   document.getElementById("tot").innerText=cloud.length;  
id=requestAnimationFrame(move);
}



