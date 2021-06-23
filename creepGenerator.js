let creepGenerator = {
	run: function () {
		let maxUpgrader = 1;
		let maxHarvester = 3; 
		let maxBuilder = 3;
		let maxWarrior = 3;
		let maxTransfer = 0;

		let amountUpgrader = 0;
		let amountHarvester = 0;
		let amountBuilder = 0;
		let amountWarrior = 0;
		let amountTransfer = 0;

		for (let name in Game.creeps) {
			let creep = Game.creeps[name];
			if (creep.memory.role == "upgrader") {
				amountUpgrader += 1;
			} else if (creep.memory.role == "harvester") {
				amountHarvester += 1;
			} else if (creep.memory.role == "builder") {
				amountBuilder += 1;
			} else if (creep.memory.role == "warrior") {
				amountWarrior += 1;
			} else if (creep.memory.role == "transfer"){
				amountTransfer += 1;
			}
			
			// TODO: Heal Creep erstellen, der die Warriors heilen kann.
			// TODO: Creeps ein "Level" geben, damit einfach erkannt werden kann welche Stufe des Creeps existiert.
		} 	// TODO: Mehr varianten von Creeps hinzufügen, je nach dem wiviel Raum-Energy zur verfühung stehen kann.
		let creepName = "Creep" + Game.time;

		if (amountHarvester < maxHarvester) {
			if (Game.spawns["Spawn1"].room.energyCapacityAvailable < 400) {
				Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], creepName, {
					memory: { role: "harvester", upgrading: false },
				});
			} else if (Game.spawns["Spawn1"].room.energyCapacityAvailable >= 400) {
				Game.spawns["Spawn1"].spawnCreep(
					[WORK, WORK, MOVE, MOVE, CARRY, CARRY],
					creepName,
					{
						memory: { role: "harvester", upgrading: false },
					}
				);
			}
		}

		if (amountUpgrader < maxUpgrader) {
			if (Game.spawns["Spawn1"].room.energyCapacityAvailable < 400) {
				Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], creepName, {
					memory: { role: "upgrader", upgrading: false },
				});
			} else if (Game.spawns["Spawn1"].room.energyCapacityAvailable >= 400) {
				Game.spawns["Spawn1"].spawnCreep(
					[WORK, WORK, MOVE, MOVE, CARRY, CARRY],
					creepName,
					{
						memory: { role: "upgrader", upgrading: false },
					}
				);
			}
		}

		if (amountBuilder < maxBuilder) {
			if (Game.spawns["Spawn1"].room.energyCapacityAvailable < 400) {
				Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], creepName, {
					memory: { role: "builder", building: false },
				});
			} else if (Game.spawns["Spawn1"].room.energyCapacityAvailable >= 400) {
				Game.spawns["Spawn1"].spawnCreep(
					[WORK, WORK, MOVE, MOVE, CARRY, CARRY],
					creepName,
					{
						memory: { role: "builder", building: false },
					}
				);
			}
		}

		// TODO: Warrior ist extem schwach, da muss was gemacht werden.
		if (amountWarrior < maxWarrior) {
			Game.spawns["Spawn1"].spawnCreep([MOVE, ATTACK, ATTACK], creepName, {
				memory: { role: "warrior" },
			});
		}

		if (amountTransfer < maxTransfer) {
			Game.spawns["Spawn1"].spawnCreep([MOVE, CARRY, CARRY], creepName, {
				memory: { role: "transfer" },
			});
		}
	},
};

module.exports = creepGenerator;
