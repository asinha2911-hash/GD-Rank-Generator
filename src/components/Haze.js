export default class Haze{


constructor(){

this.intensity=0.5;

this.color=
{
r:180,
g:20,
b:30
};

}



setIntensity(value){

this.intensity=value;

}



render(){

return {

type:
"haze",

strength:
this.intensity,

color:
this.color

};


}


}
