let roleWarrior = {
	run: function (creep) {
		let target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
		if (target) {
			if (creep.attack(target) == ERR_NOT_IN_RANGE) {
				creep.moveTo(target);
			}
		} else {
			creep.moveTo(Game.spawns["Spawn1"].pos.x - 3, Game.spawns["Spawn1"].pos.y - 3);
		}
	},
};
// TODO: Warrior may not go alone, only go to fight if more than ?? exist. Possibly set a rally point beforehand.
module.exports = roleWarrior;
