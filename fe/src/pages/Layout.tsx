import styled from "styled-components";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";
import { createContext } from "react";
import { useEffect, useRef, useState } from "react";

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const MobileViewContext = createContext(false);

export default function Layout() {
  const recipeContainerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (recipeContainerRef.current !== null) {
      const observer = new ResizeObserver((entries) => {
        const ent = entries[0];
        const { width } = ent.contentRect;
        if (width <= 640) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      });
      observer.observe(recipeContainerRef.current);
    }
  }, [recipeContainerRef.current]);
  console.log(isMobile);
  return (
    <MobileViewContext.Provider value={isMobile}>
      <TopContainer ref={recipeContainerRef}>
        <Header />
        <NavBar />
        <Outlet />
        <Footer />
      </TopContainer>
    </MobileViewContext.Provider>
  );
}
