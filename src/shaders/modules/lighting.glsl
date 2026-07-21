float crystalLight(
vec2 p
){

vec2 light=
normalize(
vec2(-0.5,0.8)
);


vec2 normal=
normalize(
vec2(
p.x,
p.y
)
);


return max(
dot(
normal,
light
),
0.0
);

}
