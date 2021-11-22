const TaskContract = artifacts.require("TasksContract")

contract("TasksContract", () => {

    before(async () => {
        this.tasks = await TaskContract.deployed();
    });

    //verifica que la tarea se creo
    it('Migration successfuly', async () => {
        const address = await this.tasks.address;
        assert.notEqual(address, null);
        assert.notEqual(address, 0x0);
        assert.notEqual(address, undefined);
        assert.notEqual(address, "");
    });

    //mostrar una tarea
    it('show contract', async () => {
        const counter = await this.tasks.taskCount();
        const task = await this.tasks.task(counter - 1);
        assert.equal(task.id.toNumber(), counter.toNumber() - 1);
    });

    it('create function succesfuly', async () => {
        const task = await this.tasks.createTask('mi primer tarea', 'tarea por defecto');
        const taskEvent = task.logs[0].args.id.toNumber();
        assert.notEqual(taskEvent, null);
        assert.notEqual(taskEvent, 0x0);
        assert.notEqual(taskEvent, undefined);
        assert.notEqual(taskEvent, "");
    });
});