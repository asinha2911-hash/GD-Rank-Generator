import Layer from "../engine/Layer.js";


export default class WebGLCrystal extends Layer{


constructor(shader){

super();

this.shader=shader;

}



render(gl){


this.shader.use();


}


}
