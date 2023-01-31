const axios = require("axios");
const niceList = require("../utils/niceList.json"); // Used to generate cases with no name provided
const MerkleTree = require("../utils/MerkleTree"); // Used to generate cases with name or proof not provided
const e = require("express");

const serverUrl = "http://localhost:1225";

async function main() {
  // how do we prove to the server we're on the nice list?
  let args = process.argv; // enables input on the command line
  let proof;
  let leaves = niceList;
  let name = args[2];

  /* used to generate some proofs to send. In general it should be assumed the user will actually provide 
  a proof and not have access to the Nice List */
  if (args[2] === undefined) {
    // corresponds to no parameters passed as part of calling the client
    const niceListTree = new MerkleTree(leaves);
    name = niceList[Math.floor(Math.random() * 1000)]; // pick a random name from the Nice List
    const index = niceList.findIndex((n) => n === name);
    proof = niceListTree.getProof(index);
  } else if (args[3] === undefined) {
    // corresponds to name being passed in but no proof
    const niceListTree = new MerkleTree(leaves);
    const index = niceList.findIndex((n) => n === name);
    proof = niceListTree.getProof(index);
  } else {
    // the else case is the name and proof are passed in as part of calling the client. This situation should be the recommended case

    // Currently only one actual proof defined. The default option is a fake proof if proof name doesn't match any case
    // and corresponds to no entry in the list.
    // This switch case would correspond to a client with no access to the nice list
    switch (args[3]) {
      case "realProof":
        //console.log(args[3]);
        proof = [
          {
            data: "9ccb96fea693976e9cf5418a191882047f8699ca606b2434c890752c8925accd",
            left: false,
          },
          {
            data: "a9af8861a84a98fb2129242bbb0b0a97903c343133bd91354b1b0c7039446a16",
            left: false,
          },
          {
            data: "1d4562b4b72ac3585be14e6ff7b90816d55a09dcfdd51a8802fb622c52682ad9",
            left: false,
          },
          {
            data: "7b0c8ffd48df62a5cc073eee734fd4fdafae5489c8950a0cdecf0058db027bb7",
            left: true,
          },
          {
            data: "3fef139d2eab499d6f50f122499ce3da0ed0c96f18a37a0d6e24a54474556e80",
            left: false,
          },
          {
            data: "ce2df6e0530d3f6f4cfa554d8091078a244cae644c2375776053c8e37eefb4a1",
            left: false,
          },
          {
            data: "cc30d78afa76ed2936a9fa7b96d81df59a0e8e1a73b175ab844e454be515637c",
            left: false,
          },
          {
            data: "16070a51b8a9700b1a9dfd2ada671c7fea6ee9d3c56d02e494d334520c953deb",
            left: false,
          },
          {
            data: "44a11637716a257506d13337979aabaf58fd2ac6cb36253905571b519d2bfb22",
            left: false,
          },
          {
            data: "cf209348f7b2723e7f5937ccaef23f006515ba0a765ca96057cc689c11a8dc5c",
            left: false,
          },
        ];
        break; // real proof for Norman Block. Assumes no access to the Nice List

      default:
        console.log("Fake Proof. Matches no entry on the Nice List");
        proof = [
          {
            data: "9ccb96fea693976e9cf5418a191882047f8699ca606b2434c890752c8925accd",
            left: false,
          },
          {
            data: "a9af8861a84a98fb2129242bbb0b0a97903c343133bd91354b1b0c7039446a16",
            left: false,
          },
          {
            data: "1d4562b4b72ac3585be14e6ff7b90816d55a09dcfdd51a8802fb622c52682ad9",
            left: false,
          },
          {
            data: "7b0c8ffd48df62a5cc073eee734fd4fdafae5489c8950a0cdecf0058db027bb7",
            left: true,
          },
          {
            data: "3fef139d2eab499d6f50f122499ce3da0ed0c96f18a37a0d6e24a54474556e80",
            left: false,
          },
          {
            data: "ce2df6e0530d3f6f4cfa554d8091078a244cae644c2375776053c8e37eefb4a1",
            left: false,
          },
          {
            data: "cc30d78afa76ed2936a9fa7b96d81df59a0e8e1a73b175ab844e454be515637c",
            left: false,
          },
          {
            data: "16070a51b8a9700b1a9dfd2ada671c7fea6ee9d3c56d02e494d334520c953deb",
            left: false,
          },
          {
            data: "44a11637716a257506d13337979aabaf58fd2ac6cb36253905571b519d2bfb22",
            left: true,
          },
          {
            data: "cf209348f7b2723e7f5937ccaef23f006515ba0a765ca96057cc689c11a8dc4c",
            left: false,
          },
        ];
    }
  }

  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    //request body parameters
    name,
    proof,
  });

  console.log({ gift });
}

main();
