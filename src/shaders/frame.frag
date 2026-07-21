#version 300 es

precision highp float;


out vec4 color;


in vec2 uv;


uniform vec2 resolution;



float roundedBox(
vec2 p,
vec2 b
){

vec2 q =
abs(p)-b;


return length(
max(q,0.0)
);

}



void main(){

vec2 p =
uv*2.0-1.0;


p.x *= resolution.x/resolution.y;



float outer =
roundedBox(
p,
vec2(
0.65,
0.8
)
);



float inner =
roundedBox(
p,
vec2(
0.55,
0.7
)
);



float border =
smoothstep(
0.08,
0.0,
outer
)
-
smoothstep(
0.08,
0.0,
inner
);



float bevel =
smoothstep(
0.3,
0.0,
abs(p.y)
);



vec3 metal =
vec3(
0.35,
0.18,
0.05
);



metal +=
bevel*
vec3(
0.8,
0.55,
0.2
);



color =
vec4(
metal,
border
);


}
