import { useLocation, useNavigate } from "react-router-dom";

export interface NavigationStateType {
  arrowActive: boolean;
  activeCartOverlay: boolean;
}

export interface CurrencyItemType {
  __typename: string;
  symbol: string;
  label: string;
}

export interface CurrencyModalProps {
  setCurrency: (currency: string) => void;
  currenciesList: CurrencyItemType[];
  setTotalPrice: (currency: string) => void;
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
  __typename: string;
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

export interface PriceItem {
  amount: number;
  currency: CurrencyItemType;
  __typename: string;
}

export interface ProductData {
  attributes: ProductAttributesType[];
  brand: string;
  gallery: string[];
  name: string;
  prices: PriceItem[];
  __typename: string;
  id: string;
}

export interface ActiveAttebutes {
  name: string;
  activeElement: number;
}

export interface ProductDataWithActiveAttr extends ProductData {
  activeAttebutes: ActiveAttebutes[];
  count: number;
}

export interface NavigationType {
  name: string;
  __typename: string;
}

export interface ActiveAttrebutes {
  activeElement: string;
  name: string;
}
