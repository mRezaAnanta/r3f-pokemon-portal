import { useState } from "react";
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import Fish from "./Fish"
import Dragon from "./Dragon"
import Cactus from "./Cactus"

export const Experience = () => {
  const [active, setActive] = useState(null)

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <OrbitControls />
      <MonsterStage
        texture={'textures/anime_art_style_a_water_based_pokemon_like_environ.jpg'}
        name={"Fish"}
        color={"#38adcf"}
        active={active}
        setActive={setActive}
      >
        <Fish scale={0.6} position-y={-1} />
      </MonsterStage>
      <MonsterStage
        texture={'textures/anime_art_style_lava_world.jpg'}
        name={"Dragon"}
        color={"#df8d52"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
      >
        <Dragon scale={0.6} position-y={-1} />
      </MonsterStage>
      <MonsterStage
        texture={'textures/anime_art_style_cactus_forest.jpg'}
        name={"Cactus"}
        color={"#739d3c"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
      >
        <Cactus scale={0.6} position-y={-1} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({ children, texture, name, color, active, setActive, ...props }) => {
  const map = useTexture(texture)
  return <group {...props}>
    <Text
      font="fonts/Caprasimo-Regular.ttf"
      fontSize={0.3}
      position={[0, -1.4, 0.05]}
      anchorY={"bottom"}
    >
      {name}
      <meshBasicMaterial color={color} toneMapped={false} />
    </Text>
    <RoundedBox args={[2, 3, 0.1]} onDoubleClick={() => setActive(active === name ? null : name)}>
      <MeshPortalMaterial side={THREE.DoubleSide} blend={active === name ? 1 : 0}>
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
