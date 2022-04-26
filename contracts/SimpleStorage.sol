// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
  uint storedData;

  

  function set(uint  x) public {
    storedData = x;
  }

  function move(uint x) public{
    storedData =2*x;
  }


  function get() public view returns (uint) {
    return storedData;
  }
}
