import Vertex from "./Vertex.js";


export default class CrystalGeometry{


constructor(){


this.vertices=[];

this.faces=[];


this.generate();


}



generate(){


const size=1;



this.vertices=[


new Vertex(0,size,0),

new Vertex(-size,0,size),

new Vertex(size,0,size),

new Vertex(size,0,-size),

new Vertex(-size,0,-size),

new Vertex(0,-size,0)


];



this.faces=[


[0,1,2],

[0,2,3],

[0,3,4],

[0,4,1],


[5,2,1],

[5,3,2],

[5,4,3],

[5,1,4]


];


}



getMesh(){


return {


vertices:this.vertices,

faces:this.faces


};


}



}
