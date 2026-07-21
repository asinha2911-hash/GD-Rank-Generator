#version 300 es

precision highp float;

out vec4 color;

in vec2 uv;


void main(){


float dist =
distance(
uv,
vec2(0.5)
);


float haze =
1.0-dist;



vec3 fog =
vec3(
0.15,
0.01,
0.02
)
*haze;


color =
vec4(
fog,
1.0
);


}
