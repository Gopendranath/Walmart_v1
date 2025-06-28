import React from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { cn } from "@/lib/utils";

import { Item8 } from "@/grid/Item8";
import { Item9 } from "@/grid/Item9";
import { Item10 } from "@/grid/Item10";
import { Item11 } from "@/grid/Item11";

import { Ripple } from "@/components/magicui/ripple";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { GridPattern } from "@/components/magicui/grid-pattern";

// Define a type for cards
interface Card {
  type: "promo" | "banner";
  title: string;
  cta: string;
  css?: string; 
  subtitle?: string;
  description?: string;
  image?: string;
  element?: React.ReactNode;
}

const cards: Card[] = [
  {
    type: "promo",
    title: "check out our deals",
    description: "Deals drop 7/8 at 12am ET",
    cta: "See Deals",
    css: "bg-primary/40 dark:bg-primary-dark/30 text-primary-foreground",
    element: (
      <Ripple
        mainCircleSize={200}
        mainCircleOpacity={0.3}
        numCircles={8}
        className="w-full h-full"
      />
    ),
  },
  {
    type: "banner",
    title: "Walmart DEALS",
    subtitle: "Up to 50% off",
    cta: "Shop now",
    css: "bg-card/40 dark:bg-card-dark/40",
    image: "https://i.imgur.com/8Km9tLL.png",
    // description: "Don't miss out on our biggest discounts!",
    // element: (
    //   <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
    //     <ambientLight />
    //     <Item3
    //       material={
    //         <meshStandardMaterial
    //           color="#ff6347"
    //           metalness={0.6}
    //           roughness={0.3}
    //         />
    //       }
    //     />
    //   </Canvas>
    // ),
  },
  {
    type: "promo",
    title: "Only at Walmart — Baby Evie toys & more",
    cta: "Shop new arrivals",
    css: "",
    image: "https://i.imgur.com/PeppaPig.png",
    element: <DotPattern width={20} height={20} cx={1} cy={1} cr={1} />,
  },
  {
    type: "promo",
    title: "Oklahoma City Thunder NBA champs gear",
    cta: "Shop now",
    css: "bg-muted/40 dark:bg-muted-dark/40",
    image: "https://i.imgur.com/ThunderNBA.png",
    // element: (
    //   <AnimatedGridPattern
    //     className="w-full inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
    //     numSquares={30}
    //     maxOpacity={0.1}
    //     duration={3}
    //     repeatDelay={1}
    //   />
    // ),
  },
  {
    type: "promo",
    title: "Save big on hundreds of pet picks!",
    cta: "Shop now",
    css: "",
    image: "https://i.imgur.com/6oK8bQp.png",
    element: (
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />
    ),
  },
  {
    type: "promo",
    title: "Lilo & Stitch toys & more",
    cta: "Shop now",
    css: "bg-card/40 dark:bg-card-dark/40",
    image: "https://i.imgur.com/1Q9Z1Zm.png",
    element: (
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={2}
        className={cn(
          "[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] "
        )}
      />
    ),
  },
  {
    type: "promo",
    title: "Up to 40% off",
    cta: "Shop now",
    css: "bg-orange dark:bg-orange-dark",
    image: "https://i.imgur.com/3Q1Z1Zm.png",
    element: (
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={2}
        className={cn(
          "[mask-image:linear-gradient(to_top,white,transparent,transparent)] "
        )}
      />
    ),
  },
  {
    type: "promo",
    title: "Summer home trends",
    cta: "Shop home",
    css: "bg-[#d4a426] dark:bg-[#d4a426]",
    image: "https://i.imgur.com/4Q9Z1Zm.png",
    element: (
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight />
        <Item8
          material={
            <meshStandardMaterial
              color="#ff6347"
              roughness={0.5}
              metalness={0.4}
            />
          }
        />
      </Canvas>
    ),
  },
  {
    type: "promo",
    title: "Hot, new beauty from $10",
    cta: "Shop now",
    css: "bg-[#34c759] dark:bg-[#2f6d31]",
    image: "https://i.imgur.com/5Q9Z1Zm.png",
    element: (
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight />
        <Item9
          material={
            <meshStandardMaterial
              color="#ff6347"
              metalness={0.6}
              roughness={0.3}
            />
          }
        />
      </Canvas>
    ),
  },
  {
    type: "promo",
    title: "Get groceries & more delivered free with Walmart+",
    cta: "Try Walmart+ for free",
    css: "bg-[#87ceeb] dark:bg-[#1e3a8a]",
    image: "https://i.imgur.com/6Q9Z1Zm.png",
    element: (
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight />
        <Item10
          material={
            <meshStandardMaterial
              color="blue"
              roughness={0.3}
              metalness={0.6}
              side={THREE.DoubleSide}
            />
          }
        />
      </Canvas>
    ),
  },
  {
    type: "promo",
    title: "Back to school savings",
    cta: "Shop now",
    css: "bg-[#8a2be2] dark:bg-[#8a2be2]",
    image: "https://i.imgur.com/7Q9Z1Zm.png",
    element: (
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight />
        <Item11
          material={
            <meshStandardMaterial
              color="turquoise"
              roughness={0.4}
              metalness={0.2}
            />
          }
        />
      </Canvas>
    ),
  },
];

interface ProductData {
  image: string;
  title: string;
  id: number;
  price: number;
}

const Products: ProductData[] = [
  {
    image: "https://i.imgur.com/1Q9Z1Zm.png",
    title: "Up to 40% off",
    id: 1,
    price: 12.99,
  },
  {
    image: "https://i.imgur.com/2Q9Z1Zm.png",
    title: "Up to 40% off",
    id: 2,
    price: 9.99,
  },
  {
    image: "https://i.imgur.com/3Q1Z1Zm.png",
    title: "Up to 40% off",
    id: 3,
    price: 9.99,
  },
  {
    image: "https://i.imgur.com/4Q9Z1Zm.png",
    title: "Up to 40% off",
    id: 4,
    price: 9.99,
  },
  {
    image: "https://i.imgur.com/5Q9Z1Zm.png",
    title: "Up to 40% off",
    id: 5,
    price: 9.99,
  },
  {
    image: "https://i.imgur.com/6Q9Z1Zm.png",
    title: "Up to 40% off",
    id: 6,
    price: 9.99,
  },
  {
    image: "https://i.imgur.com/7Q9Z1Zm.png",
    title: "Up to 40% off",
    id: 7,
    price: 9.99,
  },
];


export { cards, Products };