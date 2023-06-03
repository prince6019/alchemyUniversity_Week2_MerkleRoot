const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
const merkle_Root =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";
// paste the hex string in here, without the 0x prefix

app.post("/gift", (req, res) => {
  // grab the parameters from the front-end here
  const body = req.body;
  const { name, proof } = body;

  // TODO: prove that a name is in the list

  let isInTheList = true;
  isInTheList = verifyProof(proof, name, merkle_Root);

  if (isInTheList) {
    res.send("You got a toy robot!");
  } else {
    res.send("You are not on the list :(");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
