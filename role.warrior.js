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
// TODO: Warrior darf nicht alleine losziehen, nur dann kämpfen gehen wenn mehr als ?? existieren. Eventuell vorher Sammelpunkt festlegen.
module.exports = roleWarrior;
