export default class ColorPicker{


constructor(name,color,callback){


this.container=
document.createElement(
"div"
);



this.container.className=
"control";



const label=
document.createElement(
"label"
);


label.innerText=
name;



this.element=
document.createElement(
"input"
);



this.element.type=
"color";


this.element.value=
color;



this.element.oninput=()=>{


callback(
this.element.value
);


};



this.container.appendChild(label);

this.container.appendChild(
this.element
);



}



attach(parent){

parent.appendChild(
this.container
);


}


}
