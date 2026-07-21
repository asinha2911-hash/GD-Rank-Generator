export default class Controls{


constructor(render){


this.render=render;

this.create();


}



create(){


const panel=document.createElement("div");


panel.id="controls";


panel.innerHTML =

"<h2>Rank Settings</h2>" +

"<label>Glow<br><input id='glow' type='range' min='0' max='100' value='40'></label>" +

"<label>Color<br><input id='color' type='color' value='#9b111e'></label>" +

"<label>Title<br><input id='title' value='BLOODSTONE'></label>" +

"<label>Subtitle<br><input id='subtitle' value='LEGENDARY'></label>";



document.body.appendChild(panel);



const update=()=>{


this.render.update({


glow:Number(
document.getElementById("glow").value
),


color:
document.getElementById("color").value,


title:
document.getElementById("title").value,


subtitle:
document.getElementById("subtitle").value


});


};



panel.querySelectorAll("input")
.forEach(input=>{


input.oninput=update;


});


}


}
