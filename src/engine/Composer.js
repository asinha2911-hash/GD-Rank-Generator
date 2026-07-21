export default class Composer {


constructor(){

this.layers=[];

}


add(layer){

this.layers.push(layer);

}


render(ctx){

for(const layer of this.layers){

if(layer.visible)
layer.render(ctx);

}

}


}
