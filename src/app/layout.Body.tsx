"use client"

import { Inter } from "next/font/google";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledBody = styled.body`
  margin-left: auto;
  margin-right: auto;

  max-width: 1000px;
  padding: 25px;

  background-color: #265b4e;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  border-radius: 15px;
  padding: 15px;
  background-color: white;
`

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const Body = ({children}: Props) => {
  return (
    <StyledBody className={inter.className}>
      <Content>
        {children}
      </Content>
    </StyledBody>
  )
}

export default Body;

