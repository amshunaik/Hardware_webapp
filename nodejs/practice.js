
const { spawn } = require('child_process');

const express =require('express');
const multer=require('multer')
const cors=require("cors")
const fs=require('fs')
const fs1=require('fs/promises')
//const outputFileName = 'a.exe';
const { exec } = require('child_process');
const path = require('path');

const app=express();

app.use(cors());




//////////////////////////////////////////////////////////////////////////////////
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
//////////////////////////////////////////////////////////////////////path//////
const path2=path.join(__dirname, "images")
/////////////////////////////////////////////////////////////////////////////////
app.post("/single",upload.single("file"),(req,res)=>{
    console.log(req.file);
    res.send("single file uploaded");
    
    const path1=path.join(__dirname, "images",`${req.file.originalname}`);
    
    console.log("path1 :",path1);
    const cppCommand = `g++ ${path1} -o ${path2}/a.exe`
    setTimeout(()=>{
        
				exec(cppCommand, (err, data, stderr) => {
				  if (err) {
					console.error(err);
					return;
				  }
				
				  console.log(data);
          console.log("step1")
				});
                   
            
    },10000);
    console.log("Hi itt")
    //const out=`./${outputFileNamwe}`;   
	    
})


app.get("/result",(req,res)=>{
  var ans;
  console.log("hi")
  const outputPath = path.join(path2, 'a.exe');
  
  console.log("rrrr");

  // Use spawn instead of exec

  const childProcess = spawn(outputPath, { shell: true, stdio: 'pipe' });

  // Handle errors
  childProcess.on('error', (err) => {
    console.error('Error starting child process:', err);
  });

  // Handle user input
  const userInput = `${path2}/sample_input7.v`;
  childProcess.stdin.write(userInput);

  // Close stdin to signal the end of input
  childProcess.stdin.end();

  // Buffer to store the output data
  let outputBuffer = Buffer.from('');

  // Listen for process output
  childProcess.stdout.on('data', (data) => {
    console.log(`Child process output: ${data}`);
    outputBuffer = Buffer.concat([outputBuffer, data]);
  });

  // Listen for process errors
  childProcess.stderr.on('data', (data) => {
    console.error(`Child process error: ${data}`);
  });

  // Listen for process completion
  childProcess.on('close', (code) => {
    console.log(`Child process exited with code ${code}`);

    // Find potential output files in the current directory
    //const path3=path.join(__dirname, "images")
    const files = fs.readdirSync(__dirname); // Assumes the script is in the same directory as potential output files

    const potentialOutputFiles = files.filter(file => file.endsWith('.txt')); // Adjust the file extension based on your case
    
    if (potentialOutputFiles.length > 0) {
      console.log('Potential output files found:',potentialOutputFiles);
      //return potentialOutputFiles

     
    } else {
      console.log('No potential output files found.');
    }
  
  //console.log(group1)
  console.log("hi")
  res.json({ potentialOutputFiles });
  })
})
//////////////////////////////////////////////////////////////download button
const potentialFilenames = ['fsm1.txt', 'fsm2.txt'];
app.get('/download', (req, res) => {
  const filename = req.query.filename;
  console.log(filename)

  // Check if the requested filename is in the list of potential filenames
  if (potentialFilenames.includes(filename)) {
    const filePath = path.join(__dirname,  filename);

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      // Set the appropriate headers for the file download
      res.setHeader('Content-disposition', 'attachment; filename=' + filename);
      res.setHeader('Content-type', 'text/plain');

      // Create a readable stream from the file and pipe it to the response
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).send('File not found');
    }
  } else {
    res.status(400).send('Invalid filename');
  }
});
app.get('/delete',(req,res)=>{
  async function deleteAllFilesInDir(directoryPath) {
    try {
      const files = await fs1.readdir(directoryPath);
      
      const f1 = fs.readdirSync(__dirname); // Assumes the script is in the same directory as potential output files
      const name1 = f1.filter(file => file.endsWith('.txt'));
      const deleteFilePromisestxt = name1.map((file) =>
        fs1.unlink(path.join(__dirname, file))
      );

      const deleteFilePromises = files.map((file) =>
        fs1.unlink(path.join(directoryPath, file))
      );

      await promise.all(deleteFilePromises);
      await promise.all(deleteFilePromisestxt)
    } catch (err) {
      console.log(err);
    }
  }

  deleteAllFilesInDir(path2)
  console.log("removed files")
})
  
app.post("/multiple",upload.array("images",2),(req,res)=>{
    console.log(req.files);
    res.send("multiple file")
    console.log("filename",req.files.originalname)
})
app.listen(5000);
