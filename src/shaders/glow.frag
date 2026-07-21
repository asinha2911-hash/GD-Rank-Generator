#version 300 es

precision highp float;

out vec4 color;

in vec2 uv;

uniform sampler2D image;


void main(){

vec4 pixel =
texture(
image,
uv
);


float glow =
pixel.a*0.6;


color =
vec4(
pixel.rgb*1.5,
glow
);


}
