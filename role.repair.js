let roleRepair = { // CURRENTLY NOT USED
	run: function (creep) {
		let targets = creep.room.find(FIND_STRUCTURES, {
			filter: (structure) => structure.hitsMax / 2 < structure.hits,
		});
	},
};

module.exports = roleRepair;
