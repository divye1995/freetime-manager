import { animated, to as interpolate, useSprings } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import styles from "../styles.module.css";
import { CardModel } from "../utils/types";

const createCard = (index: number) => ({
  title: `Function Programming ${index}`,
  category: "learn",
  icon: "assets/create-icon.png",
});

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${
    r / 10
  }deg) rotateZ(${r}deg) scale(${s})`;
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
});
// const Cards = generateCards(10);

export default function MainDeck() {
  const [gone] = useState(() => new Set()); // The set flags all the cards that are flicked out
  // const [cards, setCards] = useState<CardModel[]>([]);

  const [props, api] = useSprings(10, (i) => ({
    ...to(i),
    from: from(i),
  }));
  const bind = useDrag(
    ({
      args: [index],
      active,
      movement: [mx],
      direction: [xDir],
      velocity: [vx],
    }) => {
      const trigger = vx > 0.2; // If you flick hard enough it should trigger the card to fly out
      if (!active && trigger) gone.add(index); // If button/finger's up and trigger velocity is reached, we flag the card ready to fly out
      api.start((i) => {
        if (index !== i) return; // We're only interested in changing spring-data for the current spring
        const isGone = gone.has(index);
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0; // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0); // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1; // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        };
      });
      if (!active && gone.size === 10)
        setTimeout(() => {
          gone.clear();
          api.start((i) => to(i));
        }, 600);
    }
  );
  const deck = (
    <>
      {props.map(({ x, y, rot, scale }, index) => (
        <animated.div key={index} className={styles.deck} style={{ x, y }}>
          <animated.div
            {...bind(index)}
            style={{
              transform: interpolate([rot, scale], trans),
            }}
          >
            <Card model={createCard(index)} />
          </animated.div>
        </animated.div>
      ))}
    </>
  );

  return <div className={`flex fill center ${styles.container}`}>{deck}</div>;
}
