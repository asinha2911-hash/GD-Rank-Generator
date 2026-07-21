precision mediump float;


uniform vec3 color;

uniform float glow;

uniform float reflection;


void main(){


float light =
0.65 +
reflection;


vec3 crystal =
color *
light;



vec3 emission =
color *
glow;



gl_FragColor =
vec4(

crystal + emission,

1.0

);


}
