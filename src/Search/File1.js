

import React ,{useState,useRef, useEffect} from 'react';
import './File1.css'
function App(){
    const inputref=useRef();
    const [f,setf]=useState("");
    const [clk,setclk]=useState(false);

    const [file,setfile]=useState(null);
    const [sol,setsol]=useState(null);
   // const mess="file Sent"
    const filechange=(e)=>{
        setfile(e.target.files[0]);
        console.log("files",e.target.files[0]);
        setf(e.target.files[0])
    };

    
    const submithand=async(e)=>{
        e.preventDefault();
        if(file==null){
            console.log("no file uploaded");
            return;
        }
        console.log(inputref);
        setclk(false);
        const data=new FormData();
        data.append('file',file)
        console.log("data",data);
        fetch("http://localhost:5000/single",{
            method:"POST",
            body:data,
        })
        .then((result)=>{
            console.log("file sent");
            
        })
        .catch((err)=>{
            console.log(err.message);
        })

        
        
    }
    const handleresult=async()=>{
        setclk(true);
        let result=await fetch('http://localhost:5000/result');
        result=await result.json();
        console.log(result.potentialOutputFiles)
        //console.log(result.runStdout);
        setsol(result.potentialOutputFiles);


    }
    const handDelete=async ()=>{
        
            const response = await fetch('http://localhost:5000/delete');
            const data = await response.json();
            console.log(data.message);
            
            setsol(null);
    }
    useEffect(()=>{
        setsol(null);

    },[sol])
     const downloadFile =async(filename)=> {
        try {
          const response = await fetch(`http://localhost:5000/download?filename=${filename}`);
          
          if (response.ok) {
            const blob = await response.blob();
    
            // Create a temporary link element and trigger the download
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } else {
            console.error(`Failed to download file: ${response.status} - ${response.statusText}`);
          }
        } catch (error) {
          console.error('Error during file download:', error);
        }
        console.log(sol)
      }

    return(
        <div className='div2'>
            <h1>Node Js and React Js</h1>
            <h2>File upload </h2>
            <div className='cover'>
                <div className='div4'>
                    <form action="" onSubmit={submithand}>
                        <input type="file" onChange={filechange}  ref={inputref} />
                        <button className='submit'type='submit'>submit</button>
                        {file==null?<h3>No file uploaded</h3>:<></>}
                    </form>
                    <div className='div1'>
                        {f? <iframe  className="iframe"src={URL.createObjectURL(file)} alt="Preview" />:<></>}

                    </div>
                </div>

                <div className='div3'>
                
                    <button className='run' onClick={handleresult}> Run</button>
                    <div className='div5'>
                        
                    <h1>Result </h1>{sol===null&&clk==true?<h2>Compiling....</h2>:<h2>File generated : {sol}</h2>}
                    </div>

                    <div className='b1'>
                    <button className='but1'onClick={()=>downloadFile('fsm1.txt')}>Download File 1</button>
                    <button className='but1'onClick={()=>downloadFile('fsm2.txt')}>Download File 2</button>
                    </div>
                    <button onClick={handDelete} className='clear'>Clear</button>
                    <div className='div7'>
                        <h2>Instructions to be followed :</h2>
                        <ul>
                            <li>First upload and submit a ".v" file, then do same for ".cpp" file</li>
                            <li>After submitting wait for 10-15 sec then press "Run" button</li>
                            <li>Then the name of files generated will be visible to you</li>
                            <li>Then press "Download" button , to download the output file.</li>
                            <li><b>Then press "clear" button befor uploading new set of file</b></li>

                        </ul>
                        <h4>"Clear button" is to delete the previous uploaded files </h4>

                    </div>
                    

                    
                    
                
                </div>
            
            </div>
            
            
        </div>
    )

}
export default App;
