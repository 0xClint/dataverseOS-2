// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

// Starter template for contract owned and controlled tables
contract Starter is ERC721Holder {
    uint256 private userTableId;
    uint256 private roomTableId;
    uint256 private leaderboardTableId;

    string private constant _USER_TABLE_PREFIX = "user_table";
    string private constant _ROOM_TABLE_PREFIX = "room_table";
    string private constant _LEADERBOARD_TABLE_PREFIX = "leaderboard_table";

    constructor() {
        // Create UserTable
        userTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "name text,"
                "bio text,"
                "addr text,"
                "guns text,"
                "data text",
                _USER_TABLE_PREFIX
            )
        );

        // Create RoomTable
        roomTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "roomid integer primary key,"
                "addr text,"
                "people text,"
                "status text,"
                "gun text",
                _ROOM_TABLE_PREFIX
            )
        );

        // Create Leaderboard
        leaderboardTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key"
                "addr text,"
                "time text,"
                "gun text",
                _LEADERBOARD_TABLE_PREFIX
            )
        );

        // Putting 10 Random Entries in Leaderboard
        _initializeLeaderboardZero();
    }

    function getUserTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_USER_TABLE_PREFIX, userTableId);
    }

    function getRoomTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_ROOM_TABLE_PREFIX, roomTableId);
    }

    function getLeadboardTableName() external view returns (string memory) {
        return
            SQLHelpers.toNameFromId(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId
            );
    }

    function createUser(
        string memory name,
        string memory bio,
        string memory addr,
        string memory guns,
        string memory data
    ) external {
        // string memory insertQuery = SQLHelpers.toInsert(
        //     _USER_TABLE_PREFIX,
        //     userTableId,
        //     "name, bio, addr, guns, data",
        //     string.concat(
        //         SQLHelpers.quote(name),
        //         ",",
        //         SQLHelpers.quote(bio),
        //         ",",
        //         SQLHelpers.quote(addr),
        //         ",",
        //         SQLHelpers.quote(guns),
        //         ",",
        //         SQLHelpers.quote(data)
        //     )
        // )

        TablelandDeployments.get().mutate(
            address(this),
            userTableId,
            SQLHelpers.toInsert(
                _USER_TABLE_PREFIX,
                userTableId,
                "name,bio,addr,guns,data",
                string.concat(
                    SQLHelpers.quote(name),
                    ",",
                    SQLHelpers.quote(bio),
                    ",",
                    SQLHelpers.quote(addr),
                    ",",
                    SQLHelpers.quote(guns),
                    ",",
                    SQLHelpers.quote(data)
                )
            )
        );
    }

    function updateUser(
        uint64 id,
        string memory name,
        string memory bio,
        string memory addr,
        string memory guns,
        string memory data
    ) external {
        string memory setters = string.concat(
            "name=",
            SQLHelpers.quote(name),
            ",",
            "bio=",
            SQLHelpers.quote(bio),
            ",",
            "addr=",
            SQLHelpers.quote(addr),
            ",",
            "guns=",
            SQLHelpers.quote(guns),
            ",",
            "data=",
            SQLHelpers.quote(data)
        );

        string memory filters = string.concat("id=", Strings.toString(id));

        TablelandDeployments.get().mutate(
            address(this),
            userTableId,
            SQLHelpers.toUpdate(
                _USER_TABLE_PREFIX,
                userTableId,
                setters,
                filters
            )
        );
    }

    function deleteUser(uint64 id) external {
        string memory filters = string.concat("id=", Strings.toString(id));

        TablelandDeployments.get().mutate(
            address(this),
            userTableId,
            SQLHelpers.toDelete(_USER_TABLE_PREFIX, userTableId, filters)
        );
    }

    function createRoom(
        uint256 roomid,
        string memory addr,
        string memory people,
        string memory status,
        string memory gun
    ) external {
        string memory insertQuery = SQLHelpers.toInsert(
            _ROOM_TABLE_PREFIX,
            roomTableId,
            "roomid, addr, people, status, gun",
            string.concat(
                Strings.toString(roomid),
                ",",
                SQLHelpers.quote(addr),
                ",",
                SQLHelpers.quote(people),
                ",",
                SQLHelpers.quote(status),
                ",",
                SQLHelpers.quote(gun)
            )
        );

        TablelandDeployments.get().mutate(
            address(this),
            roomTableId,
            insertQuery
        );
    }

    // Delete using room ID
    function deleteRoom(uint256 roomid) external {
        string memory filters = string.concat(
            "roomid=",
            Strings.toString(roomid)
        );

        TablelandDeployments.get().mutate(
            address(this),
            roomTableId,
            SQLHelpers.toDelete(_ROOM_TABLE_PREFIX, roomTableId, filters)
        );
    }

    // Function to generate random leaderboard entries and insert them
    function _initializeLeaderboard() internal {
        for (uint256 i = 0; i < 10; i++) {
            // Generate random data for address, time, and gun
            string memory randomAddr = string(
                abi.encodePacked(
                    "0x",
                    Strings.toHexString(uint256(uint160(address(this))) + i)
                )
            );
            string memory randomTime = Strings.toString(block.timestamp + i);
            string memory randomGun = string(
                abi.encodePacked("Gun", Strings.toString(i))
            );

            // Prepare the insert query
            string memory insertQuery = SQLHelpers.toInsert(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId,
                "addr, time, gun",
                string.concat(
                    SQLHelpers.quote(randomAddr),
                    ",",
                    SQLHelpers.quote(randomTime),
                    ",",
                    SQLHelpers.quote(randomGun)
                )
            );

            // Execute the insert
            TablelandDeployments.get().mutate(
                address(this),
                leaderboardTableId,
                insertQuery
            );
        }
    }

    // Function to insert ten entries with '0' values into the leaderboard
    function _initializeLeaderboardZero() internal {
        for (uint256 i = 0; i < 10; i++) {
            string memory insertQuery = SQLHelpers.toInsert(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId,
                "addr, time, gun",
                string.concat(
                    SQLHelpers.quote("0"),
                    ",",
                    SQLHelpers.quote("0"),
                    ",",
                    SQLHelpers.quote("0")
                )
            );

            // Execute the insert
            TablelandDeployments.get().mutate(
                address(this),
                leaderboardTableId,
                insertQuery
            );
        }
    }

    function addToLeaderboard(
        uint256 id,
        string memory addr,
        string memory time,
        string memory gun
    ) external {
        string memory setters = string.concat(
            "addr=",
            SQLHelpers.quote(addr),
            ",",
            "time=",
            SQLHelpers.quote(time),
            ",",
            "gun=",
            SQLHelpers.quote(gun)
        );

        string memory filters = string.concat("id=", Strings.toString(id));

        TablelandDeployments.get().mutate(
            address(this),
            leaderboardTableId,
            SQLHelpers.toUpdate(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId,
                setters,
                filters
            )
        );
    }
}