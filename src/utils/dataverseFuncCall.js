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

const dataverseConnector = new DataverseConnector();

const connectWallet = async () => {
    const res = await dataverseConnector.connectWallet({
        wallet: WALLET.METAMASK,
    });
    // console.log(res);
};

export const createCapability = async () => {
    await dataverseConnector.connectWallet({
        wallet: WALLET.METAMASK,
    });
    // console.log(process.env.REACT_APP_DATAVERSE_APP_ID)

    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.createCapability,
        params: {
            appId: process.env.REACT_APP_DATAVERSE_APP_ID,
        },
    });
    console.log(res);
};

export const checkCapability = async () => {
    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.checkCapability,
        params: {
            appId: process.env.REACT_APP_DATAVERSE_APP_ID,
        },
    });
    console.log(res);
};

export const checkUser = async () => {

    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.loadFolderTrees,
    });
    // console.log(res);
    const data = Object.keys(res).filter((id) => {
        const { folderName } = res[id];
        if (folderName == "warfield") return id;
    });
    return data.length ? false : true;
};


export const getFolderData = async () => {

    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.loadFolderTrees,
    });
    console.log(res);
    const data = Object.keys(res).filter((id) => {
        const { folderName } = res[id];
        if (folderName == "warfield") return id;
    });
    const fileId = res[data].mirrorRecord;

    const res1 = await dataverseConnector.runOS({
        method: SYSTEM_CALL.loadBareFileContent,
        params: fileId[Object.keys(fileId)[0]].mirrorId,
    });
    console.log(JSON.parse(res1))
    return JSON.parse(res1);
};


export const createFolder = async () => {
    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.createFolder,
        params: {
            folderType: FolderType.Private,
            folderName: "warfield",
        },
    });
    // console.log();
    return res.newFolder.folderId
};


export const createBareFile = async ({
    folderId,
    name,
    bio,
    age,
    cid,
    color
}) => {

    const data = {
        name,
        bio,
        age,
        cid,
        color,
    }
    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.createBareFile,
        params: {
            folderId,
            fileBase64: JSON.stringify(data),
            fileName: "Profile",
            storageProvider: {
                name: StorageProviderName.Web3Storage,
                apiKey:
                    process.env.REACT_APP_WEB3STORAGE_TOKEN,
            },
        },
    });
    console.log(res);
};

const addChat = async (username) => {
    const profileModelId =
        "kjzl6hvfrbw6cacq70mj5uodxobjrcrj2oniv75slueqmq1hrexcxtt5tozhnxd";
    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.createIndexFile,
        params: {
            modelId: profileModelId,
            fileName: "chat",
            fileContent: {
                modelVersion: "0.0.1",
                name: "username",
                description: "tempprofileDescription2",
                image:
                    "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                background: "black",
            },
        },
    });
    console.log(res);
};

const fetchBareFile = async () => {
    const res = await dataverseConnector.runOS({
        method: SYSTEM_CALL.loadBareFileContent,
        // params: "kjzl6kcym7w8y8avvxck0q4logiadprh174znzcmlh30ew3h57b0sjachmabb1k",
    });
    console.log(JSON.parse(res));
};