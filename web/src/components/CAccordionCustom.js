import styled from "styled-components";
import {CAccordion} from "@coreui/react";


const vars = {
  "--bs-accordion-active-color": "#333",
  "--bs-accordion-active-bg": "#fff",
}

export const CAccordionCustom = styled(CAccordion)`
  ${vars}
`
