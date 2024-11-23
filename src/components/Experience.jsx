import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture } from "@react-three/drei";
import * as THREE from "three";
import Fish from "./Fish"
import Dragon from "./Dragon"
import Cactus from "./Cactus"

export const Experience = () => {

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <MonsterStage texture={'textures/anime_art_style_a_water_based_pokemon_like_environ.jpg'}>
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>
      <MonsterStage texture={'textures/anime_art_style_lava_world.jpg'} position-x={-2.5} rotation-y={Math.PI / 8}>
        <Dragon scale={0.6} position-y={-1} />
      </MonsterStage>
      <MonsterStage texture={'textures/anime_art_style_cactus_forest.jpg'} position-x={2.5} rotation-y={-Math.PI / 8}>
        <Cactus scale={0.6} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, ...props }) => {
  const map = useTexture(texture)
  return <group {...props}>
    <RoundedBox args={[2, 3, 0.1]}>
      <MeshPortalMaterial side={THREE.DoubleSide}>
        <ambientLight intensity={1} />
        <Environment preset="sunset" />
        {children}
        <mesh>
          <sphereGeometry args={[10, 32, 32]} />
          <meshStandardMaterial map={map} side={THREE.BackSide} />
        </mesh>
      </MeshPortalMaterial>
    </RoundedBox>
  </group>
}
