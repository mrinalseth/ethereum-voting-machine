pragma solidity ^0.4.17;

contract ElectionFactory {
    address[] public deployedElection;
    
    function createElection(string constituencyName) public {
        address newElection = new Election(constituencyName);
        deployedElection.push(newElection);
    }
    
    function getDeployedElection() public view returns(address[]) {
        return deployedElection;
    }

    function EC() public view returns(address) {
        return msg.sender;
    }
}

contract Election {
    struct Candidate {
        string name;
        string partyName;
        string bio;
        uint votes;
        address id;
    }
    string public constituency;
    Candidate[] public candidates;
    mapping(address => bool) hasVoted;
    mapping(address => bool) hasContested;
    
    constructor(string constituencyName) public {
        constituency = constituencyName;
    }
    
    function contestElection(string name, string partyName, string bio) public {
        require(!hasContested[msg.sender]);
        Candidate memory newCandidate = Candidate({
            name: name,
            partyName: partyName,
            bio: bio,
            votes: 0,
            id: msg.sender
        });
        candidates.push(newCandidate);
        hasContested[msg.sender] = true;
    }
    
    function castVote(uint index) public {
        Candidate storage candidate = candidates[index];
        require(!hasVoted[msg.sender]);
        hasVoted[msg.sender] = true;
        candidate.votes++;
    }
    
    function declareResult() public view returns(address) {
        Candidate storage max = candidates[0];
        for(uint i=0; i<candidates.length; i++) {
            if(max.votes < candidates[i].votes) {
                max = candidates[i];
            }
        }
        return max.id;
    }
    
    function getName() public view returns(string) {
        address candidateAdd = declareResult();
        for(uint i=0; i<candidates.length; i++) {
            if(candidates[i].id == candidateAdd){
                return candidates[i].name;
            }
        }
    }

    function getCandidateCount() public view returns(uint) {
        return candidates.length;
    }

    function voted(address add) public view returns(bool) {
        return hasVoted[add];
    }
}