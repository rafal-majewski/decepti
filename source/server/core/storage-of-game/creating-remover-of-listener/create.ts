import type {listener_} from "../listener/module.ts";
import type {removerOfListener_} from "../remover-of-listener/module.ts";
import type {StorageOfGame} from "../StorageOfGame.ts";
export function create(
	storage: StorageOfGame,
	listener: listener_.Listener,
): removerOfListener_.Remover {
	return function remove(): void {
		storage.removeListener(listener);
		return;
	};
}
