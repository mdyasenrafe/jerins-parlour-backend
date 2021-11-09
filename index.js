const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

const uri = ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6mulb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// run function
async function run() {
  try {
    await client.connect();
    const database = client.db("Jerin_Parlour");
    const servicesCollection = database.collection("services");
    const reviewsCollection = database.collection("reviews");
    // services api
    app.get("/services", async (req, res) => {
      const cursors = servicesCollection.find();
      const result = await cursors.toArray();
      res.send(result);
    });
    // reviews api
    app.get("/reviews", async (req, res) => {
      const cursors = reviewsCollection.find();
      const result = await cursors.toArray();
      res.send(result);
    });
    console.log("database connect");
  } finally {
    //   await client.close();
  }
}
// run function call
run().catch(console.dir);

console.log(uri);
app.get("/", (req, res) => {
  res.send("<h1>This is Jerin Parlour Server</h1>");
});
app.listen(port, () => {
  console.log("sucessfully work by ", port);
});
