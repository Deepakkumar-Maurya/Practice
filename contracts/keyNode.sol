// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AddressIndependentAuth {
    struct User {
        string nationalId;
        string passkeyHash;
        string name;
        string phone;
        string otherDetails;
    }

    mapping(string => User) private users; // Store users by National ID
    mapping(string => string[]) private storedPasswords; // Store passwords by National ID

    event UserRegistered(address indexed user, string nationalId);
    event PasswordStored(address indexed user, string password);
    event PasswordEdited(address indexed user, uint index);
    event PasswordDeleted(address indexed user, uint index);
    event UserDetailsUpdated(address indexed user);

    // Function to register a user with National ID and Passkey Hash
    function register(
        string memory _nationalId,
        string memory _passkeyHash,
        string memory _name,
        string memory _phone,
        string memory _otherDetails
    ) external {
        require(bytes(users[_nationalId].nationalId).length == 0, "User already registered");

        users[_nationalId] = User(_nationalId, _passkeyHash, _name, _phone, _otherDetails);

        emit UserRegistered(msg.sender, _nationalId);
    }

    // Internal authentication function
    function authenticate(string memory _nationalId, string memory _passkeyHash) internal view returns (bool) {
        return keccak256(abi.encodePacked(users[_nationalId].nationalId)) == keccak256(abi.encodePacked(_nationalId)) &&
               keccak256(abi.encodePacked(users[_nationalId].passkeyHash)) == keccak256(abi.encodePacked(_passkeyHash));
    }

    // Function to log in using National ID and Passkey
    function login(string memory _nationalId, string memory _passkeyHash) external view returns (bool) {
        return authenticate(_nationalId, _passkeyHash);
    }

    // Function to store a password for the authenticated user
    function storePassword(string memory _nationalId, string memory _passkeyHash, string memory _password) external {
        require(authenticate(_nationalId, _passkeyHash), "Authentication failed");
        storedPasswords[_nationalId].push(_password);
        emit PasswordStored(msg.sender, _password);
    }

    // Function to edit a stored password
    function editPassword(string memory _nationalId, string memory _passkeyHash, uint _index, string memory _newPassword) external {
        require(authenticate(_nationalId, _passkeyHash), "Authentication failed");
        require(_index < storedPasswords[_nationalId].length, "Invalid index");

        storedPasswords[_nationalId][_index] = _newPassword;
        emit PasswordEdited(msg.sender, _index);
    }

    // Function to delete a stored password
    function deletePassword(string memory _nationalId, string memory _passkeyHash, uint _index) external {
        require(authenticate(_nationalId, _passkeyHash), "Authentication failed");
        require(_index < storedPasswords[_nationalId].length, "Invalid index");

        for (uint i = _index; i < storedPasswords[_nationalId].length - 1; i++) {
            storedPasswords[_nationalId][i] = storedPasswords[_nationalId][i + 1];
        }
        storedPasswords[_nationalId].pop();

        emit PasswordDeleted(msg.sender, _index);
    }

    // Function to retrieve stored passwords (for demonstration, should be encrypted in production)
    function getStoredPasswords(string memory _nationalId, string memory _passkeyHash) external view returns (string[] memory) {
        require(authenticate(_nationalId, _passkeyHash), "Authentication failed");
        return storedPasswords[_nationalId];
    }

    // 📝 Edit user details
    function editUserDetails(string memory _nationalId, string memory _passkeyHash, string memory _name, string memory _phone, string memory _otherDetails) external {
        require(authenticate(_nationalId, _passkeyHash), "Authentication failed");
        users[_nationalId].name = _name;
        users[_nationalId].phone = _phone;
        users[_nationalId].otherDetails = _otherDetails;
        emit UserDetailsUpdated(msg.sender);
    }

    // Function to retrieve user details
    function getUserDetails(string memory _nationalId, string memory _passkeyHash) external view returns (string memory, string memory, string memory, string memory, string memory) {
        require(authenticate(_nationalId, _passkeyHash), "Authentication failed");

        User memory user = users[_nationalId];
        return (user.nationalId, user.passkeyHash, user.name, user.phone, user.otherDetails);
    }
}
