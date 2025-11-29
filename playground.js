import { Alloy } from './src/alloy.js';

// 1. Create some raw data (The "User's Notebook")
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
];

console.log("--- TEST 1: Initialization ---");
// 2. Load the data into Alloy
const test = Alloy.from(1);
const query = Alloy.from(users);
console.log("Engine started successfully.");

console.log("\n--- TEST 2: The Immutability Check ---");
// 3. The "Magic Trick"
// We modify the original user array. 
// If our storage strategy works, Alloy shouldn't care.
console.log("Original Data BEFORE modification:", JSON.stringify(users));

users.pop(); // User deletes "Bob" from their list!
console.log("Original Data AFTER modification: ", JSON.stringify(users));

// 4. Inspect Alloy
// Alloy should still have "Bob" because we made a structural clone.
const internalData = query.inspect();
console.log("Alloy Internal Storage:         ", JSON.stringify(internalData));

if (internalData.length === 2) {
    console.log("\n✅ SUCCESS: The Vault is secure. Data is immutable.");
} else {
    console.log("\n❌ FAILURE: The Vault was breached.");
}