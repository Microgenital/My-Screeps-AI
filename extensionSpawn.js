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
		if (Game.spawns["Spawn1"].memory[roadToController] == undefined) {
			Game.spawns["Spawn1"].memory[roadToController] = false;
		}
		if (Game.spawns["Spawn1"].memory[roadToController] == false) {
			let startPos2 = Game.spawns["Spawn1"].pos;
			let targetPos2 = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {
				filter: (structure) => {
					return structure.structureType == STRUCTURE_CONTROLLER;
				},
			});

			/*
			because "find" is giving me an array, i have to index it in the path generation
			but there is only 1 room controller per room so i can hardcode it.
			*/

			let path2 = Game.rooms[roomName].findPath(startPos2, targetPos2[0].pos);
			for (let i in path2) {
				if (path2[i].x == targetPos2[0].pos.x && path2[i].y == targetPos2[0].pos.y) {
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
	},
};
module.exports = extensionSpawn;
