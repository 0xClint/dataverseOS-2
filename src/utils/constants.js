export const CONTRACT_ADDRESS =
  "0x32cA7D605Aa09EaDa6E0ecE7AC68C8668dEc21C4";


export const CONTRACT_ABI = [
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
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "guns",
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
        "internalType": "uint64[]",
        "name": "roomIds",
        "type": "uint64[]"
      }
    ],
    "name": "deleteRoom",
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
    "name": "getLeaderboardTableId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
      }
    ],
    "name": "getPolicy",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "allowInsert",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "allowUpdate",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "allowDelete",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "whereClause",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "withCheck",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "updatableColumns",
            "type": "string[]"
          }
        ],
        "internalType": "struct TablelandPolicy",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
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
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "getPolicy",
    "outputs": [
      {
        "components": [
          {
            "internalType": "bool",
            "name": "allowInsert",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "allowUpdate",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "allowDelete",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "whereClause",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "withCheck",
            "type": "string"
          },
          {
            "internalType": "string[]",
            "name": "updatableColumns",
            "type": "string[]"
          }
        ],
        "internalType": "struct TablelandPolicy",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getRoomTableId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getUserTableId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
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
        "name": "addr",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "guns",
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