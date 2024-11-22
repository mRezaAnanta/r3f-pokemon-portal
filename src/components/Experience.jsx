import { Environment, OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from "three";

export const Experience = () => {
  const map = useTexture('textures/anime_art_style_a_water_based_pokemon_like_environ.jpg')

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <mesh>
        <sphereGeometry args={[5, 32, 32]} />
        <meshStandardMaterial map={map} side={THREE.BackSide} />
      </mesh>
    </>
  );
};
