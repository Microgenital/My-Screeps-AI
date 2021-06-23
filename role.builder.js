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
		// TODO: Repair funktion einbauen, evtl auch seperate repairbots
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

// TODO: Random Mining Sourcen einfügen, damit nicht alle miner auf einem fleck stehen.
// TODO: evtl auch das Mining in eine eigene Funktion stecken, damit alle die irgendwie minen gehen das
// gleiche "Miner-Script" nutzen
/*
let list_random = {
	let choosen_source = _.random(0, 4) == 0;
  run: function (list) {let random_source = list.get(rand.nextInt(list.size()));
    return random_source;
  },
};
*/
module.exports = roleBuilder;
