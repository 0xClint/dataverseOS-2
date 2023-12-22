// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandController} from "@tableland/evm/contracts/TablelandController.sol";
import {TablelandPolicy} from "@tableland/evm/contracts/TablelandPolicy.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import {ITablelandTables} from "@tableland/evm/contracts/interfaces/ITablelandTables.sol";

contract Starter is TablelandController, ERC721Holder {
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
                "id integer primary key autoincrement,"
                "name text,"
                "bio text,"
                "addr text,"
                "guns text,"
                "data text",
                _USER_TABLE_PREFIX
            )
        );
        TablelandDeployments.get().setController(
            address(this),
            userTableId,
            address(this)
        );

        // Create RoomTable
        roomTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "roomid integer primary key manual,"
                "addr text,"
                "people text,"
                "status text,"
                "gun text",
                _ROOM_TABLE_PREFIX
            )
        );
        TablelandDeployments.get().setController(
            address(this),
            roomTableId,
            address(this)
        );

        // Create Leaderboard
        leaderboardTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key manual,"
                "addr text,"
                "time text,"
                "gun text",
                _LEADERBOARD_TABLE_PREFIX
            )
        );
        TablelandDeployments.get().setController(
            address(this),
            leaderboardTableId,
            address(this)
        );
    }

    function getUserTableId() external view returns (uint256) {
        return userTableId;
    }

    function getRoomTableId() external view returns (uint256) {
        return roomTableId;
    }

    function getLeaderboardTableId() external view returns (uint256) {
        return leaderboardTableId;
    }


    function createUser(
        string[] memory names,
        string[] memory bios,
        string[] memory addrs,
        string[] memory guns,
        string[] memory datas
    ) external {
        ITablelandTables.Statement[] memory statements = new ITablelandTables.Statement[](names.length);
        
        for (uint256 i = 0; i < names.length; i++) {
            string memory sql = SQLHelpers.toInsert(
                _USER_TABLE_PREFIX,
                userTableId,
                "name, bio, addr, guns, data",
                string(
                    abi.encodePacked(
                        SQLHelpers.quote(names[i]),
                        ",",
                        SQLHelpers.quote(bios[i]),
                        ",",
                        SQLHelpers.quote(addrs[i]),
                        ",",
                        SQLHelpers.quote(guns[i]),
                        ",",
                        SQLHelpers.quote(datas[i])
                    )
                )
            );
            statements[i] = ITablelandTables.Statement(userTableId, sql);
        }
        
        TablelandDeployments.get().mutate(address(this), statements);
    }

    function updateUser(
        uint64[] memory ids,
        string[] memory names,
        string[] memory bios,
        string[] memory addrs,
        string[] memory guns,
        string[] memory datas
    ) external {
        require(
            ids.length == names.length &&
            ids.length == bios.length &&
            ids.length == addrs.length &&
            ids.length == guns.length &&
            ids.length == datas.length,
            "Array lengths do not match"
        );
        
        ITablelandTables.Statement[] memory statements = new ITablelandTables.Statement[](ids.length);
        
        for (uint256 i = 0; i < ids.length; i++) {
            string memory setters = string(
                abi.encodePacked(
                    "name=", SQLHelpers.quote(names[i]), ",",
                    "bio=", SQLHelpers.quote(bios[i]), ",",
                    "addr=", SQLHelpers.quote(addrs[i]), ",",
                    "guns=", SQLHelpers.quote(guns[i]), ",",
                    "data=", SQLHelpers.quote(datas[i])
                )
            );
            string memory filters = string(
                abi.encodePacked(
                    "id=", Strings.toString(ids[i])
                )
            );
            string memory sql = SQLHelpers.toUpdate(_USER_TABLE_PREFIX, userTableId, setters, filters);
            statements[i] = ITablelandTables.Statement(userTableId, sql);
        }
        
        TablelandDeployments.get().mutate(address(this), statements);
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
        string[] memory addrs,
        string[] memory people,
        string[] memory statuses,
        string[] memory guns
    ) external {
        require(
            addrs.length == people.length &&
            addrs.length == statuses.length &&
            addrs.length == guns.length,
            "Array lengths do not match"
        );
        
        ITablelandTables.Statement[] memory statements = new ITablelandTables.Statement[](addrs.length);
        
        for (uint256 i = 0; i < addrs.length; i++) {
            string memory sql = SQLHelpers.toInsert(
                _ROOM_TABLE_PREFIX,
                roomTableId,
                "addr, people, status, gun",
                string(
                    abi.encodePacked(
                        SQLHelpers.quote(addrs[i]),
                        ",",
                        SQLHelpers.quote(people[i]),
                        ",",
                        SQLHelpers.quote(statuses[i]),
                        ",",
                        SQLHelpers.quote(guns[i])
                    )
                )
            );
            statements[i] = ITablelandTables.Statement(roomTableId, sql);
        }
        
        TablelandDeployments.get().mutate(address(this), statements);
    }

    function updateLeaderboard(
        uint64[] memory ids,
        string[] memory addrs,
        string[] memory times,
        string[] memory guns
    ) external {
        require(
            ids.length == addrs.length &&
            ids.length == times.length &&
            ids.length == guns.length,
            "Array lengths do not match"
        );
        
        ITablelandTables.Statement[] memory statements = new ITablelandTables.Statement[](ids.length * 2);
        
        for (uint256 i = 0; i < ids.length; i++) {
            string memory filters = string(
                abi.encodePacked(
                    "id=", Strings.toString(ids[i])
                )
            );
            
            string memory deleteSql = SQLHelpers.toDelete(_LEADERBOARD_TABLE_PREFIX, leaderboardTableId, filters);
            statements[i * 2] = ITablelandTables.Statement(leaderboardTableId, deleteSql);
            
            string memory insertSql = SQLHelpers.toInsert(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId,
                "addr, time, gun",
                string(
                    abi.encodePacked(
                        SQLHelpers.quote(addrs[i]),
                        ",",
                        SQLHelpers.quote(times[i]),
                        ",",
                        SQLHelpers.quote(guns[i])
                    )
                )
            );
            statements[i * 2 + 1] = ITablelandTables.Statement(leaderboardTableId, insertSql);
        }
        
        TablelandDeployments.get().mutate(address(this), statements);
    }

 
}