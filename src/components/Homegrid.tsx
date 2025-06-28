import { cards, Products } from "@/constants/grid";
import { WarpBackground } from "./magicui/warp-background";
import { Link } from "react-router-dom";

const gridPositions = [
  "col-span-3 row-span-3", // 1
  "col-span-6 row-span-5 col-start-4", // 2
  "col-span-3 row-span-3 col-start-10", // 3
  "col-span-3 row-span-5 row-start-4", // 4
  "col-span-3 row-span-3 col-start-10 row-start-4", // 5
  "col-span-3 row-span-5 col-start-4 row-start-6", // 6
  "col-span-3 row-span-5 col-start-7 row-start-6", // 7
  "col-span-3 row-span-4 col-start-10 row-start-7", // 8
  "col-span-3 row-span-2 row-start-9", // 9
  "col-span-6 row-span-2 row-start-11", // 10
  "col-span-6 row-span-2 col-start-7 row-start-11", // 11
  "col-span-6 row-span-2 row-start-13", // 12
];

const mobileGridPositions = [
  "col-span-4 row-span-2", // 1
  "col-span-4 row-span-2 row-start-3", // 2
  "col-span-2 row-span-2 row-start-5", // 3
  "col-span-2 row-span-2 col-start-3 row-start-5", // 4
  "col-span-2 row-span-2 row-start-7", // 5
  "col-span-2 row-span-2 col-start-3 row-start-7", // 6
  "col-span-4 row-start-9", // 7
  "col-span-4 row-start-10", // 8
  "col-span-4 row-start-11", // 9
  "col-span-4 row-start-12", // 10
];

const gridPositions2 = [
  "col-span-4 row-span-8",
  "col-span-3 row-span-4 col-start-5",
  "col-span-3 row-span-4 col-start-8",
  "col-span-6 row-span-4 col-start-5 row-start-5",
  "col-span-2 row-span-8 col-start-11 row-start-1",
];
// "grid grid-cols-12 grid-rows-8 gap-4"

const gridMobileposition2 = [
  "col-span-4 row-span-2",
  "col-span-2 row-span-2 row-start-3",
  "col-span-2 row-span-2 col-start-3 row-start-3",
  "col-span-4 row-span-2 row-start-5",
  "col-span-4 row-span-2 row-start-7",
];
//  "grid grid-cols-4 grid-rows-8 gap-4",

const animatedEmoji = (
  <span
    role="img"
    aria-label="sparkles"
    className="animate-bounce text-5xl md:text-7xl select-none pointer-events-none"
  >
    ✨
  </span>
);

