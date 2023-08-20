

const express =require('express');
const multer=require('multer')
const cors=require("cors")
//const outputFileName = 'output.exe';
const { exec } = require('child_process');
const path = require('path');

const app=express();

app.use(cors());
const filesstorage=multer.diskStorage({
    destination:(req,files,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname)
    },
})


const upload=multer({storage:filesstorage});
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, 'about.html'))
})


app.post("/single",upload.single("file"),(req,res)=>{
    console.log(req.file);
    res.send("single file uploaded");
    const path1=path.join(__dirname, "images",`${req.file.originalname}`);
    console.log(path1);
    const cppCommand = `g++ ${path1} `;
    setTimeout(()=>{
        
				exec(cppCommand, (err, data, stderr) => {
				  if (err) {
					console.error(err);
					return;
				  }
				
				  console.log(data);
          console.log("step1")
				});
               //const out=`./${outputFileName}`;         
    },10000);
	    
})


app.get("/result",(req,res)=>{
  var ans;
  const outputPath = path.join(__dirname, 'a.exe');
  exec(`${outputPath}`, (runError, runStdout, runStderr) => {
        if (runError) {
          console.error(`Execution Error: ${runError.message}`);
          return;
        }
        if (runStderr) {
          console.error(`Execution stderr: ${runStderr}`);
          return;
        }
        console.log(`Program Output:\n${runStdout}`);
        ans={runStdout};
        res.send(ans);
    })

})
  
app.post("/multiple",upload.array("images",2),(req,res)=>{
    console.log(req.files);
    res.send("multiple file")
    console.log("filename",req.files.originalname)
})
app.listen(5000);