var fs = require("fs");
var crypto = require("crypto");
const { resolve } = require("path");

const algos = ["aes-256-cbc",'camellia-256-cbc','des-ede-cbc','des-ede3-cbc','rc2-cbc','seed-cbc']

var key = "14189dc35ae35e75ff31d7502e245cd9bc7803838fbfd5c773cdcd79b8a28bbd";

function encript(file_inp, file_out,algorithm) {
  return new Promise((resolve, reject) => {
    var cipher = crypto.createCipher(algorithm, key);
    var input = fs.createReadStream(file_inp);
    var output = fs.createWriteStream(file_out);

    input.pipe(cipher).pipe(output);

    output.on("finish", () => {
      resolve(true);
    });
  });
}

function decript(file_inp, file_out,algorithm) {
  return new Promise((resolve, reject) => {
    var cipher = crypto.createDecipher(algorithm, key);
    var input = fs.createReadStream(file_inp);
    var output = fs.createWriteStream(file_out);

    input.pipe(cipher).pipe(output);

    output.on("finish",()=>{
      resolve(true);
    });
  });
}

function work(file_inp,algorithm) {
  return new Promise(async (resolve,reject)=>{

    var input = "./DataSet_Inp/"+file_inp;
    var encripted = "./Encripted_Data/Encripted_"+algorithm+"_"+file_inp+".enc";
    var output = "./DataSet_Out/Decripted_"+algorithm+"_"+file_inp;

    console.time(file_inp + " - " + algorithm + " -  Encription ");
    await encript(input,encripted,algorithm);
    console.timeEnd(file_inp + " - " + algorithm + " -  Encription ");
    
    console.log("\n    ------     \n");
    
    console.time(file_inp + " - " + algorithm + " -  Decription ");
    await decript(encripted, output,algorithm);
    console.timeEnd(file_inp + " - " + algorithm + " -  Decription ");
    
    console.log("\n\n\n");
    resolve(true);
  })
  

}

fs.readdir(__dirname+'/DataSet_Inp',(err, files) => {
    files.forEach((single_file) => {
      return new Promise( (resolve,reject)=>{
        algos.forEach((single_algos)=>{
          work(single_file,single_algos);
        })
      })
    });
  });

algos.forEach((single)=>{console.log(single)})