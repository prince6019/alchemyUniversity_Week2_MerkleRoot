const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // By having merkleroot of nicelist on both sides and verify proof on the server side by merkleroot on server side.
  const randomIndex = Math.floor(Math.random() * niceList.length);
  const name = niceList[randomIndex];
  console.log(name);

  const merkleTree = new MerkleTree(niceList);

  const root = merkleTree.getRoot();
  console.log(root);

  const proof = merkleTree.getProof(randomIndex);

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    // TODO: add request body parameters here!
    name: name,
    proof: proof,
  });

  console.log({ gift });
}

main();
