float hash(vec2 p){

return fract(
sin(dot(
p,
vec2(127.1,311.7)
))
*43758.5453123
);

}


float noise(vec2 p){

vec2 i=floor(p);
vec2 f=fract(p);


float a=hash(i);
float b=hash(i+vec2(1,0));
float c=hash(i+vec2(0,1));
float d=hash(i+vec2(1,1));


vec2 u=f*f*(3.0-2.0*f);


return mix(
mix(a,b,u.x),
mix(c,d,u.x),
u.y
);

}
