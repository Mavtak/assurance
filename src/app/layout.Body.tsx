import { Inter } from "next/font/google";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const Body = ({children}: Props) => {
  return (
    <body className={inter.className}>{children}</body>
  )
}

export default Body;

