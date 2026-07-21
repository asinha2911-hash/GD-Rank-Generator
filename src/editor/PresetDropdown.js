export default class PresetDropdown{


constructor(presets,callback){


this.element=
document.createElement(
"select"
);



Object.keys(presets)
.forEach(name=>{


const option=
document.createElement(
"option"
);



option.value=name;

option.innerText=name;



this.element.appendChild(
option
);



});



this.element.onchange=()=>{


callback(
this.element.value
);


};



}



attach(parent){


parent.appendChild(
this.element
);


}



}
