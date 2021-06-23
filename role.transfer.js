let roleTransfer = {
	run: function (creep) {
		let container = creep.room.find(FIND_STRUCTURES, {
			filer: (structure) => {
				return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) );
			},
		});

		let mainStorage = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => {
				return (
					(structure.structureType == STRUCTURE_EXTENSION ||
						structure.structureType == STRUCTURE_SPAWN) &&
					structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
				);
			},
		});
		console.log(container);
		if (mainStorage.length > 0) {
			if (container.transfer(creep, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
				creep.moveTo(container);
			}
		}
	},
};

module.exports = roleTransfer;
