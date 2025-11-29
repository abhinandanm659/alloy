import { Alloy } from './src/alloy.js';

const users = [
    { id: 1, name: "Alice", active: false, role: "admin" },
    { id: 2, name: "Bob", active: false, role: "user" },
    { id: 3, name: "Charlie", active: false, role: "user" },
    { id: 4, name: "Dave", active: true, role: "admin" }
];

console.log("--- TEST 4: The Execution Engine ---");

const query = Alloy.from(users);

query
    .where(u => u.active === true)
    .where(u => u.role === 'admin');

// 4. Run
const result = query.run();

console.log("Final Result:", JSON.stringify(result));