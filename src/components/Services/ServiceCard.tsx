import "./Services.css";
import classNames from "classnames";
import type { ServiceCard as ServiceCardType } from "../../types/ServiceCard.type";

interface ServiceCardProps {
  card: ServiceCardType;
  isActive: boolean;
  onClick: (id: string) => VoidFunction;
}

export const ServiceCard = ({ card, onClick, isActive }: ServiceCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick(card.id)}
      key={card.id}
      className={classNames(
        "service-card",
        { "card-orange": isActive },
        { "card-blue": !isActive },
      )}
    >
      <div className="service-icon">
        <img
          src="/service-2.jpg"
          alt="Комерційна нерухомість"
          className="service-icon-image"
        />
      </div>
      <h3 className="service-title">{card.title}</h3>
      <p className="service-description">{card.subTitle}</p>
    </button>
  );
};
