const fs = require('fs');

try {
  const buffer = fs.readFileSync('public/engine.glb');
  const magic = buffer.readUInt32LE(0);
  if (magic !== 0x46546C67) {
    console.error('Not a valid GLB file.');
    process.exit(1);
  }

  const jsonChunkLength = buffer.readUInt32LE(12);
  const jsonChunkType = buffer.readUInt32LE(16);

  if (jsonChunkType !== 0x4E4F534A) {
    console.error('First chunk is not JSON.');
    process.exit(1);
  }

  const jsonBuffer = buffer.slice(20, 20 + jsonChunkLength);
  const jsonString = jsonBuffer.toString('utf8');
  const gltf = JSON.parse(jsonString);

  console.log("=== Nodes with Meshes ===");
  if (gltf.nodes) {
    gltf.nodes.forEach((node, i) => {
        if(node.mesh !== undefined) {
            console.log(`Node ${i}: ${node.name || 'Unnamed'} -> Mesh ${node.mesh}`);
        }
    });
  } else {
    console.log("No nodes found.");
  }
  
  console.log("\n=== Meshes ===");
  if (gltf.meshes) {
    gltf.meshes.forEach((mesh, i) => {
        console.log(`Mesh ${i}: ${mesh.name || 'Unnamed'}`);
    });
    console.log(`\nTotal Meshes: ${gltf.meshes.length}`);
  } else {
    console.log("No meshes found.");
  }
} catch (e) {
  console.error("Error:", e);
}
