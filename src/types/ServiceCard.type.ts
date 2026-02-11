export interface ServiceCardType {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  price: string;
  icon?: string;
}

export type ServiceCard = ServiceCardType;