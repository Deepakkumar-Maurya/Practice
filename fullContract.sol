// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BlockCapsule {
    struct Access {
        address user;
        bool access;
    }

    mapping(address => bytes32) private userPasswords;
    mapping(address => string[]) private userKeys;
    mapping(address => mapping(address => bool)) private viewOwnership;
    mapping(address => mapping(address => bool)) private editOwnership;
    mapping(address => Access[]) private viewAccessList;
    mapping(address => Access[]) private editAccessList;
    mapping(address => mapping(address => bool)) private viewPreviousData;
    mapping(address => mapping(address => bool)) private editPreviousData;

    function registerUser(bytes32 passwordHash) external {
        require(userPasswords[msg.sender] == 0, "User already registered");
        userPasswords[msg.sender] = passwordHash;
    }

    function authenticate(address _user, bytes32 passwordHash) internal view {
        require(userPasswords[_user] == passwordHash, "Authentication failed");
    }

    function storeKey(bytes32 passwordHash, string memory key) external {
        authenticate(msg.sender, passwordHash);
        userKeys[msg.sender].push(key);
    }

    function fetchKeys(bytes32 passwordHash) external view returns (string[] memory) {
        authenticate(msg.sender, passwordHash);
        return userKeys[msg.sender];
    }

    function allowView(address user) external {
        viewOwnership[msg.sender][user] = true;
        if (viewPreviousData[msg.sender][user]) {
            for (uint i = 0; i < viewAccessList[msg.sender].length; i++) {
                if (viewAccessList[msg.sender][i].user == user) {
                    viewAccessList[msg.sender][i].access = true;
                }
            }
        } else {
            viewAccessList[msg.sender].push(Access(user, true));
            viewPreviousData[msg.sender][user] = true;
        }
    }

    function disAllowView(address user) public {
        viewOwnership[msg.sender][user] = false;
        for (uint i = 0; i < viewAccessList[msg.sender].length; i++) {
            if (viewAccessList[msg.sender][i].user == user) {
                viewAccessList[msg.sender][i].access = false;
            }
        }
    }

    function allowEdit(address user) external {
        editOwnership[msg.sender][user] = true;
        if (editPreviousData[msg.sender][user]) {
            for (uint i = 0; i < editAccessList[msg.sender].length; i++) {
                if (editAccessList[msg.sender][i].user == user) {
                    editAccessList[msg.sender][i].access = true;
                }
            }
        } else {
            editAccessList[msg.sender].push(Access(user, true));
            editPreviousData[msg.sender][user] = true;
        }
    }

    function disAllowEdit(address user) public {
        editOwnership[msg.sender][user] = false;
        for (uint i = 0; i < editAccessList[msg.sender].length; i++) {
            if (editAccessList[msg.sender][i].user == user) {
                editAccessList[msg.sender][i].access = false;
            }
        }
    }

    function viewShareAccess() public view returns (Access[] memory) {
        return viewAccessList[msg.sender];
    }

    function editShareAccess() public view returns (Access[] memory) {
        return editAccessList[msg.sender];
    }
}
