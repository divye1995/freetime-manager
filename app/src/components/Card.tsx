import { CardModel } from "../utils/types";
import "./Card.css";

export interface CardProps {
  model: CardModel;
}

export default function Card({ model }: CardProps) {
  const { title = "", icon = "", category = "" } = model;

  return (
    <div>
      <div className="card">
        <img className="icon" src={icon} alt={category} />
        <div className="title">{title}</div>
      </div>
    </div>
  );
}
