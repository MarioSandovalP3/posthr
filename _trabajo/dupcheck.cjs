const fs=require("fs");
const h=fs.readFileSync("articulos.html","utf8");
const arts=h.match(/<article id="(art-\d+-\d+)"[\s\S]*?<\/article>/g)||[];
const seen=new Map(); let dups=[];
for(const a of arts){const id=a.match(/id="(art-\d+-\d+)"/)[1];const t=a.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim();
for(const s of t.split(/(?<=[.!?])\s+/).filter(x=>x.split(" ").length>=12)){const k=s.toLowerCase().replace(/[^a-záéíóúñü ]/g,"").trim(); if(seen.has(k)&&seen.get(k)!==id)dups.push(seen.get(k)+" == "+id); else seen.set(k,id);}}
const words=h.replace(/<[^>]+>/g," ").replace(/&nbsp;/g," ").trim().split(/\s+/).length;
console.log("articulos:",arts.length,"| frases largas duplicadas:",dups.length,"| palabras visibles:",words);
