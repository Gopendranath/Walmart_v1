import { useGSAP } from "@gsap/react";
import { Center, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { useCallback, useRef, type JSX } from "react";
import * as THREE from "three";

type Item9Props = {
  material: JSX.Element;
};

export const Item9 = ({ material }: Item9Props) => {
  const refList = useRef<THREE.Mesh[]>([]);

  const getRef = useCallback((mesh: THREE.Mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  useGSAP(() => {
    if (refList.current.length === 0) return;

    refList.current.forEach((mesh, index) => {
      gsap.to(mesh.scale, {
        x: 0.3,
        z: 0.3,
        delay: 0.25 * index,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: 1,
      });
    });
  }, []);

  return (
    <Center>
      <group rotation={[0, 0, Math.PI / 4]}>
        <group rotation={[0, 0, Math.PI / 2]}>
          <Instances>
            <cylinderGeometry args={[1, 1, 0.2, 64]} />
            {material}
            {Array.from({ length: 10 }).map((_, index) => (
              <Instance
                ref={getRef}
                key={index}
                position={[0, 0.5 * index, 2]}
              />
            ))}
          </Instances>
        </group>
      </group>
    </Center>
  );
};
