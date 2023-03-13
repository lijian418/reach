import {Card} from "reactstrap";
import styled from "styled-components";

export const ClickableCard = styled(Card)`
  cursor: pointer;
  border: 0;
  &:hover {
    background-color: #ECEFEC;
    transition: background-color 0.3s ease-in-out;
  }
`;
