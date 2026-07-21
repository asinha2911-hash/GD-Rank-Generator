export default class Pipeline {


constructor(gl,shader){


this.gl=gl;

this.shader=shader;


}



render(quad){


this.shader.use();


quad.bind(
this.shader
);



this.gl.drawArrays(

this.gl.TRIANGLES,

0,

quad.count

);



}



}
