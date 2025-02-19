// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BlockCapsule {
    mapping(address => string) private userPasswords;
    mapping(address => string[]) private storedKeys;

    function register(address _user, string memory _passwordHash) external {
        require(bytes(userPasswords[_user]).length == 0, "User already registered");
        userPasswords[_user] = _passwordHash;
    }

    function authenticate(address _user, string memory _passwordHash) internal view returns (bool) {
        return keccak256(abi.encodePacked(userPasswords[_user])) == keccak256(abi.encodePacked(_passwordHash));
    }

    function storeKey(address _user, string memory _passwordHash, string memory key) external {
        require(authenticate(_user, _passwordHash), "Authentication failed");
        storedKeys[_user].push(key);
    }

    function fetchKeys(address _user, string memory _passwordHash) external view returns (string[] memory) {
        require(authenticate(_user, _passwordHash), "Authentication failed");
        return storedKeys[_user];
    }
}




