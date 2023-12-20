
import { ethers } from "ethers";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "./constants";

// ******************WORLD NFT Function call****************************

export const callFunction = async (signer) => {
    const account = await signer.getAddress();
    const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
    );
    const tx = await contract.wrap(2);
    await tx.wait();
    console.log(tx)
};


// export const updateUserAvatarImageFunc = async (signer) => {
//     const account = await signer.getAddress();
//     const contract = new ethers.Contract(
//         AVATAR_NFT_CONTRACT_ADDRESS,
//         AVATAR_NFT_CONTRACT_ABI,
//         signer
//     );
//     const tx = await contract.updateUserAvatarImage("CID", "updated attribute");
//     await tx.wait();
//     console.log(tx)
// };

// export const setUserInfoFunc = async (signer) => {
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


