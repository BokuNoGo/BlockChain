// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

contract VotosContract {

    uint public counter = 0;
    int public votos_true;
    int public votos_false;
    //averiguar bien por mapping
    mapping (uint256 => Voto) public votos;
    
    event votoCreated(uint id, bool voto, uint cuenta_id, uint created_at);

    struct Voto{
        uint id;
        bool voto;
        uint cuenta_id;
        uint created_at;
    }

    constructor(){
        initCounter();
    }
    
    function initCounter() public
    {
        votos_true = 0;
        votos_false = 0;
    }

    function votar(uint _cuenta_id, bool _voto) public
    {
        if(_voto){
            votos_true++;
        }else{
            votos_false++;
        }
        votos[counter] = Voto(counter, _voto, _cuenta_id,  block.timestamp);
        counter++;
        emit votoCreated(counter, _voto, _cuenta_id,  block.timestamp);
    }
    
}