import Layer from "./Layer.js";


export default class AssetLayer extends Layer{


constructor(image,x,y,w,h){

super();

this.image=image;

this.x=x;
this.y=y;

this.width=w;
this.height=h;

}


render(ctx){

if(!this.image)
return;


ctx.drawImage(

this.image,

this.x,
this.y,

this.width,
this.height

);


}


}
