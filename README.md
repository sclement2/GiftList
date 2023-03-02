# Merkle Tree Gift List

## Summary

The 2nd week of [Alchemy University's](https://university.alchemy.com/) Ethereum Dev Bootcamp focuses on Blockchain Storage. With that in mind you may be wondering why does this project talk about Merkle Trees? As explained during the second week's lessons the reason to understand "trees" is that blockchains have a storage problem. They require that nodes in the network store every value recorded in their shared database. For ethereum this means all account balances, as well as every persistent variable on a smart contract. Merkle Trees are an efficient and effective way to store data. The why and the wherefore associated with using Merkle trees with etheruem can be found here:

- _Here is a [technical overview](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/) of merkling in Ethereum by Vitalik Buterin. Vitalik highlights several reasons for using Patricia Merkle Tries in Ethereum_
- _Here is a [good overview of Patricia Merkle Trees on Medium](https://medium.com/shyft-network-media/understanding-trie-databases-in-ethereum-9f03d2c3325d)_
  &nbsp;
  &nbsp;

## Project Overview

The project for the second week of [Alchemy University's](https://university.alchemy.com/) Ethereum Dev Bootcamp is to build an application which gives out gifts, but only to names on a list. The catch is that on the server you are only allowed to store one 32 byte value in the server memory. This 32 byte value has to be enough for the server to be able to determine who is on the list. A root hash (Merkle Root) from a Merkle Tree meets the 32 byte requirement. In distributed systems, Merkle trees allow for easy verification of information without flooding the network with unnecessary data. As an example, in order to prove a transaction is part of a block you can request a Merkle proof. The proof proves that a transaction is or is not in a particular block. For this project the _prover_ will provide evidence that a name is part of a gift list maintained on the server, the _verifier_. If the _prover_ is successful they will receive a gift.

## Get Started

To get started with the repository, clone it and then run `npm install` in the top-level directory to install the depedencies.

There are three folders in this repository:

## Client

Think of the client as the _prover_ here. It needs to prove to the server that some `name` is in the `MERKLE_ROOT` on the server. The client will provide a `name` and a `Merkle Proof` to the server.

You can run the client from the top-level directory with `node client/index`. This file is a script which will send an HTTP request to the server.

_Client USAGE_:

- `client/index` -> _will generate random input that will match some percentage of the time_
- `client/index <name>` -> _will match since the **`<name>`** is used to generate the correct proof_
- `client/index <name> realProof1` || `client/index <name> realProof2` -> _if **`<name>`**'s proof matches **`realProof1`** or **`realProof2`** then will be a match otherwise no match. **`realProof1`** and **`realProof2`** are provided in the **`index.js`** file_
- `client/index file` -> _use the **`input.json`** file as input for name and proof. **`example-input.json`** shows what the **`input.json`** file should contain_
- `client/index help` -> _display this usage information_

## Server

Think of the server as the _verifier_ here. It needs to verify that the `name` passed by the client is in the `MERKLE_ROOT`. If it is, then we can send the gift! The verification is done by taking the information provided by the client and verifying via the `Merkle Proof` that the `name` is part of the list for which it has the `Merkle Root`.

You can run the server from the top-level directory with `node server/index`. This file is an express server which will be hosted on port 1225 and respond to the client's request.

## Utils

There are a few files in utils:

- The `niceList.json` which contains all the names of the people who deserve a gift this year (this is randomly generated, feel free to add yourself and others to this list!)
- The `example.js` script shows how we can generate a root, generate a proof and verify that some value is in the root using the proof. Try it out from the top-level folder with `node utils/example`
- The `MerkleTree.js` produces a Merkle tree from a given list of names. You should not have to deal with any crypto type conversion. You can import this in your client/server
- The `verifyProof.js` You can use this function to prove a name is in the merkle root, as shown in the example.
- The `produceProof.js` produces a JSON file (`input.json`) to be used as input for running `node client/index file`. The JSON file contains a name and an associated proof. Generate the JSON file by running `node utils/produceProof`.

---

&nbsp;

## Example Run

`>node client/index file`

The information in the file are the `name` and the `Merkle Proof`.

```JSON
{
  "name": "Veronica West",
  "proof":
  [
{"data":"a98832167ab72747b6d1330e4740677f753e33a69dfbaeb0243f85134e0ba4a0","left":false},
{"data":"8496be5a9de04400a39a700a6b1ce0ba9846d43b155fc8e861b1ae148c16399a","left":false},
{"data":"0a8f023b6a99d213cd7abd4ad13ac9f3f604f4442362184e0e148b36a9af8e98","left":false},
{"data":"391bb4f633a1fe8e6d9fc118824ebf10301e4e76afa44628bc04b247d92424bc","left":false},
{"data":"990c9b636a06c41c140e5ef9728d9eca2cef6c749c85145f7cf0aeb03fc533c2","left":true},
{"data":"0feaf30b038a3cfd04589930e080eba54dd10e94cba3de5ff3324a722e4f9ee1","left":true},
{"data":"3cf5c63e1a4d3682356096793cb02bf3842328a6d39f20e6a0214b45161e3638","left":false},
{"data":"6b57c2680cf622d2e5c4d0abe967531b0a8b69ff2eff5e5b678c377729b812bf","left":false},
{"data":"1a59f6ae0ef8790e30f6fff2f4ff961d2687942b497e464486655f57a09c7679","left":true},
{"data":"3fe580aa5460ffc803ed4b0d8a1f4f1821128df06d6bc3e272621900424d8f68","left":true}
  ]
}
```

The result after the server verifies the `name` is present in the gift list is a gift.

`>{ gift: 'Veronica West, you got a toy robot!' }`
