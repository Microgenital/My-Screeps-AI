let extensionSpawn = {
	run: function () {
		let roomName = Game.spawns["Spawn1"].pos.roomName;
		let sources = Game.rooms[roomName].find(FIND_SOURCES);
		let memorySourceName = "Source_";
		let memorySet = 0;

		// Todo: Automatisches bauen von erweiterungen eingügen
		// TODO: Automatisches bauen von Straßen zur Energie, das nur einmal ausgeführt wird.

		for (let i in sources) {
			let newMemorySourceName = memorySourceName + memorySet;

			if (Game.spawns["Spawn1"].memory[newMemorySourceName] == undefined) {
				Game.spawns["Spawn1"].memory[newMemorySourceName] = false;
			}
			// FIXME: Manchmal baut er die Straße nicht bis zum Punkt wo sie hin soll.
			if (Game.spawns["Spawn1"].memory[newMemorySourceName] == false) {
				let startPos = Game.spawns["Spawn1"].pos;
				let targetPos = sources[memorySet].pos;
				let path = Game.rooms[roomName].findPath(startPos, targetPos);
				for (i in path) {
					if (path[i].x == targetPos.x && path[i].y == targetPos.y) {
						continue;
					} else {
						Game.rooms[roomName].createConstructionSite(
							path[i].x,
							path[i].y,
							STRUCTURE_ROAD
						);
					}
					Game.spawns["Spawn1"].memory[newMemorySourceName] = true;
				}
			}
			memorySet += 1;
		}
	},
};
module.exports = extensionSpawn;
