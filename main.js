let roleHarvester = require("role.harvester");
let roleUpgrader = require("role.upgrader");
let creepGenerator = require("creepGenerator");
let roleBuilder = require("role.builder");
let extensionSpawn = require("extensionSpawn");
let roleWarrior = require("role.warrior");
let roleRepair = require("role.repair");
let roleTransfer = require("role.transfer");

// TODO: Energy Storage bauen, aus dem die Creeps energy holen können,
// damit nicht alle Creeps am selben Energy-Spot minen wollen, dafür wird
// aber ein Repair_Bot benötigt.

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
		//roleTransfer.run(creep);
	}
	roleRepair.run(creep);
}

/* // TODO: Repair test
for (creeps in Game.creeps){
	let decay = creeps.room.find(FIND_MY_STRUCTURES, {
		filter: (structure) => structure.maxHits / 2 > structure.hits,
	});
	console.log(decay);
}
*/

extensionSpawn.run();
creepGenerator.run();
