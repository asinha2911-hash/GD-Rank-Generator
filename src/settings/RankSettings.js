export default class RankSettings{


constructor(){


this.name =
"Bloodstone";


this.subtitle =
"LEGENDARY";



this.crystal = {


color:
"#9b111e",


glow:
0.9,


size:
1.0


};



this.effects = {


particles:
150,


haze:
0.5,


bloom:
0.8


};



this.frame = {


material:
"gold",


strength:
1.0


};


}



update(path,value){


const parts =
path.split(".");


let object=this;


for(
let i=0;i<parts.length-1;i++
){

object=
object[parts[i]];

}


object[
parts[parts.length-1]
]=value;


}



}
