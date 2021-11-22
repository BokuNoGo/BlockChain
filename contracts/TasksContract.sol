// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 < 0.9.0;

/**
 contract es la definicion principal
 */
contract TasksContract{

    uint256 public taskCount = 0;
    //averiguar bien por mapping
    mapping (uint256 => Task) public task;

    //  
    struct Task {
        uint256 id;
        string title;
        string description;
        bool done;
        uint256 created_at;
    }

    constructor (){
        createTask('mi primer tarea', 'tarea por defecto');
    }

    event TaskCreated(
        uint256 id,
        string title,
        string description,
        bool done,
        uint256 created_at
    );

    function createTask(string memory _title, string memory _description) public
    {
        task[taskCount] = Task(taskCount, _title, _description, false, block.timestamp);
        taskCount++;
        //esto sera guardado en el log
        emit TaskCreated(taskCount, _title, _description, false, block.timestamp);
    }

    function changeDone(uint _id) public
    {
        Task memory _task = task[_id];
        _task.done = !_task.done;
        task[_id] = _task;
    }
}