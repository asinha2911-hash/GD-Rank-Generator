export default class TextRenderer{


constructor(){

this.textObjects=[];

}



create(text,material){


const object={


text:text,


material:material,


position:{

x:0,

y:0

}


};


this.textObjects.push(object);


return object;


}



render(){

return this.textObjects;


}


}
