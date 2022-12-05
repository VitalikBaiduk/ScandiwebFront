import { useLocation, useNavigate } from "react-router-dom";

export interface NavigationStateType {
  arrowActive: boolean;
}

export interface CurrencyItemType {
  __typename: string;
  symbol: string;
  label: string;
}

export interface CurrencyModalProps {
  setCurrency: (currency: string) => void;
  mouseLeaveHandler: () => void;
  currenciesList: CurrencyItemType[];
}

export interface CurrencyModalStateType {
  arrowActive: boolean;
}

export interface ProductColorAttributesItemProps {
  backgroundColor: string;
}

export interface ProductAttributesItemsType {
  displayValue: string;
  value: string;
  id: string;
}
export interface ProductAttributesType {
  id: string;
  name: string;
  type: string;
  items: ProductAttributesItemsType[];
}

export interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: string;
}

export interface WithRouterProps {
  location: ReturnType<typeof useLocation>;
  params: Record<string, string>;
  navigate: ReturnType<typeof useNavigate>;
}
