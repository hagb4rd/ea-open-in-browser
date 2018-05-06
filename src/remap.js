var mapper=(typeof(module)!='undefined'?module.exports:{});

var protocol=mapper.protocol='https';

//mapping
var o={};
o["D:\\www"]="//iis";
o["G:\\Bilder"]="//iis/Bilder";

var mapping=mapper.mapping=o;

var reduce=m=>x=>m.reduce((aggr,[k,v])=>aggr.replace(k,v),x);
var filter=m=>x=>m.some(([k,v])=>x.startsWith(k));
var replace=x=>x.replace(/\\/gi,'/');
var encode=(uri)=>uri.split(/\/{1}/g).map(x=>encodeURIComponent(x)).join("/");
var remap=mapper.remap=(li,m=mapping)=>(li=[...(Array.isArray(li)?li:[li])],m=Object.entries(m),li.filter(filter(m)).map(reduce(m)).map(replace).map(x=>`${protocol}:${encode(x)}`));




//var fwrite=(file,obj)=>require('fs').writeFileSync(require("path").resolve(__dirname,file), JSON.stringify(obj), {encoding:'utf8'});