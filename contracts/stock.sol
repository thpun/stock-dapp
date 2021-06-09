// SPDX-License-Identifier: MIT
// This file is MIT Licensed
pragma solidity ^0.6.1;

library Array {
    function find(bytes32[] memory arr, bytes32 item) public pure returns (uint idx) {
        for (uint i = 0; i < arr.length; i++) {
            if (arr[i] == item) {
                return i;
            }
        }
        return arr.length;
    }

    function remove(bytes32[] storage arr, uint pos) public {
        if (pos != arr.length-1) {
            // Copy last element to the position of to-be-deleted item
            arr[pos] = arr[arr.length-1];
        }
        arr.pop();
    }
}

contract Owned {
    address owner;
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }
}

contract Inventory is Owned {

    // Structure of product item
    struct Item {
        bytes32 id; // item unqiue id
        string name; // item name
        string category;
        string description;
        uint stock;
        bool available;
        uint updateTime;
    }

    mapping(bytes32 => Item) public catalogue;
    bytes32[] public indexes; // index by item id

    // Use name length to determine whether value exists
    modifier notExists(bytes32 id) {
        require(bytes(catalogue[id].name).length == 0, "ID does not exist.");
        _;
    }
    modifier exists(bytes32 id) {
        require(bytes(catalogue[id].name).length > 0, "ID already exists.");
        _;
    }

    // Event
    event Updated(); // To trigger UI update

    function indexCount() public view returns (uint count) {
        return indexes.length;
    }

    function registerItem(bytes32 id, string memory name, string memory category, string memory description, uint qty, bool availability) public onlyOwner notExists(id) {
        // Add product name to indexes
        indexes.push(id);

        // Add product to catalogue
        catalogue[id] = Item({
            id: id,
            name: name,
            category: category,
            description: description,
            stock: qty,
            available: availability,
            updateTime: now
        });

        // Emit event
        emit Updated();
    }

    function removeItem(bytes32 id) public onlyOwner exists(id) {
        // Find position of item in indexes
        uint pos = Array.find(indexes, id);
        require(pos < indexes.length);

        // Delete index
        Array.remove(indexes, pos);
        // Delete item
        delete catalogue[id];

        // Emit event
        emit Updated();
    }

    function updateCategory(bytes32 id, string memory category) public onlyOwner exists(id) {
        catalogue[id].category = category;
        catalogue[id].updateTime = now;

        // Emit event
        emit Updated();
    }

    function updateDescription(bytes32 id, string memory description) public onlyOwner exists(id) {
        catalogue[id].description = description;
        catalogue[id].updateTime = now;

        // Emit event
        emit Updated();
    }

    function updateStock(bytes32 id, uint qty) public onlyOwner exists(id) {
        catalogue[id].stock = qty;
        catalogue[id].updateTime = now;

        // Emit event
        emit Updated();
    }

    function updateAvailability(bytes32 id, bool availability) public onlyOwner exists(id) {
        catalogue[id].available = availability;
        catalogue[id].updateTime = now;

        // Emit event
        emit Updated();
    }
}
