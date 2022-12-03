import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/arrow.svg";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const WrapperNavigationLabels = styled.div`
  width: 100%;
  max-width: 240px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavigationLabels = styled(Link)`
  position: relative;
  font-weight: 400;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  line-height: 120%;
  color: #1d1f22;
  cursor: pointer;
  transition: width 0.2s;
  &::after {
    content: "";
    position: absolute;
    background: #5ece7b;
    left: -23%;
    bottom: -35px;
    width: 0;
    height: 2px;
    transition: width 0.2s;
  }
  &:hover {
    font-weight: 600;
    color: #5ece7b;
    &::after {
      width: 150%;
    }
  }
`;

export const ActionsBlock = styled.div`
  position: relative;
  width: 100%;
  max-width: 220px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const WrapperCurrency = styled.div`
  display: flex;
  align-items: flex-end;
  cursor: pointer;
  margin-right: 20px;
`;

export const Currency = styled.p`
  font-weight: 500;
  font-size: 18px;
  line-height: 100%;
  color: #1d1f22;
  margin-right: 10px;
`;

export const StyledArrowIcon = styled(Arrow)`
  margin-bottom: 3px;
  transition: all 0.3s ease-in-out;
  &.active {
    transform: rotate(180deg);
  }
`;
