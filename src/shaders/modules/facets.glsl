float facetPattern(vec2 p){

p*=5.0;


float a=
abs(sin(p.x*3.1415));

float b=
abs(cos(p.y*3.1415));


return a*b;

}
