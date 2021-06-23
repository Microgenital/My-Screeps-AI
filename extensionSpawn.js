let extensionSpawn = {
	run: function () {
		let roomName = Game.spawns["Spawn1"].pos.roomName;
		let sources = Game.rooms[roomName].find(FIND_SOURCES);
		let memorySourceName = "Source_";
		let memorySet = 0;
		let startPos;
		let targetPos;
		let roadToController = "roadToController";

		// Todo: Automatisches bauen von erweiterungen eingügen

		for (let i in sources) {
			let newMemorySourceName = memorySourceName + memorySet;

			if (Game.spawns["Spawn1"].memory[newMemorySourceName] == undefined) {
				Game.spawns["Spawn1"].memory[newMemorySourceName] = false;
			}
			// FIXME: Manchmal baut er die Straße nicht bis zum Punkt wo sie hin soll.
			if (Game.spawns["Spawn1"].memory[newMemorySourceName] == false) {
				startPos = Game.spawns["Spawn1"].pos;
				targetPos = sources[memorySet].pos;
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
/* TODO: This is not Working, im not sure why...
		if (Game.spawns["Spawn1"].memory[roadToController] == undefined) {
			Game.spawns["Spawn1"].memory[roadToController] = false;
		}
		if (Game.spawns["Spawn1"].memory[roadToController] == false) {
			startPos = Game.spawns["Spawn1"].pos;
			targetPos = Game.rooms[roomName].find(FIND_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_CONTROLLER;
				},
			});
			roomName = Game.spawns["Spawn1"].pos.roomName;
			let path2 = Game.rooms[roomName].findPath(startPos, targetPos);
			console.log(roomName);
			for (i in path2) {
				if (path2[i].x == targetPos.x && path2[i].y == targetPos.y) {
					continue;
				} else {
					Game.rooms[roomName].createConstructionSite(
						path2[i].x,
						path2[i].y,
						STRUCTURE_ROAD
					);
				}
			}
		}
		Game.spawns["Spawn1"].memory[roadToController] = true;
		*/
	},
};
module.exports = extensionSpawn;
