export default class LayerManager{


constructor(){

this.layers=[];

}



add(layer){

this.layers.push(layer);

}



render(){

for(
const layer of this.layers
){

layer.render();

}


}


}
