import PresetDropdown from "./PresetDropdown.js";
import RankCollection from "../presets/RankCollection.js";
import CustomRank from "../settings/CustomRank.js";
import SaveSystem from "./SaveSystem.js";


export default class RankEditor{


constructor(controller){


this.controller=
controller;


this.saveSystem=
new SaveSystem();



this.panel=
document.createElement(
"div"
);



this.panel.id=
"rank-editor";



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
"RANK SELECTOR";


this.panel.appendChild(title);



const dropdown =
new PresetDropdown(

RankCollection,

(name)=>{


console.log(
"Selected:",
name
);


}

);



dropdown.attach(
this.panel
);




const save=
document.createElement(
"button"
);



save.innerText=
"Save Custom Rank";



save.onclick=()=>{


this.saveSystem.save(

new CustomRank()

);


};



this.panel.appendChild(
save
);



}


}
