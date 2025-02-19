// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BlockCapsule {
    struct User {
        string nationalId;
        string passkeyHash;
        string name;
        string phone;
        string otherDetails;
    }

    mapping(address => User) private users;
    mapping(address => string[]) private storedPasswords;

    // Event Logs
    event UserRegistered(address indexed user, string nationalId);
    event PasswordStored(address indexed user, string password);
    event PasswordEdited(address indexed user, uint index);
    event PasswordDeleted(address indexed user, uint index);
    event UserDetailsUpdated(address indexed user);

    // 🛠 Signup: Register a new user with nationalId & passkey
    function register(string memory _nationalId, string memory _passkeyHash, string memory _name, string memory _phone, string memory _otherDetails) external {
        require(bytes(users[msg.sender].nationalId).length == 0, "User already registered");
        users[msg.sender] = User(_nationalId, _passkeyHash, _name, _phone, _otherDetails);
        emit UserRegistered(msg.sender, _nationalId);
    }

    // ✅ Authenticate user
    function authenticate(address _user, string memory _nationalId, string memory _passkeyHash) internal view returns (bool) {
        return keccak256(abi.encodePacked(users[_user].nationalId)) == keccak256(abi.encodePacked(_nationalId)) &&
               keccak256(abi.encodePacked(users[_user].passkeyHash)) == keccak256(abi.encodePacked(_passkeyHash));
    }

    // 🔐 Login: Check if user exists
    function login(string memory _nationalId, string memory _passkeyHash) external view returns (bool) {
        return authenticate(msg.sender, _nationalId, _passkeyHash);
    }

    // 🔑 Store a new password
    function storePassword(string memory _nationalId, string memory _passkeyHash, string memory _password) external {
        require(authenticate(msg.sender, _nationalId, _passkeyHash), "Authentication failed");
        storedPasswords[msg.sender].push(_password);
        emit PasswordStored(msg.sender, _password);
    }

    // ✏️ Edit an existing password
    function editPassword(string memory _nationalId, string memory _passkeyHash, uint _index, string memory _newPassword) external {
        require(authenticate(msg.sender, _nationalId, _passkeyHash), "Authentication failed");
        require(_index < storedPasswords[msg.sender].length, "Invalid index");
        storedPasswords[msg.sender][_index] = _newPassword;
        emit PasswordEdited(msg.sender, _index);
    }

    // ❌ Delete a password
    function deletePassword(string memory _nationalId, string memory _passkeyHash, uint _index) external {
        require(authenticate(msg.sender, _nationalId, _passkeyHash), "Authentication failed");
        require(_index < storedPasswords[msg.sender].length, "Invalid index");

        for (uint i = _index; i < storedPasswords[msg.sender].length - 1; i++) {
            storedPasswords[msg.sender][i] = storedPasswords[msg.sender][i + 1];
        }
        storedPasswords[msg.sender].pop();
        emit PasswordDeleted(msg.sender, _index);
    }

    // 📂 Fetch all stored passwords
    function fetchPasswords(string memory _nationalId, string memory _passkeyHash) external view returns (string[] memory) {
        require(authenticate(msg.sender, _nationalId, _passkeyHash), "Authentication failed");
        return storedPasswords[msg.sender];
    }

    // 📌 Store user details (already handled in register)
    
    // 📝 Edit user details
    function editUserDetails(string memory _nationalId, string memory _passkeyHash, string memory _name, string memory _phone, string memory _otherDetails) external {
        require(authenticate(msg.sender, _nationalId, _passkeyHash), "Authentication failed");
        users[msg.sender].name = _name;
        users[msg.sender].phone = _phone;
        users[msg.sender].otherDetails = _otherDetails;
        emit UserDetailsUpdated(msg.sender);
    }

    // 📜 Fetch user details
    function getUserDetails(string memory _nationalId, string memory _passkeyHash) external view returns (string memory, string memory, string memory) {
        require(authenticate(msg.sender, _nationalId, _passkeyHash), "Authentication failed");
        User memory user = users[msg.sender];
        return (user.name, user.phone, user.otherDetails);
    }
}
