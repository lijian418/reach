import styled from "styled-components";
import {CAccordion} from "@coreui/react";


export const CAccordionCustom = styled(CAccordion)`
  .accordion-item {
    border: 0;
    margin-bottom: 0;
  }
  .accordion-item:after {
  }
  .accordion-button {
    color: rgb(51, 51, 51);
    background-color: rgb(255, 255, 255);
    border-width: 0;
    
  }
  .accordion-button:hover {
    &:hover {
      border: 0;
      background-color: #ECEFEC;
      transition: background-color 0.3s ease-in-out;
    }
  }
`
