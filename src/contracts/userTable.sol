pragma solidity >=0.8.10 <0.9.0;

import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {TablelandDeployments} from "@tableland/evm/contracts/utils/TablelandDeployments.sol";
import {SQLHelpers} from "@tableland/evm/contracts/utils/SQLHelpers.sol";
import {ERC721Holder} from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract User is ERC721Holder {
    uint256 private userTableId;
    string private constant _USER_TABLE_PREFIX = "user_table";

    constructor() {
        // Create UserTable
        userTableId = TablelandDeployments.get().create(
            address(this),
            SQLHelpers.toCreateFromSchema(
                "id integer primary key,"
                "name text,"
                "bio text,"
                "cid text,"
                "color text,"
                "guns text,"
                "addr text,"
                "data text",
                _USER_TABLE_PREFIX
            )
        );
    }

    function getUserTableName() external view returns (string memory) {
        return SQLHelpers.toNameFromId(_USER_TABLE_PREFIX, userTableId);
    }

    function createUser(
        string memory name,
        string memory bio,
        string memory cid,
        string memory color,
        string memory guns,
        string memory addr,
        string memory data
    ) external {
        TablelandDeployments.get().mutate(
            address(this),
            userTableId,
            SQLHelpers.toInsert(
                _USER_TABLE_PREFIX,
                userTableId,
                "name,bio,cid,color,guns,addr,data",
                string.concat(
                    SQLHelpers.quote(name),
                    ",",
                    SQLHelpers.quote(bio),
                    ",",
                    SQLHelpers.quote(cid),
                    ",",
                    SQLHelpers.quote(color),
                    ",",
                    SQLHelpers.quote(guns),
                    ",",
                    SQLHelpers.quote(addr),
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
        string memory cid,
        string memory color,
        string memory guns,
        string memory addr,
        string memory data
    ) external {
        string memory setters = string.concat(
            "name=",
            SQLHelpers.quote(name),
            ",",
            "bio=",
            SQLHelpers.quote(bio),
            ",",
            "cid=",
            SQLHelpers.quote(cid),
            ",",
            "color=",
            SQLHelpers.quote(color),
            ",",
            "guns=",
            SQLHelpers.quote(guns),
            ",",
            "addr=",
            SQLHelpers.quote(addr),
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
}
