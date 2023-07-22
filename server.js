const express = require("express")
const app = express();
const User = require("./model.js")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/",async(req,res)=>{
    
    const {text}= req.body;
    try{
        const user = new User({text})
        await user.save();
        res.status(200).json(user);
    }
    catch(error){
        console.log(error);
        res.status(500).json(error)
    }
})

app.put("/update", async (req, res) => {
    const { n, _id, updatedtext } = req.body;
    try {
        // Update the specific element in the array using dot notation
        const result = await User.updateOne({ _id }, {
            $set: {
                [`text.${n}`]: updatedtext
            }
        });

        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json(error);
    }
});
app.put("/delete", async (req, res) => {
    const { text, _id } = req.body;
    try {
        // Update the specific element in the array using $pull
        const result = await User.updateOne({ _id }, {
            $pull: {
                text: { $eq: text } // Remove the element that matches the value of 'n'
            }
        });

        res.status(200).json("deleted");
    } catch (error) {
        res.status(500).json(error);
    }
});

app.put("/addnew", async (req, res) => {
    const { newtext, _id } = req.body;
    try {
        // Update the specific element in the array using $push
        const result = await User.updateOne({ _id }, {
            $push: {
                text: newtext
            }
        });

        res.status(200).json("updated");
    } catch (error) {
        res.status(500).json(error);
    }
});
app.get("/all", async (req, res) => {
    try {
        const all = await User.find(); // Use await to wait for the query execution
        console.log(all);
        res.status(200).json(all);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});


const mongoose = require("mongoose")
const dbURI =  "mongodb+srv://guddu:guddu@cluster1.ved7bni.mongodb.net/yes?retryWrites=true&w=majority";
mongoose.connect(dbURI ,{useNewUrlParser : true , useUnifiedTopology: true})
.then((result)=>{const PORT = process.env.PORT || 8888;
    app.listen(PORT, ()=>{
        console.log("server is created")
    })})
.catch((err)=>console.log(err))      