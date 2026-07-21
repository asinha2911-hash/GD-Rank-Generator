import TextMaterial from "../engine/text/TextMaterial.js";


export default class RankText{


constructor(name){


this.name=name;


this.title=
new TextMaterial();



this.subtitle=
new TextMaterial();



this.title.setColor(
"#ffdddd"
);



this.subtitle.setColor(
"#ff5555"
);



}



setName(name){

this.name=name;

}



render(){


return {


title:{


text:this.name,


style:this.title


},



subtitle:{


text:"LEGENDARY",


style:this.subtitle


}


};


}


}
