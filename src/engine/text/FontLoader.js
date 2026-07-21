export default class FontLoader{


constructor(){

this.fonts={};

}



load(name,path){

this.fonts[name]=path;

}



get(name){

return this.fonts[name];

}


}
