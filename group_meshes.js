import fs from 'fs';

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

  const meshNames = [];
  if (gltf.meshes) {
    gltf.meshes.forEach((mesh, i) => {
      const name = mesh.name || `Unnamed_Mesh_${i}`;
      meshNames.push(name);
    });
  }

  let out = "=== All Mesh Names (Numbered) ===\n";
  meshNames.forEach((name, i) => {
    out += `${i + 1}. ${name}\n`;
  });

  out += "\n=== Top 30 Mesh Names ===\n";
  meshNames.slice(0, 30).forEach((name, i) => {
    out += `${i + 1}. ${name}\n`;
  });

  out += "\n=== Grouped by Prefix ===\n";
  const groups = {};
  meshNames.forEach(name => {
    // Group by base material name (removing the instance suffix)
    let prefix = name.split('__Instance')[0];
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(name);
  });

  for (const [prefix, names] of Object.entries(groups)) {
    out += `Group "${prefix}": ${names.length} meshes\n`;
  }
  
  fs.writeFileSync('group_output.txt', out, 'utf8');
  console.log("Done");

} catch (e) {
  console.error("Error:", e);
}
