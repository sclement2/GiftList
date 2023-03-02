const fs = require("fs");
const axios = require("axios");
const niceList = require("../utils/niceList.json"); // Used to generate cases with no name provided
const MerkleTree = require("../utils/MerkleTree"); // Used to generate cases with name or proof not provided
const e = require("express");

const serverUrl = "http://localhost:1225";

async function main() {
  // how do we prove to the server we're on the nice list?
  let args = process.argv; // enables input on the command line
  //console.log(args);
  let proof;
  let leaves = niceList;
  let name = args[2] + " " + args[3];

  /* used to generate some proofs to send. In general it should be assumed the user will actually provide a proof and not have access to the Nice List */

  if (args[2] === undefined) {
    // corresponds to no parameters passed as part of calling the client
    const niceListTree = new MerkleTree(leaves);
    name = niceList[Math.floor(Math.random() * 1000)]; // pick a random name from the Nice List
    const index = niceList.findIndex((n) => n === name);
    const rnd = Math.floor(Math.random() * 10);
    //console.log(rnd);
    if (rnd === 1) {
      proof = niceListTree.getProof(Math.floor(Math.random() * 1000));
      console.log("Fake proof");
    } else {
      proof = niceListTree.getProof(index);
    }
    console.log('{ "name": "' + name + '",');
    console.log(('"proof": ' + JSON.stringify(proof)).toString() + " }\n");
  } else if (
    args[2].toLowerCase() == "help" ||
    args[2].toLowerCase() == "info"
  ) {
    console.log(
      "USAGE: \n" +
        "client/index       <will generate random input that will match some percentage of the time>\n" +
        "client/index name  <will match since the name is used to generate the correct proof>\n" +
        "client/index name realProof1 <or> " +
        "client/index name realProof2  \n<if name matches realProof1 or realProof2 then will be a match otherwise no match>\n" +
        "client/index file  <use the input.json file as input for name and proof>\n" +
        "client/index help  <generates this info>"
    );
    process.exit(0);
  } else if (
    args[2].toLowerCase() == "file" ||
    args[2].toLowerCase() == "json"
  ) {
    const fileText = fs.readFileSync("./client/input.json");
    const jsonParsed = JSON.parse(fileText);
    //print JSON object
    //console.log(jsonParsed.proof);
    name = jsonParsed.name;
    proof = jsonParsed.proof;
    console.log('{ "name": "' + name + '",');
    console.log(('"proof": ' + JSON.stringify(proof)).toString() + " }\n");
  } else if (args[4] === undefined) {
    // corresponds to name being passed in but no proof
    const niceListTree = new MerkleTree(leaves);
    const index = niceList.findIndex((n) => n === name);
    proof = niceListTree.getProof(index);
    console.log('{ "name": "' + name + '",');
    console.log(('"proof": ' + JSON.stringify(proof)).toString() + " }\n");
  } else {
    // Currently only two proofs defined for the names listed in the switch.
    // The default option is a fake proof if proof name doesn't match any switch name
    // The default switch case would correspond to a client with no access to the nice list
    switch (args[4]) {
      case "realProof1":
        //name = Veronica West;
        console.log("realProof1 matches Veronica West on the Nice List");
        proof = [
          {
            data: "a98832167ab72747b6d1330e4740677f753e33a69dfbaeb0243f85134e0ba4a0",
            left: false,
          },
          {
            data: "8496be5a9de04400a39a700a6b1ce0ba9846d43b155fc8e861b1ae148c16399a",
            left: false,
          },
          {
            data: "0a8f023b6a99d213cd7abd4ad13ac9f3f604f4442362184e0e148b36a9af8e98",
            left: false,
          },
          {
            data: "391bb4f633a1fe8e6d9fc118824ebf10301e4e76afa44628bc04b247d92424bc",
            left: false,
          },
          {
            data: "990c9b636a06c41c140e5ef9728d9eca2cef6c749c85145f7cf0aeb03fc533c2",
            left: true,
          },
          {
            data: "0feaf30b038a3cfd04589930e080eba54dd10e94cba3de5ff3324a722e4f9ee1",
            left: true,
          },
          {
            data: "3cf5c63e1a4d3682356096793cb02bf3842328a6d39f20e6a0214b45161e3638",
            left: false,
          },
          {
            data: "6b57c2680cf622d2e5c4d0abe967531b0a8b69ff2eff5e5b678c377729b812bf",
            left: false,
          },
          {
            data: "1a59f6ae0ef8790e30f6fff2f4ff961d2687942b497e464486655f57a09c7679",
            left: true,
          },
          {
            data: "3fe580aa5460ffc803ed4b0d8a1f4f1821128df06d6bc3e272621900424d8f68",
            left: true,
          },
        ];
        console.log('{ "name": "' + name + '",');
        console.log(('"proof": ' + JSON.stringify(proof)).toString() + " }\n");
        break;
      case "realProof2":
        //name = Marguerite Kris;
        console.log("realProof2 matches Marguerite Kris on the Nice List");
        proof = [
          {
            data: "88adbef9c1610dea1ab98140109594b28d78ccc349321973ce313341280c8056",
            left: true,
          },
          {
            data: "c6740db0cfe186f2829b7f911afa1d1a1ff82a335d9e7eff980c3c64ce8c95fd",
            left: true,
          },
          {
            data: "4d6000a251a4f4a25de28fe53c0adeac38d05ba561a83374698283a0fd4b882f",
            left: true,
          },
          {
            data: "8a801b381a1a09ae9a2db131601f739ab5ff1f2bf6bc5aea282269f3dcc7717b",
            left: false,
          },
          {
            data: "a262d1a980cb6793bd87c7e1654c4da7bd7aa63c1149aa8d9c94fea203a82f40",
            left: false,
          },
          {
            data: "7bfe678de065c0e84873b57badb6e85aaadd0ce27cb749d22d7a94e7222089cf",
            left: true,
          },
          {
            data: "58b9e69cf3a1ef5657e28905452a2c3187e222fe469c5a1175a99ba452847c39",
            left: false,
          },
          {
            data: "2bcb681b07aa7d308b06f8b74014f197bdc1cbc945c30a897ce7f3c11f8bb2c0",
            left: false,
          },
          {
            data: "703f4207ff4f8efe8b62e80350739b7feea30e3b8eb518f3030adc8b4a22ec43",
            left: false,
          },
          {
            data: "3fe580aa5460ffc803ed4b0d8a1f4f1821128df06d6bc3e272621900424d8f68",
            left: true,
          },
        ];
        console.log('{ "name": "' + name + '",');
        console.log(('"proof": ' + JSON.stringify(proof)).toString() + " }\n");
        break;
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
        console.log('{ "name": "' + name + '",');
        console.log(('"proof": ' + JSON.stringify(proof)).toString() + " }\n");
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
