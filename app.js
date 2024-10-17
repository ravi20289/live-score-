const express = require("express");

const app = express();


const port = 3000;

function getScore(){
  const score = {
    teamA : Math.floor(Math.random() * 100),
    teamB: Math.floor(Math.random() * 100),
    time : new Date().toLocaleTimeString(),
  }

   return `data: ${JSON.stringify(score)}\n\n`; 
}


app.get("/score-update", (req, res) =>{
    res.setHeader("content-type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    // const intervalId = setInterval(res.write(getScore()), 3000);


    const intervalId = setInterval(() => {
        res.write(getScore()); 
      }, 3000);
   

    req.on('close', ()=>{
        clearInterval(intervalId);
    })


})

app.listen(port, ()=>{
    console.log(` you are listen on port ${port}`);
})