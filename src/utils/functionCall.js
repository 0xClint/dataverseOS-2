
import { ethers } from "ethers";
import {
    LEADERBOARD_CONTRACT_ABI,
    LEADERBOARD_CONTRACT_ADDRESS,
    ROOM_CONTRACT_ABI,
    ROOM_CONTRACT_ADDRESS,
    USER_CONTRACT_ABI,
    USER_CONTRACT_ADDRESS
} from "./constants";
import { Database } from "@tableland/sdk";

export const readTableFunc = async (signer, tableName) => {
    try {
        const db = new Database({ signer });
        if (tableName !== undefined) {
            const { results } = await db
                .prepare(`SELECT * FROM ${tableName}`)
                .all();
            console.log(results);
            return results
        }
    } catch (err) {
        console.error(err.message);
    }
}

// ***********************USER_CONTRACT_FUNCTION *****************************

export const createUserFunc = async (signer, { name,
    bio,
    cid, color
}) => {

    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        USER_CONTRACT_ADDRESS,
        USER_CONTRACT_ABI,
        signer
    );
    const tx = await contract.createUser(name, bio, cid, color, "1", account, "data");
    await tx.wait();
    console.log(tx)
};

export const updateUserFunc = async (signer) => {
    const contract = new ethers.Contract(
        USER_CONTRACT_ADDRESS,
        USER_CONTRACT_ABI,
        signer
    );
    const tx = await contract.updateUser(1, "name100", "bio100", "cid100", "color100", "guns100", "addr100", "data100");
    await tx.wait();
    console.log(tx)
};

export const deleteUserFunc = async (signer) => {
    const contract = new ethers.Contract(
        USER_CONTRACT_ADDRESS,
        USER_CONTRACT_ABI,
        signer
    );
    const tx = await contract.deleteUser(1);
    await tx.wait();
    console.log(tx)
};

export const getUserTableNameFunc = async (signer) => {
    const contract = new ethers.Contract(
        USER_CONTRACT_ADDRESS,
        USER_CONTRACT_ABI,
        signer
    );
    const tx = await contract.getUserTableName();
    console.log(tx)
};

// ***********************ROOM_CONTRACT_FUNCTION *****************************

export const getRoomTableNameFunc = async (signer) => {
    const contract = new ethers.Contract(
        ROOM_CONTRACT_ADDRESS,
        ROOM_CONTRACT_ABI,
        signer
    );
    const tx = await contract.getRoomTableName();
    console.log(tx)
};

export const createRoomFunc = async (signer, roomId, map) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        ROOM_CONTRACT_ADDRESS,
        ROOM_CONTRACT_ABI,
        signer
    );
    const tx = await contract.createRoom(roomId, JSON.stringify([account]), "1", "open", "gun1", map, "data");
    await tx.wait();
    console.log(tx)
};

export const updateRoomFunc = async (signer, roomData) => {
    let { addr, data, gun, id, roomid, map, people, status } = roomData;
    // console.log(addr, data, gun, id, roomid, map, people, status);
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        ROOM_CONTRACT_ADDRESS,
        ROOM_CONTRACT_ABI,
        signer
    );
    const tx = await contract.updateRoom(roomid, JSON.stringify([...addr, account]), (parseInt(people) + 1).toString(), "open", gun, map, data);
    await tx.wait();
    console.log(tx)
};

export const deleteRoomFunc = async (signer, roomID) => {
    const contract = new ethers.Contract(
        ROOM_CONTRACT_ADDRESS,
        ROOM_CONTRACT_ABI,
        signer
    );
    const tx = await contract.deleteRoom(roomID);
    await tx.wait();
    console.log(tx)
};

// ***********************LEADERBOARD_CONTRACT_FUNCTION *****************************

export const getLeadboardTableNameFunc = async (signer) => {
    const contract = new ethers.Contract(
        LEADERBOARD_CONTRACT_ADDRESS,
        LEADERBOARD_CONTRACT_ABI,
        signer
    );
    const tx = await contract.getLeadboardTableName();
    console.log(tx)
};


export const updateLeaderboardFunc = async (signer,
    id,
    killstate,
    roomState) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        LEADERBOARD_CONTRACT_ADDRESS,
        LEADERBOARD_CONTRACT_ABI,
        signer
    );
    let totalTime = 0;
    console.log(killstate)
    for (let i = 1; i < killstate.length; i++) {
        totalTime = killstate[i] - killstate[i - 1];
    }
    console.log(id, account, totalTime / killstate.length, roomState.gun, roomState.map,)
    const tx = await contract.updateLeaderboard(id, account, (totalTime / (killstate.length * 1000)).toString(), roomState.gun, roomState.map, "data");
    await tx.wait();
    console.log(tx)
};







