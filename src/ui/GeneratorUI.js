import Slider from "./Slider.js";
import ColorPicker from "./ColorPicker.js";


export default class GeneratorUI{


constructor(controller){


this.controller=controller;


this.panel=
document.createElement(
"div"
);



this.panel.id=
"generator";


document.body.appendChild(
this.panel
);



this.create();


}



create(){


const title=
document.createElement(
"h2"
);


title.innerText=
"RANK SETTINGS";


this.panel.appendChild(title);



new Slider(

"Crystal Glow",

0,

1,

0.9,

(v)=>
this.controller.changeGlow(
Number(v)
)

).attach(
this.panel
);





new Slider(

"Particle Amount",

0,

500,

150,

(v)=>
this.controller.changeParticles(
Number(v)
)

).attach(
this.panel
);






new ColorPicker(

"Crystal Color",

"#9b111e",

(v)=>
this.controller.changeColor(
v
)

).attach(
this.panel
);



}


}
