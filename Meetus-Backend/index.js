const bodyParser = require("body-parser");
const express  = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors'); 
const app = express();
const { v4: uuidv4 } = require('uuid'); 
app.use(bodyParser.json());
app.use(cors());

const PORT = 8000;


const secretKey = 'meetusVrSecretKey_JWT';
const users = [];



app.post("/signup",(req,res)=>{
    const {email,password} =req.body;
    if(!email || !password) {
         res.status(403).json({message:"Pleasse Enter Email and Password To Signup Successfully"})
    }

    users.push({email,password,tasks:[]});

    res.status(201).json({message:"User Signed Up Successfully"});

})

app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    const token = jwt.sign({email},secretKey);
    res.json({token})

})

app.get("/",(req,res)=>{
    res.send("Server Is Running ")
})


const authenticationMiddleWare = (req,res,next) => {
    const token  = req.headers['authentication'];
    if(!token) { 
        return res.status(401).json({message:"UnAuthorized"})
    }
    jwt.verify(token,secretKey,(err,user)=>{
        if(err){
            return res.status(403).json({message:"Something Went Wrong"});
        }
        req.user = user ;
        next()
    })


}

app.route("/tasks")
    .get(authenticationMiddleWare,(req,res)=>{
        const user = users.find((u)=>u.email === req.user.email)
        
        res.json({tasks:user.tasks})
    })
    .post(authenticationMiddleWare,(req,res)=>{
        const task = req.body
        const user = users.find((u)=>u.email === req.user.email)
        console.log(task)
        user.tasks.push({id:uuidv4(),task:task.task,status: "pending"})
        res.json({ message: 'Task added successfully'});

    })
    .put(authenticationMiddleWare,(req,res)=>{
        const user = users.find((u) => u.email === req.user.email);
        const { taskId, updatedTask, status } = req.body;
        const targetTask = user.tasks.find((task) => task.id === taskId);
        if (updatedTask) {
          targetTask.task = updatedTask;
        }
        if (status) {
          targetTask.status = status;
        }
        res.json({ message: "Task updated successfully" });
    })
    .delete(authenticationMiddleWare,(req,res)=>{
        const user = users.find(u => u.email === req.user.email);
        const { taskId } = req.body;
        const taskIndex = user.tasks.findIndex(task => task.id === taskId);
        user.tasks.splice(taskIndex, 1);
        res.json({ message: 'Task deleted successfully', tasks: user.tasks });

    })

app.listen(PORT,()=>console.log("SERVER IS LISTENING"));