var es = require('event-stream')
var ini = require('ini');
var cp = require("child_process");
var fs = require("fs");
var path = require("path");

var mapper=(typeof(module)!='undefined'?module.exports:{});

var protocol=mapper.protocol='https';

//mapping


var reduce=m=>x=>m.reduce((aggr,[k,v])=>aggr.replace(k,v),x);
var filter=m=>x=>m.some(([k,v])=>x.startsWith(k));
var replace=x=>x.replace(/\\/gi,'/');
var encode=(uri)=>uri.split(/\/{1}/g).map(x=>encodeURIComponent(x)).join("/");
var remap=mapper.remap=(li,m=mapping)=>(li=[...(Array.isArray(li)?li:[li])],m=Object.entries(m),li.filter(filter(m)).map(reduce(m)).map(replace).map(x=>`${protocol}:${encode(x)}`));
var csv=mapper.csv=(file, row=/\r\n/, col=/\t+/)=>fread(path.resolve(file)).split(row).map(line=>(col?line.split(col):line));  
var fread=mapper.fread=(file)=>fs.readFileSync(path.resolve(file), {encoding:"utf8"}); 
var fwrite=mapper.fwrite=(file,data)=>fs.readWriteSync(path.resolve(file), (typeof(data)=="string"?data:JSON.stringify(data)), {encoding:"utf8"}); 
var loadini=mapper.loadini=()=>require('ini').parse(require('fs').readFileSync(path.resolve('./remap.ini'),{encoding:'utf8'}))

/*
var o={};
o["D:\\www"]="//iis";
o["G:\\Bilder"]="//iis/Bilder";
o["F:\\videos\\porn"]="//iis/porn";
/* */

var mapping=mapper.mapping=loadini('../remap.ini');

//var fwrite=(file,obj)=>require('fs').writeFileSync(require("path").resolve(__dirname,file), JSON.stringify(obj), {encoding:'utf8'});