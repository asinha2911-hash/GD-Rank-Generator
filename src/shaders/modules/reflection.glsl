float reflection(
vec2 p
){

float r =
smoothstep(
0.02,
0.0,
abs(
p.x+p.y
)
);


return r;

}
