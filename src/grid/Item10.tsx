import { useGSAP } from "@gsap/react";
import { Center, Instance, Instances } from "@react-three/drei";
import gsap from "gsap";
import { useCallback, useMemo, useRef, type JSX } from "react";
import * as THREE from "three";

type Item10Props = {
  material: JSX.Element;
};

export const Item10 = ({ material }: Item10Props) => {
  const refList = useRef<THREE.Group[]>([]);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();

    // Outer arc
    shape.absarc(0, 0, 1, 0, Math.PI / 2, false);
    shape.lineTo(Math.cos(Math.PI / 2) * 0.5, Math.sin(Math.PI / 2) * 0.5);

    // Inner arc
    shape.absarc(0, 0, 0.2, Math.PI / 2, 0, true);
    shape.lineTo(1, 0);

    const extrudeSettings = {
      steps: 1,
      depth: 0.3,
      bevelEnabled: false,
    };

    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  const getRef = useCallback((mesh: THREE.Group) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  useGSAP(() => {
    if (refList.current.length === 0) return;

    gsap
      .timeline({
        repeat: -1,
        repeatDelay: 0.5,
      })
      .to(
        refList.current.map((item) => item.position),
        {
          x: (i) => `+=${Math.sin((i / 4) * 2 * Math.PI) * 0.5}`,
          z: (i) => `+=${Math.cos((i / 4) * 2 * Math.PI) * 0.5}`,
          duration: 1.5,
          ease: "power1.out",
        }
      )
      .to(
        refList.current.map((item) => item.rotation),
        {
          z: `+=${Math.PI}`,
          duration: 2,
        },
        0
      )
      .to(
        refList.current.map((item) => item.position),
        {
          x: 0,
          z: 0,
          duration: 1.5,
        },
        1
      );
  }, []);

  return (
    <Center scale={1.6}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <Instances geometry={geometry}>
          {material}
          {Array.from({ length: 4 }).map((_, index) => (
            <group
              key={index}
              ref={getRef}
              rotation={[0, (index * Math.PI) / 2, 0]}
            >
              <Instance rotation={[Math.PI / 2, 0, 0]} />
            </group>
          ))}
        </Instances>
      </group>
    </Center>
  );
};
