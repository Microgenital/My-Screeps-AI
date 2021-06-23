let roleBuilder = {
	run: function (creep) {
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say("🔄 Sammeln");
		}
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say("🚧 Bauen");
		}
		if (creep.memory.building) {
			let targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]), { visualizePathStyle: { stroke: "#ffaa00" } };
				}
			} else {
				targets = creep.room.find(FIND_STRUCTURES, {
					filter: (structure) => {
						return structure.hitsMax / 2 > structure.hits;
					},
				});
				// console.log(targets)
				if (creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0]);
				}
			}
		} else {
			let sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[0]), { visualizePathStyle: { stroke: "#ffaa00" } };
			}
		}
	},
};

// TODO: Insert random mining sources so that not all miners are in one spot.
// TODO: maybe also put the mining in a separate function, so that all who go to mine somehow use the same "miner script"

/*
let list_random = {
	let choosen_source = _.random(0, 4) == 0;
  run: function (list) {let random_source = list.get(rand.nextInt(list.size()));
    return random_source;
  },
};
*/
module.exports = roleBuilder;
