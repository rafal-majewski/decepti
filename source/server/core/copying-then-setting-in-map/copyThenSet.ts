export function copyThenSet<Key, Value>(
	map: ReadonlyMap<Key, Value>,
	key: Key,
	value: Value,
): Map<Key, Value> {
	const copiedMap: Map<Key, Value> = new Map(map);
	copiedMap.set(key, value);
	return copiedMap;
}
