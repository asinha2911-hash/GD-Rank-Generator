import Presets from "./RankCollection.js";


export default class PresetLoader{


constructor(){


this.current=null;


}



load(name){


const preset =
Presets[name];



if(!preset){

console.error(
"Preset not found:",
name
);

return;

}



this.current =
new preset();



return this.current;


}



getCurrent(){


return this.current;


}



}
