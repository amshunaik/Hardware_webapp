

import React ,{useState,useRef} from 'react';
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
        console.log(result.runStdout);
        setsol(result.runStdout);


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
                        
                    <h1>Result </h1>{sol===null&&clk==true?<h2>Compiling....</h2>:<h2>{sol}</h2>}
                    </div>
                    
                    
                
                </div>
            
            </div>
            
            
        </div>
    )

}
export default App;