import fs from 'fs';
import { GLTFLoader } from 'three';
import { Blob } from 'buffer';

const glbPath = 'public/engine.glb';
const buffer = fs.readFileSync(glbPath);

console.log('File size:', buffer.length, 'bytes\n');

// Create a simple scene to parse the GLB
const parser = new THREE.GLTFParser();
parser.load(glbPath).then((gltf) => {
  console.log('=== Scene Structure ===\n');

  function countNodes(node, depth = 0) {
    const indent = '  '.repeat(depth);
    if (node.isMesh) {
      console.log(indent + '- Mesh: "' + node.name + '"');
    } else if (node.isGroup) {
      console.log(indent + '- Group: "' + node.name + '"');
    } else {
      console.log(indent + '- ' + node.type + ': "' + node.name + '"');
    }
    node.children.forEach(child => countNodes(child, depth + 1));
  }

  countNodes(gltf.scene);

  // Count meshes
  let meshCount = 0;
  function countMeshes(node) {
    if (node.isMesh) meshCount++;
    node.children.forEach(child => countMeshes(child));
  }
  countMeshes(gltf.scene);

  console.log('\nTotal meshes:', meshCount);
});
