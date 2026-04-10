# custom-ts-utils

Small, zero-dependency TypeScript utility library.

- ESM-first package
- Immutable behavior (returns new values, does not mutate input)
- Safe for `null` / `undefined` inputs in utility functions

## Install

```bash
npm i custom-ts-utils
```

## Quick usage

```ts
import {
	map,
	filter,
	reduce,
	reduceRight,
	some,
	every,
	find,
	pluck,
	lens,
	view,
	set,
} from "custom-ts-utils";

const nums = [1, 2, 3, 4];

const doubled = map((n) => n * 2, nums);                // [2, 4, 6, 8]
const evens = filter((n) => n % 2 === 0, nums);         // [2, 4]
const total = reduce((acc, n) => acc + n, 0, nums);     // 10
const totalRight = reduceRight((acc, n) => acc + n, 0, nums); // 10
const hasBig = some((n) => n > 3, nums);                // true
const allPositive = every((n) => n > 0, nums);          // true
```

## Functions

### `map(transform, array)`
Transforms each item and returns a new array.

### `filter(predicate, array)`
Returns a new array with items that match the predicate.

### `reduce(reducer, initialValue, array)`
Reduces items left-to-right into one value.

### `reduceRight(reducer, initialValue, array)`
Reduces items right-to-left into one value.

### `some(predicate, array)`
Returns `true` if at least one item matches.

### `every(predicate, array)`
Returns `true` if all items match.

### `find(array, predicate)`
Finds first item matching a predicate.

### `find(array, key, value)`
Finds first item where `item[key] === value`.

```ts
const users = [
	{ id: 1, name: "A" },
	{ id: 2, name: "B" },
];

find(users, (u) => u.id === 2);   // { id: 2, name: "B" }
find(users, "name", "A");      // { id: 1, name: "A" }
```

### `pluck(keyOrPathOrKeys, array)`
Extract values from objects by:
- single key: `"name"`
- deep path: `"address.city"`
- multiple keys: `["id", "name"]`

```ts
const rows = [
	{ id: 1, name: "A", address: { city: "Chennai" } },
	{ id: 2, name: "B", address: { city: "hyd } },
];

pluck("name", rows);            // ["A", "B"]
pluck("address.city", rows);    // ["Chennai", "hyd"]
pluck(["id", "name"], rows);  // [{ id: 1, name: "A" }, { id: 2, name: "B" }]
```

### Lens utilities: `lens(path)`, `view(lens, obj)`, `set(lens, value, obj)`
Simple immutable nested read/write helpers.

```ts
const user = { profile: { name: "pugal" } };
const nameLens = lens("profile.name");

view(nameLens, user); // "livi"

const updated = set(nameLens, "harish", user);
// updated => { profile: { name: "harish" } }
// user is unchanged
```

## Notes

- Package format: ESM only
- Type declarations included
