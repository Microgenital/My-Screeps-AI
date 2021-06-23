let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let creepGenerator = require("creepGenerator");
let roleBuilder = require("role.builder");
let extensionSpawn = require("extensionSpawn");
let roleWarrior = require("role.warrior");
let roleRepair = require("role.repair");
let roleTransfer = require("role.transfer");

// TODO: Build energy storage from which the creeps can get energy,
// so that not all creeps want to mine at the same energy spot

for (let name in Game.creeps) {
	let creep = Game.creeps[name];

	if (creep.memory.role == "harvester") {
		roleHarvester.run(creep);
	} else if (creep.memory.role == "upgrader") {
		roleUpgrader.run(creep);
	} else if (creep.memory.role == "builder") {
		roleBuilder.run(creep);
	} else if (creep.memory.role == "warrior") {
		roleWarrior.run(creep);
	} else if (creep.memory.role == "transfer") {
		// TODO: placeholder
		//roleTransfer.run(creep);
	}
	roleRepair.run(creep);
}

extensionSpawn.run();
creepGenerator.run();
