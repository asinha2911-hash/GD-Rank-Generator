export default class Framebuffer {


constructor(gl){


this.gl=gl;


this.buffer =
gl.createFramebuffer();


}



bind(){

this.gl.bindFramebuffer(

this.gl.FRAMEBUFFER,

this.buffer

);


}



unbind(){

this.gl.bindFramebuffer(

this.gl.FRAMEBUFFER,

null

);


}


}
