export default class Slider{


constructor(name,min,max,value,callback){


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
"range";


this.element.min=min;

this.element.max=max;

this.element.value=value;



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
