import Rank from "../components/Rank.js";
import RankText from "../components/RankText.js";
import Particles from "../components/Particles.js";
import Haze from "../components/Haze.js";


export default class RankScene{


constructor(){


this.rank =
new Rank();



this.layers=[];


this.build();


}



build(){


this.layers=[


{

name:"background",

enabled:true


},



{

name:"haze",

object:
new Haze(),

enabled:true


},



{

name:"crystal",

enabled:true


},



{

name:"particles",

object:
new Particles(150),

enabled:true


},



{

name:"text",

object:
new RankText(
this.rank.name
),

enabled:true


}


];


}



setRankName(name){


this.rank.setName(name);



}



getLayers(){


return this.layers;


}



render(){


return {


rank:
this.rank,


layers:
this.layers


};


}



}
