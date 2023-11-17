const express = require("express");
const User = require("./Models/Users");
const Messages = require("./Models/Messages");
const cors = require("cors")
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body;

    const user = await User.findOne({email});
    if(!user){
        const Data = new User({
            name, email, password
        })
        const addData = await Data.save();
        res.json(addData);
    }else{
        res.json("That user Exists");
    }
    
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const Data = await User.findOne({email});

        if (Data.password == password) {
            res.json(Data);
        }
        else {
            res.json("Invalid Credentials");
        }
    } catch (error) {
        res.json(error)
    }
})

app.get("/fetchUsers", async (req,res) => {
    const Data = await User.find();
    res.json(Data);
})

app.post("/addChat", async (req,res) => {
    const {senderEmail,recieverEmail,Message} = req.body;

    console.log(senderEmail);
    console.log(recieverEmail);
    console.log(Message);

    const Data = new Messages({
        senderEmail,recieverEmail,Message
    })

    const addData = await Data.save();
    res.json(addData);
})

app.post("/fetchChat", async (req,res) => {
    const {senderEmail, recieverEmail} = req.body;

    const Data = await Messages.find({senderEmail:senderEmail, recieverEmail:recieverEmail});
    res.json(Data);
})

app.post("/fetchChatSender", async (req,res) => {
    const {senderEmail, recieverEmail} = req.body;

    const Data = await Messages.find({senderEmail:recieverEmail, recieverEmail:senderEmail});
    res.json(Data);
})

app.delete("/deleteChat", async (req,res) => {
    const {id} = req.body;
    const Data = await Messages.findByIdAndDelete(id);
    res.json(Data);
})

app.listen(port, () => {
    console.log(port);
})