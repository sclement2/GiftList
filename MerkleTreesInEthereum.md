# Merkle Trees in Ethereum

Here is a [technical overview](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/) of merkling in Ethereum by Vitalik Buterin. Vitalik highlights several reasons for using Patricia Merkle Tries in Ethereum:

- Efficient data verification (from its merkle properties)
- More complex light-client queries
- Can quickly change values and only recompute a portion of the tree (prevents some DDOS attack vectors)
- There is a limit to the depth of the tree, which prevents other DDOS attack vectors
- The order of the updates do not matter for the root hash

Ethereum nodes maintain four tries:

- A **state trie** which contains information about Ethereum accounts
- A **storage trie** which is where we can write persistent data from smart contracts
- A **transactions trie** which contains the transactions stored in a block
- A **receipts trie** which contains log/event information from contracts

Here is a [good overview of Patricia Merkle Trees on Medium](https://medium.com/shyft-network-media/understanding-trie-databases-in-ethereum-9f03d2c3325d). This article references some images from a [stack overflow answer](https://ethereum.stackexchange.com/a/6413/18953) which are extremely helpful to look at!

## Quick Note on RLP

We're going to be seeing RLP come up quite a bit. This is a serialization format used in Ethereum, you can think of it like JSON. It is used to send data from one machine to another in a format where the machine knows how to parse the data.

You can find more information on [RLP here](https://eth.wiki/en/fundamentals/rlp).

> As the docs here point out "In summary, RLP is like a binary encoding of JSON, if JSON were restricted only to strings and arrays."
