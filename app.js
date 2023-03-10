const express=require("express")
const bodyParser=require("body-parser")
const ejs=require("ejs")
const app=express()
const mongoose=require("mongoose")
mongoose.connect("mongodb+srv://AshmitRanjan:Ashmit17@cloud.jcw7c9u.mongodb.net/Notes?retryWrites=true&w=majority",{useNewUrlParser:true})

const Schema=new mongoose.Schema({
    title:String,
    body:String
})

const Items=new mongoose.model("item",Schema)
const Links=new mongoose.model("link",Schema)

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

app.set("view engine","ejs")

app.get("/",function(req,res){
    res.render("home")
})

app.get("/home",function(req,res){
    res.render("home")
})

app.post("/form1",function(req,res){
    let t=req.body.Ntext
    let b=req.body.Nbody
    const item=new Items({
        title:t,
        body:b
    })
    item.save()
    res.render("home")
})

app.post("/form2",function(req,res){
    let tL=req.body.LText
    let tB=req.body.LBody
    const item1=new Links({
        title:tL,
        body:tB
    })
    item1.save()
    res.redirect("home")
})

app.post("/composeNote",function(err,res){
    res.render("composeNote")
})

app.post("/composeLink",function(req,res){
    res.render("composeLink")
})


app.get("/notes",function(err,res){
    Items.find({},function(err,foundItems){
        console.log(foundItems)
        res.render("notes",{
            NT:foundItems,
            })
    })
})

app.get("/links",function(err,res){
    Links.find({},function(err,foundLinks){
        res.render("links",{
            LT:foundLinks,
        })
    })
})

app.post("/delete",function(req,res){
        const id=req.body.checkbox;
        Items.deleteOne({_id:id},function(err,req){
            if(err){
                console.log(err)
            }
        })
        Items.find({},function(err,foundItems){
            res.render("notes",{
                NT:foundItems,
            })
        })
    })

    app.post("/deleteL",function(req,res){
        const id=req.body.checkbox;
        Links.deleteOne({_id:id},function(err,req){
            if(err){
                console.log(err)
            }
        })
        Links.find({},function(err,foundItems){
            res.render("links",{
                LT:foundItems,
            })
        })
    })



app.listen(3000,function(req){
    console.log("Server running on port 3000")
})