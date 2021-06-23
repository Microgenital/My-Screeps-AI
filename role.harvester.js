let roleBuilder = require("role.builder");
let roleHarvester = {
	/** @param {Creep} creep **/
	run: function (creep) {
		if (creep.store.getFreeCapacity() > 0) {
			let sources = creep.room.find(FIND_SOURCES);
			let sources_dropped = creep.room.find(FIND_DROPPED_RESOURCES);
			if (sources_dropped > 0) { // Pickup dropped energy first. NOT TESTED YET
				if (creep.pickup(sources_dropped[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(sources_dropped[0]);
				}
			} else if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) { // if theres no dropped energy, go mining.
				creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
			}
		} else {
			let targets = creep.room.find(FIND_STRUCTURES, {
				filter: (structure) => {
					return (
						(structure.structureType == STRUCTURE_EXTENSION ||
							structure.structureType == STRUCTURE_SPAWN ||
							structure.structureType == STRUCTURE_CONTAINER) &&
						structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
					);
				},
			});

			if (targets.length > 0) {
				creep.memory.upgrading = false;
				if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
				}
			} else {
				// Harvesters that have nothing to do become builders until energy is needed again somewhere.
				//roleBuilder.run(creep);
				creep.moveTo(Game.spawns["Spawn1"]);
			}
		}
	},
};

module.exports = roleHarvester;
