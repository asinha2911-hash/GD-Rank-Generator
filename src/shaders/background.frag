#version 300 es

precision highp float;

out vec4 color;

in vec2 uv;


uniform vec3 primaryColor;
uniform vec3 secondaryColor;


void main(){

float gradient =
uv.y;


vec3 result =
mix(
secondaryColor,
primaryColor,
gradient
);



float vignette =
1.0 -
distance(
uv,
vec2(
0.5
)
);



result *=
vignette;



color =
vec4(
result,
1.0
);


}
