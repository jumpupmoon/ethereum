// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract NonceNS {
    struct Post {
        address author;
        uint32 created;
        uint32 updated;
        string contents;
    }
    
    Post[] public post;
    
    event PostUpdated(address indexed author, uint indexed id);
    
    function newPost(string memory contents) public {
        Post memory p;
        p.author = msg.sender;
        p.created = uint32(now);
        p.updated = uint32(now);
        p.contents = contents;
        post.push(p);
        emit PostUpdated(msg.sender, post.length-1);
    }
    
    function updatePost(uint id, string memory contents) public {
        Post memory p = post[id];
        require(p.author == msg.sender);
        p.updated = uint32(now);
        p.contents = contents;
        post[id] = p;
        emit PostUpdated(msg.sender, id);
    }
    
    function getNumberPost() public view returns(uint) {
        return post.length;
    }
}