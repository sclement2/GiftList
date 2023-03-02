// Utility to create input for MerkleTree Gift.
// Name selected from the niceList is random at this point in time
// Usage: node utils/produceProof.js

const fs = require("fs");
const niceList = require("./niceList.json"); // Used to get a valid name
const MerkleTree = require("./MerkleTree"); // Used to generate proof
const leaves = niceList;
const niceListTree = new MerkleTree(leaves);
const name = niceList[Math.floor(Math.random() * 1000)]; // pick a random name from the Nice List
const index = niceList.findIndex((n) => n === name);
proof = niceListTree.getProof(index); // valid proof for the selected name

try {
  let out = '{"name": "' + name + '",' + '\n "proof": ';
  proof = JSON.stringify(proof);
  out += proof;
  out += " }";
  const data = Buffer.from(JSON.stringify(out)).toString();
  fs.writeFileSync("./client/input.json", out, { flag: "w" });
} catch (e) {
  console.log(e);
}
