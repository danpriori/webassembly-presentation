var importObject = {
  env: {
    memoryBase: 0,
    memory: new WebAssembly.Memory({ initial: 256, maximum: 256 }),
    table: new WebAssembly.Table({ initial: 4, maximum: 10 , element: 'anyfunc' }),
    _imported_func: function(arg) {
      return arg + 1021212;
    }
  }
};
function loadWebAssembly(fileName) {
  return fetch(fileName)
    .then(response => response.arrayBuffer())
    .then(bytes => { return WebAssembly.instantiate(bytes, importObject)})
};
  
loadWebAssembly('math.wasm')
  .then(wasmObj => {
    let squarer = wasmObj.instance.exports._squarer;
    let add = wasmObj.instance.exports._add;
    console.log('Multi...', squarer(4));
    console.log('Add...', add(4));

    let offset = wasmObj.instance.exports._getData();
    let linearMemory = new Uint32Array(importObject.env.memory.buffer, offset, 10);

    // populate with some data
    for (let i = 0; i < linearMemory.length; i++) {
      linearMemory[i] = i;
    }

    // mutate the array within the WebAssembly module
    wasmObj.instance.exports._addLinear(30);

    for (var i = 0; i < linearMemory.length; i++) {
      console.log(linearMemory[i]);
    }
  });