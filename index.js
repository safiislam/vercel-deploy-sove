const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
require('dotenv').config()

// middlewares
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =`mongodb+srv://${process.env.BOSS_USER}:${process.env.BOSS_PASS}@cluster0.yrhbvyy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {


    const menuCollection = client.db('bossDB').collection('menu')
    const reviewCollection = client.db('bossDB').collection('review')
    app.get('/menu', async (req,res)=>{
        const result = await menuCollection.find().toArray()
        res.send(result)
    })
    app.get('/review', async (req,res)=>{
        const result = await reviewCollection.find().toArray()
        res.send(result)
    })

    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection



     client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port);
