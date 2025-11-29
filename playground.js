import { Alloy } from './src/alloy.js';

const users = [
    { id: 1, name: "Alice", age: 30, role: "admin", secret: "hash_123" },
    { id: 2, name: "Bob", age: 17, role: "user", secret: "hash_456" },
    { id: 3, name: "Charlie", age: 25, role: "user", secret: "hash_789" },
    { id: 4, name: "Dave", age: 40, role: "admin", secret: "hash_000" }
];


const sqlResult = Alloy.from(users)
    .select(['name', 'role'])
    .run();

console.log("Result:", JSON.stringify(sqlResult));


const mapResult = Alloy.from(users)
    .where(u =>u.role == "admin")
    .select(u => ({
        displayName: u.name.toUpperCase(),
        canVote: u.age >= 31
    }))
    .run();

console.log("Result:", JSON.stringify(mapResult));

const chainResult = Alloy.from(users)
    .where(u => u.role === 'admin')
    .select(['name'])
    .run();

console.log("Result:", JSON.stringify(chainResult));
