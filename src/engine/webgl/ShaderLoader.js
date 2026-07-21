export default async function ShaderLoader(path){


const response =
await fetch(path);


return await response.text();


}
