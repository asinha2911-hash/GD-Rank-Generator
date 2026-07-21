export default class Quad {


constructor(gl){


this.gl = gl;


this.buffer =
gl.createBuffer();


gl.bindBuffer(
gl.ARRAY_BUFFER,
this.buffer
);



const vertices = new Float32Array([

-1,-1,
 1,-1,
-1, 1,

-1, 1,
 1,-1,
 1, 1

]);



gl.bufferData(

gl.ARRAY_BUFFER,

vertices,

gl.STATIC_DRAW

);


this.count=6;


}



bind(shader){


const gl=this.gl;


const location =
gl.getAttribLocation(

shader.program,

"position"

);



gl.enableVertexAttribArray(
location
);



gl.vertexAttribPointer(

location,

2,

gl.FLOAT,

false,

0,

0

);



}


}
