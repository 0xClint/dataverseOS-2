// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract Leaderboard is ERC721Holder {
    uint256 private leaderboardTableId;
    string private constant _LEADERBOARD_TABLE_PREFIX = "leaderboard_table";

    constructor() {
        // Create Leaderboard
        leaderboardTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "addr text,"
                "time text,"
                "gun text,"
                "map text,"
                "data text",
                _LEADERBOARD_TABLE_PREFIX
            )
        );

        // Putting 10 '0' Entries in Leaderboard
        _initializeLeaderboardZero();
    }

    function getLeadboardTableName() external view returns (string memory) {
        return
            SQLHelpers.toNameFromId(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId
            );
    }

    function _initializeLeaderboardZero() internal {
        for (uint256 i = 0; i < 10; i++) {
            string memory insertQuery = SQLHelpers.toInsert(
                _LEADERBOARD_TABLE_PREFIX,
                leaderboardTableId,
                "addr, time, gun, map, data",
                string.concat(
                    SQLHelpers.quote("0"),
                    ",",
                    SQLHelpers.quote("0"),
                    ",",
                    SQLHelpers.quote("0"),
                    ",",
                    SQLHelpers.quote("0"),
                    ",",
                    SQLHelpers.quote("0")
                )
            );

            TablelandDeployments.get().mutate(
                address(this),
                leaderboardTableId,
                insertQuery
            );
        }
    }

    function updateLeaderboard(
        uint256 id,
        string memory addr,
        string memory time,
        string memory gun,
        string memory map,
        string memory data
    ) external {
        string memory setters = string.concat(
            "addr=",
            SQLHelpers.quote(addr),
            ",",
            "time=",
            SQLHelpers.quote(time),
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

    function addToLeaderboard(
        uint256 id,
        string memory addr,
        string memory time,
        string memory gun
    ) internal {
        string memory setters = string.concat(
            "addr=",
            SQLHelpers.quote(addr),
            ",",
            "time=",
            SQLHelpers.quote(time),
            ",",
            "gun=",
            SQLHelpers.quote(gun),
            ",",
            "map=",
            SQLHelpers.quote("0"), // Placeholder '0' for map
            ",",
            "data=",
            SQLHelpers.quote("0") // Placeholder '0' for data
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
