// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Room is ERC721Holder {
    uint256 private roomTableId;
    string private constant _ROOM_TABLE_PREFIX = "room_table";

    constructor() {
        // Create RoomTable
        roomTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "roomid text,"
                "addr text,"
                "people text,"
                "status text,"
                "gun text,"
                "map text,"
                "data text",
                _ROOM_TABLE_PREFIX
            )
        );
    }

    function getRoomTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_ROOM_TABLE_PREFIX, roomTableId);
    }

    function createRoom(
        string memory roomid,
        string memory addr,
        string memory people,
        string memory status,
        string memory gun,
        string memory map,
        string memory data
    ) external {
        string memory insertQuery = SQLHelpers.toInsert(
            _ROOM_TABLE_PREFIX,
            roomTableId,
            "roomid, addr, people, status, gun, map, data",
            string.concat(
                SQLHelpers.quote(roomid),
                ",",
                SQLHelpers.quote(addr),
                ",",
                SQLHelpers.quote(people),
                ",",
                SQLHelpers.quote(status),
                ",",
                SQLHelpers.quote(gun),
                ",",
                SQLHelpers.quote(map),
                ",",
                SQLHelpers.quote(data)
            )
        );

        TablelandDeployments.get().mutate(
            address(this),
            roomTableId,
            insertQuery
        );
    }

    function updateRoom(
        string memory roomid,
        string memory addr,
        string memory people,
        string memory status,
        string memory gun,
        string memory map,
        string memory data
    ) external {
        string memory setters = string.concat(
            "addr=",
            SQLHelpers.quote(addr),
            ",",
            "people=",
            SQLHelpers.quote(people),
            ",",
            "status=",
            SQLHelpers.quote(status),
            ",",
            "gun=",
            SQLHelpers.quote(gun),
            ",",
            "map=",
            SQLHelpers.quote(map),
            ",",
            "data=",
            SQLHelpers.quote(data)
        );

        string memory filters = string.concat("roomid=", SQLHelpers.quote(roomid));

        TablelandDeployments.get().mutate(
            address(this),
            roomTableId,
            SQLHelpers.toUpdate(
                _ROOM_TABLE_PREFIX,
                roomTableId,
                setters,
                filters
            )
        );
    }

    function deleteRoom(string memory roomid) external {
        string memory filters = string.concat("roomid=", SQLHelpers.quote(roomid));

        TablelandDeployments.get().mutate(
            address(this),
            roomTableId,
            SQLHelpers.toDelete(_ROOM_TABLE_PREFIX, roomTableId, filters)
        );
    }
}