export default class TextMaterial{


constructor(){


this.fill=
"#ffffff";


this.outline=
"#000000";


this.glow=
1.0;


this.shadow=
0.5;


this.metallic=
true;


}



setColor(color){

this.fill=color;

}



setGlow(amount){

this.glow=amount;

}



setOutline(color){

this.outline=color;

}


}
