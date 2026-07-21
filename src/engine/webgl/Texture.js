export default class Texture {


constructor(gl,image){


this.gl=gl;


this.texture =
gl.createTexture();



gl.bindTexture(
gl.TEXTURE_2D,
this.texture
);


gl.texImage2D(

gl.TEXTURE_2D,

0,

gl.RGBA,

gl.RGBA,

gl.UNSIGNED_BYTE,

image

);


gl.texParameteri(

gl.TEXTURE_2D,

gl.TEXTURE_MIN_FILTER,

gl.LINEAR

);



}


}
