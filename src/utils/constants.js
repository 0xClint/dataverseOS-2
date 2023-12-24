export const USER_CONTRACT_ADDRESS = "0xd65fF1e945ab3b5CC5296d76904A67bc30d81455";
export const ROOM_CONTRACT_ADDRESS = "0x52f188d45589861daA4fd7891CE3C1b24cd5E69c";
export const LEADERBOARD_CONTRACT_ADDRESS = "0xEC56BC3F660eBD33eD1027b23458A4d50B295bdf";

export const USER_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainid",
        "type": "uint256"
      }
    ],
    "name": "ChainNotSupported",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "bio",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "color",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "guns",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "createUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "id",
        "type": "uint64"
      }
    ],
    "name": "deleteUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserTableName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint64",
        "name": "id",
        "type": "uint64"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "bio",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "cid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "color",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "guns",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "updateUser",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const ROOM_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainid",
        "type": "uint256"
      }
    ],
    "name": "ChainNotSupported",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "people",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gun",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "map",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "createRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomid",
        "type": "string"
      }
    ],
    "name": "deleteRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRoomTableName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "roomid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "people",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "status",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gun",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "map",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "updateRoom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

export const LEADERBOARD_CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "chainid",
        "type": "uint256"
      }
    ],
    "name": "ChainNotSupported",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "getLeadboardTableName",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "name": "onERC721Received",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "time",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gun",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "map",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "data",
        "type": "string"
      }
    ],
    "name": "updateLeaderboard",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]