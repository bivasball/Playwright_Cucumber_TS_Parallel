const start = 10;
const end = 35;
const tags = Array.from({ length: end - start + 1 }, (_, i) => `@test_${(start + i).toString().padStart(3, '0')}`).join(' or ');
console.log(tags);
