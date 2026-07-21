import WebGLContext from "./WebGLContext.js";
import Quad from "./Quad.js";
import Pipeline from "./Pipeline.js";


export default class WebGLRenderer {


constructor(canvas,shader){


this.context =
new WebGLContext(canvas);


this.gl =
this.context.gl;


this.shader = shader;


this.quad =
new Quad(this.gl);


this.pipeline =
new Pipeline(

this.gl,

shader

);



this.resize();


}



resize(){


this.gl.canvas.width =
window.innerWidth;


this.gl.canvas.height =
window.innerHeight;


this.gl.viewport(

0,
0,

this.gl.canvas.width,

this.gl.canvas.height

);


}



render(){


const gl=this.gl;


this.resize();


gl.enable(
gl.BLEND
);


gl.blendFunc(

gl.SRC_ALPHA,

gl.ONE_MINUS_SRC_ALPHA

);



this.context.clear();



this.shader.use();



const resolution =
gl.getUniformLocation(

this.shader.program,

"resolution"

);



gl.uniform2f(

resolution,

gl.canvas.width,

gl.canvas.height

);



this.pipeline.render(

this.quad

);



}


}
