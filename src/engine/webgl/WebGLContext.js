export default class WebGLContext {


constructor(canvas){


this.canvas = canvas;


this.gl =
canvas.getContext(
"webgl2"
);


if(!this.gl){

throw new Error(
"WebGL2 unavailable"
);

}


this.gl.enable(
this.gl.BLEND
);


this.gl.blendFunc(

this.gl.SRC_ALPHA,

this.gl.ONE_MINUS_SRC_ALPHA

);



}


clear(){


this.gl.clearColor(

0,

0,

0,

1

);



this.gl.clear(

this.gl.COLOR_BUFFER_BIT

);


}


}
