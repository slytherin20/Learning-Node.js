const os=require('os');
var total_mem=os.totalmem();
var free_mem=os.freemem();
console.log(total_mem);
console.log(free_mem);