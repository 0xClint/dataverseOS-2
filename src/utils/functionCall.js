
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";
import { Database } from "@tableland/sdk";

const tableName = "starter_table_11155111_389"

export const createUserFunc = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    // const tx = await contract.getTableName();
    const tx = await contract.createUser("name1", "bio1", "addr1", "guns1", "data1");
    await tx.wait();
    console.log(tx)
};

export const insertValFunc = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    const tx = await contract.insertVal("temp-Val");
    await tx.wait();
    console.log(tx)
};

export const getUserTableNameFunc = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    const tx = await contract.getUserTableName();
    console.log(tx)
};

export const getRoomTableNameFunc = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    const tx = await contract.getRoomTableName();
    console.log(tx)
};

export const getLeadboardTableNameFunc = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    const tx = await contract.getLeadboardTableName();
    console.log(tx)
};

export const readTableFunc = async (signer, tableName) => {
    try {
        const db = new Database({ signer });
        if (tableName !== undefined) {
            const { results } = await db
                .prepare(`SELECT * FROM ${tableName}`)
                .all();
            console.log(results);
        }
    } catch (err) {
        console.error(err.message);
    }
}

export const updateValFunc = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    const tx = await contract.updateVal(1, "updated-temp-Val-2");
    await tx.wait();
    console.log(tx)
};



// export const tableNameFunc = async (signer) => {
//     const account = await signer.getAddress();
//     const contract = new ethers.Contract(
//         AVATAR_NFT_CONTRACT_ADDRESS,
//         AVATAR_NFT_CONTRACT_ABI,
//         signer
//     );
//     const tx = await contract.setUserInfo(account, 1, 2, 3, 10);
//     await tx.wait();
//     console.log(tx)
// };

// export const setUserFriendsFunc = async (signer) => {
//     const account = await signer.getAddress();
//     const contract = new ethers.Contract(
//         AVATAR_NFT_CONTRACT_ADDRESS,
//         AVATAR_NFT_CONTRACT_ABI,
//         signer
//     );
//     // const tx = await contract.setUserFriends(account, { ["add1", "add2", "add3", "add4"]});
//     await tx.wait();
//     console.log(tx)
// };

// export const fetchUserMetadataFunc = async (signer) => {
//     const account = signer.getAddress();
//     const contract = new ethers.Contract(
//         AVATAR_NFT_CONTRACT_ADDRESS,
//         AVATAR_NFT_CONTRACT_ABI,
//         signer
//     );
//     try {
//         const res = await contract.fetchUserMetadata(account);
//         console.log("res : " + res);
//     } catch (error) {
//         console.log(error.errorArgs[0]);
//         return "null";
//     }
// };