export const MobileHomeGrid = () => {
  return (
    <main className="min-h-screen py-4">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-4 grid-rows-8 gap-2">
          {cards.slice(0, mobileGridPositions.length).map((card, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow flex flex-col justify-between p-3 overflow-hidden relative ${
                mobileGridPositions[idx] || ""
              } ${card.css || ""}`}
            >
              {card.type === "banner" ? (
                <WarpBackground>
                  <div className="flex flex-col h-full justify-between">
                    <div className="mb-4 text-center flex flex-col items-center w-full">
                      <h2 className="text-2xl md:text-4xl font-bold mb-2 w-full text-center">
                        {card.title}
                      </h2>
                      {card.subtitle && (
                        <div className="text-lg md:text-xl font-semibold mb-1 w-full text-center">
                          {card.subtitle}
                        </div>
                      )}
                      {card.description && (
                        <div className="text-base md:text-lg mb-2 w-full text-center">
                          {card.description}
                        </div>
                      )}
                      <Link to={"/deals"}>
                        <button
                          className="px-4 py-2 rounded font-semibold shadow hover:opacity-90 transition text-base md:text-lg mt-2"
                          style={{
                            background: "var(--primary)",
                            color: "var(--primary-foreground)",
                          }}
                        >
                          {card.cta}
                        </button>
                      </Link>
                    </div>
                  </div>
                </WarpBackground>
              ) : (
                <>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-semibold mb-1">
                        {card.title}
                      </h3>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <a
                        href="#"
                        className="font-medium hover:underline text-base md:text-lg"
                        style={{ color: "var(--link)" }}
                      >
                        {card.cta}
                      </a>
                      <span className="ml-2">
                        {card.element ? card.element : animatedEmoji}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const HomeGrid = () => {
  return (
    <main className="min-h-screen py-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="grid grid-cols-12 grid-rows-12 gap-3">
          {cards.slice(0, gridPositions.length).map((card, idx) => (
            <div
              key={idx}
              className={`rounded-lg shadow flex flex-col justify-between p-4 overflow-hidden relative hover:shadow-lg ${
                gridPositions[idx] || ""
              } ${card.css || ""}`}
            >
              {card.type === "banner" ? (
                <WarpBackground className="h-full">
                  <div className="flex flex-col h-full justify-between items-center">
                    <div className="text-center">
                      <h2
                        className="text-4xl md:text-6xl font-extrabold mb-4 text-primary drop-shadow-lg tracking-tight"
                        style={{
                          color: "var(--primary)",
                          textShadow: "0 2px 16px rgba(0,0,0,0.12)",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {card.title}
                      </h2>
                      {card.subtitle && (
                        <div
                          className="text-2xl md:text-3xl font-semibold mb-3 text-secondary drop-shadow-sm"
                          style={{
                            color: "var(--secondary)",
                            textShadow: "0 1px 8px rgba(0,0,0,0.10)",
                          }}
                        >
                          {card.subtitle}
                        </div>
                      )}
                      {card.description && (
                        <div
                          className="text-xl md:text-2xl mb-8 font-medium text-muted-foreground"
                          style={{
                            color: "var(--muted-foreground)",
                            lineHeight: 1.6,
                          }}
                        >
                          {card.description}
                        </div>
                      )}
                      <Link to={"/deals"}>
                        <button
                          className="px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 hover:opacity-95 transition-all text-xl md:text-2xl bg-gradient-to-r from-primary to-secondary"
                          style={{
                            background:
                              "linear-gradient(90deg, var(--primary) 60%, var(--secondary) 100%)",
                            color: "var(--primary-foreground)",
                            boxShadow: "0 4px 24px rgba(0,0,0,0.10)",
                          }}
                        >
                          {card.cta}
                        </button>
                      </Link>
                    </div>
                  </div>
                </WarpBackground>
              ) : (
                <>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-xl md:text-2xl font-semibold mb-2">
                        {card.title}
                      </h3>
                    </div>
                    <div className="flex items-end justify-between mt-2">
                      <a
                        href="#"
                        className="font-medium hover:underline text-lg md:text-xl"
                      >
                        {card.cta}
                      </a>
                      <span className="ml-2">
                        {card.element ? card.element : animatedEmoji}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const View2Grid = () => {
  return (
    <main className="py-4">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-4 grid-rows-8 gap-2">
          {Products.slice(0, gridMobileposition2.length).map((product, idx) => (
            <div
              key={product.id}
              className={`rounded-lg shadow flex flex-col justify-between p-3 overflow-hidden relative ${
                gridMobileposition2[idx] || ""
              } dark:bg-primary/80 dark:text-white bg-primary/40`}
            >
              <img
                src={`https://picsum.photos/200/300?random=${product.id}`}
                alt={product.title}
                className="w-full h-24 object-cover rounded mb-2"
              />
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-lg md:text-xl font-semibold mb-1">
                  {product.title}
                </h3>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-medium text-base md:text-lg">
                    ${product.price}
                  </span>
                  <span className="ml-2">{animatedEmoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export const View2MobileGrid = () => {
  return (
    <main className=" py-8">
      <div className="container mx-auto px-2 md:px-4">
        <div className="grid grid-cols-12 grid-rows-8 gap-3">
          {Products.slice(0, gridPositions2.length).map((product, idx) => (
            <div
              key={product.id}
              className={`rounded-lg shadow flex flex-col justify-between p-4 overflow-hidden relative hover:shadow-lg ${
                gridPositions2[idx] || ""
              } dark:bg-primary/80 dark:text-white bg-primary/40 `}
            >
              <img
                src={`https://picsum.photos/200/300?random=${product.id}`}
                alt={product.title}
                className="w-full h-32 object-cover rounded mb-3"
              />
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">
                  {product.title}
                </h3>
                <div className="flex items-end justify-between mt-2">
                  <span className="font-medium text-lg md:text-xl">
                    ${product.price}
                  </span>
                  <span className="ml-2">{animatedEmoji}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};
