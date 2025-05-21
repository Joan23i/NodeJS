const os = require('node:os');

console.log('Memoria libre inicial:', os.freemem(), 'bytes');

const vector = [];

console.log('Llenando vector con 1,000,000 de enteros...');
for (let i = 0; i < 1000000; i++) {
    vector.push(i);
}

console.log('Memoria libre después de llenar el vector:', os.freemem(), 'bytes');