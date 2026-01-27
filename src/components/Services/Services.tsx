import { useState } from "react";
import "./Services.css";
import { ServiceCard } from "./ServiceCard";
import { SERVICE_CARDS } from "../../data/service-cards";

export default function Services() {
  const [activeCard, setActiveCard] = useState<string>(SERVICE_CARDS[0].id);

  const handleSelectCard = (id: string) => () => {
    setActiveCard(id);
  };

  return (
    <section className="services" id="services">
      <div className="services-grid">
        {SERVICE_CARDS.map((card, index) => (
          <ServiceCard
            key={`${card.title}-${index}`}
            card={card}
            isActive={activeCard === card.id}
            onClick={handleSelectCard}
          />
        ))}
      </div>
    </section>
  );
}
