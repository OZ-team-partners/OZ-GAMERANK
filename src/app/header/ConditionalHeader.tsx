"use client";

import { usePathname } from "next/navigation";
import GameRankHeader from "./header_bar";
import HeaderBarHero from "./header_barHero";

const ConditionalHeader = () => {
  const pathname = usePathname();
  
  // auth 경로에서는 헤더를 숨김
  const isAuthPage = pathname?.startsWith('/auth');
  
  // profile 경로에서는 히어로 섹션만 숨김
  const isProfilePage = pathname?.startsWith('/profile');
  
  if (isAuthPage) {
    return null;
  }
  
  return (
    <>
      <GameRankHeader />
      {!isProfilePage && <HeaderBarHero />}
    </>
  );
};

export default ConditionalHeader;