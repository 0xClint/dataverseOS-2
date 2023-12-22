import React, { useState } from "react";
import {
  ChainId,
  Currency,
  DatatokenType,
  DataverseConnector,
  FolderType,
  SYSTEM_CALL,
  StorageProviderName,
  WALLET,
} from "@dataverse/dataverse-connector";
import {
  callFunction,
  insertValFunc,
  readTableFunc,
  updateValFunc,
} from "../utils/functionCall";
import { ethers } from "ethers";

const appId = "c262bfaf-11f2-4719-bd53-911b1edf6e5f";
const profileModelId =
  "kjzl6hvfrbw6cacq70mj5uodxobjrcrj2oniv75slueqmq1hrexcxtt5tozhnxd";

const Temp = () => {
  const dataverseConnector = new DataverseConnector();
  const connectWallet = async () => {
    const res = await dataverseConnector.connectWallet({
      wallet: WALLET.METAMASK,
    });
    // console.log(res);
  };

  const getDappTable = async () => {
    const pkh = await dataverseConnector.getDAppTable();
    console.log(pkh);
  };

  const getTableInfo = async () => {
    //    "id": "c262bfaf-11f2-4719-bd53-911b1edf6e5f",
    // "address": "0x4879C8fE002b942A7534F333D3E49EC7742D101c"
    const pkh = await dataverseConnector.getDAppInfo(appId);
    console.log(pkh);
  };

  const createCapability = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createCapability,
      params: {
        appId,
      },
    });
    console.log(res);
  };

  const checkCapability = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.checkCapability,
      params: {
        appId,
      },
    });
    console.log(res);
  };

  const getValidAppCaps = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.getValidAppCaps,
    });
    console.log(res);
  };

  const getModelBasicInfo = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.getModelBaseInfo,
      // params: profileModelId,
      params: "kjzl6hvfrbw6c841b6wg3rznbzrwzprjjrlvhoni1bhzu8r3yhbrpqqdmoomy0g",
    });
    console.log(res);
  };
  const createComment = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createIndexFile,
      params: {
        modelId:
          "kjzl6hvfrbw6c841b6wg3rznbzrwzprjjrlvhoni1bhzu8r3yhbrpqqdmoomy0g",
        fileName: "comment",
        fileContent: {
          modelVersion: "0.0.1",
          name: "comment",
          description: "tempprofileDescription2",
          image:
            "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          background: "black",
        },
      },
    });
    console.log(res);
  };

  const createFolder = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createFolder,
      params: {
        folderType: FolderType.Private,
        folderName: "folder10",
      },
    });
    console.log(res);
  };

  const loadFolderTrees = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadFolderTrees,
    });
    console.log(res);
  };

  const deleteFolder = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.deleteFolder,
      params: {
        folderId:
          "kjzl6kcym7w8y801mb6n9q5b74ym4xv1zttwqyvi5koq9uzp94ihw8s027qwov4",
      },
    });
    console.log(res);
  };

  const createProfile = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createIndexFile,
      params: {
        modelId: profileModelId,
        fileName: "profileFilename1account2",
        fileContent: {
          modelVersion: "0.0.1",
          name: "tempProfile2account2",
          description: "tempprofileDescription2",
          image:
            "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          background: "black",
        },
      },
    });
    console.log(res);
  };

  const fetchProfiles = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadFilesBy,
      params: {
        modelId: profileModelId,
        // pkh: "did:pkh:eip155:1:0xb067B6A853087A4839d1fc2d3449963145428F3b",
      },
    });
    console.log(res);
  };
  // "kjzl6kcym7w8yahe0vo3u47r4sxrb9fzmht6f7ggmz0v5yloq4m4rcyrko32jh8",
  // const monetizeFile = async () => {
  //   const res = await dataverseConnector.runOS({
  //     method: SYSTEM_CALL.monetizeFile,
  //     params: {
  //       fileId:
  //         "kjzl6kcym7w8yahe0vo3u47r4sxrb9fzmht6f7ggmz0v5yloq4m4rcyrko32jh8",
  //       datatokenVars: {
  //         type: DatatokenType.Profileless,
  //         chainId: ChainId.PolygonMumbai,
  //         collectModule: "LimitedFeeCollectModule",
  //         collectLimit: 100,
  //         currency: Currency.WMATIC,
  //         amount: 0.0001,
  //         recipient: "0x9C7aD87F66Dcd579591adDf51341C54121A1aA00",
  //       },
  //     },
  //   });
  // };

  // const loadDataTokens = async () => {
  //   const res = await dataverseConnector.runOS({
  //     method: SYSTEM_CALL.loadCreatedDatatokenFiles,
  //   });
  //   console.log(res);

  //   await dataverseConnector.runOS({
  //     method: SYSTEM_CALL.loadCollectedDatatokenFiles,
  //   });
  // };
  // const collectFile = async () => {
  //   const res = await dataverseConnector.runOS({
  //     method: SYSTEM_CALL.collectFile,
  //     params: {
  //       fileId:
  //         "kjzl6kcym7w8yahe0vo3u47r4sxrb9fzmht6f7ggmz0v5yloq4m4rcyrko32jh8",
  //     },
  //   });
  //   console.log(res);
  // };

  const createBareFile = async () => {
    const data = {
      name: "Player1",
      bio: "bioLink",
      age: 10,
    };
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.createBareFile,
      params: {
        // folderId,
        fileBase64: JSON.stringify(data),
        fileName: "Profile2",
        storageProvider: {
          name: StorageProviderName.Web3Storage,
          apiKey:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDRhMzczNWI5MTNGZjkwNjkxYTdmMmNFODcyOGRlNmY1OEVCQzhCMEYiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODcxMTU3MjA5MTgsIm5hbWUiOiJmaWxlc3RhbXAifQ.k-lt_SaJOBIpRkF17PcBAyW6PasKxCZDLsD6fM3llH4",
        },
      },
    });
    console.log(res);
  };

  const fetchBareFile = async () => {
    const res = await dataverseConnector.runOS({
      method: SYSTEM_CALL.loadBareFileContent,
      params: "kjzl6kcym7w8y8avvxck0q4logiadprh174znzcmlh30ew3h57b0sjachmabb1k",
    });
    console.log(JSON.parse(res));
  };

  const readTable = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    await readTableFunc(signer);
  };
  const functionCall = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    await callFunction(signer);
  };
  const insertValue = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    await insertValFunc(signer);
  };
  const updateValue = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    await updateValFunc(signer);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-5">
      <button
        onClick={() => connectWallet()}
        className="border px-10 border-black"
      >
        Connect Wallet
      </button>
      <button
        onClick={() => functionCall()}
        className="border px-10 border-black"
      >
        FunctionCall
      </button>
      <button onClick={() => readTable()} className="border px-10 border-black">
        readTable
      </button>
      <button
        onClick={() => insertValue()}
        className="border px-10 border-black"
      >
        insertValue
      </button>
      <button
        onClick={() => updateValue()}
        className="border px-10 border-black"
      >
        updateValue
      </button>
      <button
        onClick={() => getTableInfo()}
        className="border px-10 border-black"
      >
        getDappInfo
      </button>
      <button
        onClick={() => checkCapability()}
        className="border px-10 border-black"
      >
        checkCapability
      </button>
      <button
        onClick={() => createCapability()}
        className="border px-10 border-black"
      >
        createCapability
      </button>
      <button
        onClick={() => getValidAppCaps()}
        className="border px-10 border-black"
      >
        getValidAppCaps
      </button>
      <button
        onClick={() => getModelBasicInfo()}
        className="border px-10 border-black"
      >
        getModelBasicInfo
      </button>
      <button
        onClick={() => createFolder()}
        className="border px-10 border-black"
      >
        createFolder
      </button>
      <button
        onClick={() => loadFolderTrees()}
        className="border px-10 border-black"
      >
        loadFolderTrees
      </button>
      <button
        onClick={() => deleteFolder()}
        className="border px-10 border-black"
      >
        deleteFolder
      </button>
      <button
        onClick={() => createProfile()}
        className="border px-10 border-black"
      >
        createProfile
      </button>
      <button
        onClick={() => fetchProfiles()}
        className="border px-10 border-black"
      >
        fetchProfiles
      </button>
      {/* <button
        onClick={() => monetizeFile()}
        className="border px-10 border-black"
      >
        monetizeFile
      </button>
      <button
        onClick={() => loadDataTokens()}
        className="border px-10 border-black"
      >
        loadDataTokens
      </button>
      <button
        onClick={() => collectFile()}
        className="border px-10 border-black"
      >
        collectFile
      </button> */}
      <button
        onClick={() => createBareFile()}
        className="border px-10 border-black"
      >
        createBareFile
      </button>
      <button
        onClick={() => fetchBareFile()}
        className="border px-10 border-black"
      >
        fetchBareFile
      </button>
      <button
        // onClick={() => handleButton()}
        className="border px-10 border-black"
      >
        handleButton
      </button>
    </div>
  );
};

export default Temp;
