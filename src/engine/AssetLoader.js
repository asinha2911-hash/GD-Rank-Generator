export default class AssetLoader {


constructor(){

this.assets={};

}



load(name,path){

return new Promise(resolve=>{


let img=new Image();

img.src=path;


img.onload=()=>{

this.assets[name]=img;

resolve(img);

};


});


}



get(name){

return this.assets[name];

}


}
