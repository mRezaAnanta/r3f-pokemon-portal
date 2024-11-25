import { useState, useRef, useEffect } from "react";
import { Environment, MeshPortalMaterial, OrbitControls, RoundedBox, useTexture, Text, CameraControls, useCursor } from "@react-three/drei";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { easing } from "maath"

import Fish from "./Fish"
import Dragon from "./Dragon"
import Cactus from "./Cactus"

export const Experience = () => {
  const [active, setActive] = useState(null)
  const [hovered, setHovered] = useState(null)
  useCursor(hovered)
  const controlsRef = useRef()
  const scene = useThree((state) => state.scene)

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3()
      scene.getObjectByName(active).getWorldPosition(targetPosition)
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      )
    } else {
      controlsRef.current.setLookAt(
        0,
        0,
        10,
        0,
        0,
        0,
        true
      )
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      {/* <OrbitControls /> */}
      <CameraControls
        ref={controlsRef}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 6}
      />
      <MonsterStage
        texture={'textures/anime_art_style_a_water_based_pokemon_like_environ.jpg'}
        name={"Fish"}
        color={"#38adcf"}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === "Fish"} />
      </MonsterStage>
      <MonsterStage
        texture={'textures/anime_art_style_lava_world.jpg'}
        name={"Dragon"}
        color={"#df8d52"}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Dragon scale={0.6} position-y={-1} hovered={hovered === "Dragon"} />
      </MonsterStage>
      <MonsterStage
        texture={'textures/anime_art_style_cactus_forest.jpg'}
        name={"Cactus"}
        color={"#739d3c"}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactus scale={0.6} position-y={-1} hovered={hovered === "Cactus"} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  const map = useTexture(texture)
  const portalMaterial = useRef()

  useFrame((_state, delta) => {
    const worldOpen = active === name
    easing.damp(portalMaterial.current, "blend", worldOpen ? 1 : 0, 0.2, delta)
  })

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
    <RoundedBox
      name={name}
      args={[2, 3, 0.1]}
      onDoubleClick={() => setActive(active === name ? null : name)}
      onPointerEnter={() => setHovered(name)}
      onPointerLeave={() => setHovered(null)}
    >
      <MeshPortalMaterial
        ref={portalMaterial}
        side={THREE.DoubleSide}
      // blend={active === name ? 1 : 0}
      >
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
