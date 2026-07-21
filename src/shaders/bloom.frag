#version 300 es

precision highp float;

out vec4 color;

in vec2 uv;

uniform sampler2D image;


void main(){

vec4 c =
texture(
image,
uv
);


color =
vec4(
c.rgb*1.2,
c.a
);


}
