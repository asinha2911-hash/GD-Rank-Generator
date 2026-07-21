export default class SaveSystem{


save(rank){


localStorage.setItem(

"customRank",

JSON.stringify(rank)

);


}



load(){


const data =
localStorage.getItem(
"customRank"
);



if(!data)
return null;



return JSON.parse(data);


}



}
