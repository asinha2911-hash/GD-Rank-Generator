export default class CustomRank{


constructor(){


this.name=
"Custom Rank";



this.crystal={


color:"#ffffff",

glow:0.5,

reflection:0.5


};



this.frame={


material:"silver",

strength:1


};



this.effects={


bloom:0.5,

haze:0.3,

particles:50


};



this.text={


title:"CUSTOM",

subtitle:"RANK"


};



this.decorations={


stars:true,

runes:false


};



}



clone(){


return JSON.parse(

JSON.stringify(this)

);


}



}
