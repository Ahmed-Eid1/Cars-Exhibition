const fs = require('fs');
const path = require('path');

async function main() {
  const threeMod = await import('three');
  const THREE = threeMod.default;

  // Use the CJS version of GLTFLoader if available
  const loaderCJS = await import('three/examples/js/loaders/GLTFLoader.js');
  const GLTFLoader = loaderCJS.GLTFLoader;

  const glbPath = 'public/engine.glb';
  const buffer = fs.readFileSync(glbPath);

  console.log('=== GLB Scene Graph Diagnosis ===\n');
  console.log('File size:', buffer.length, 'bytes\n');

  const loader = new GLTFLoader();

  loader.parse(buffer, '', (gltf) => {
    const scene = gltf.scene;

    let meshCount = 0;

    function traverse(node, depth = 0) {
      const indent = '  '.repeat(depth);

      if (node.isMesh) {
        console.log(indent + '[MESH] name: "' + node.name + '"');
        meshCount++;
      } else if (node.isGroup) {
        console.log(indent + '[GROUP] name: "' + node.name + '"');
      } else if (node.isCamera) {
        console.log(indent + '[CAMERA] name: "' + node.name + '"');
      } else {
        console.log(indent + '[' + (node.type || 'NODE') + '] name: "' + node.name + '"');
      }

      node.children.forEach(child => traverse(child, depth + 1));
    }

    traverse(scene);

    console.log('\n=== Summary ===');
    console.log('Total meshes found:', meshCount);

  }, (error) => {
    console.error('Parse error:', error.message);
  });
}

main();
