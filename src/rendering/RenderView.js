export default class RenderView{


constructor(){


this.canvas=document.getElementById("rank-canvas");


if(!this.canvas){


this.canvas=document.createElement("canvas");

document.body.appendChild(this.canvas);


}



this.canvas.width=900;

this.canvas.height=700;


this.ctx=this.canvas.getContext("2d");


this.settings={


color:"#9b111e",

glow:40,

title:"BLOODSTONE",

subtitle:"LEGENDARY"


};



this.render();


}



update(settings){


this.settings=settings;

this.render();


}



render(){


const ctx=this.ctx;

const s=this.settings;


ctx.clearRect(

0,

0,

900,

700

);



// background

ctx.fillStyle="#050505";

ctx.fillRect(

0,

0,

900,

700

);



// outer aura

const gradient =
ctx.createRadialGradient(

450,

350,

50,

450,

350,

250

);



gradient.addColorStop(

0,

s.color

);



gradient.addColorStop(

1,

"transparent"

);



ctx.globalAlpha=.35;

ctx.fillStyle=gradient;


ctx.beginPath();

ctx.arc(

450,

350,

250,

0,

Math.PI*2

);

ctx.fill();



ctx.globalAlpha=1;



// crystal body

ctx.shadowBlur=s.glow;

ctx.shadowColor=s.color;



ctx.beginPath();


ctx.moveTo(450,180);

ctx.lineTo(570,300);

ctx.lineTo(520,500);

ctx.lineTo(380,500);

ctx.lineTo(330,300);


ctx.closePath();



ctx.fillStyle=s.color;

ctx.fill();



ctx.shadowBlur=0;



// crystal facets


ctx.strokeStyle="rgba(255,255,255,.35)";

ctx.lineWidth=3;


ctx.beginPath();

ctx.moveTo(450,180);

ctx.lineTo(450,500);

ctx.moveTo(330,300);

ctx.lineTo(570,300);

ctx.stroke();



// text


ctx.textAlign="center";

ctx.fillStyle="white";


ctx.font="bold 55px Arial";


ctx.fillText(

s.title,

450,

600

);



ctx.font="25px Arial";


ctx.fillText(

s.subtitle,

450,

640

);



}



}
