import Image from "next/image";

export default function HeaderBarHero() {
  return (
    <>
      {/* 히어로 섹션 */}
      <section className="relative h-20 bg-gradient-to-r from-purple to-purple flex items-center justify-center">
        <div className="absolute inset-0 bg-black opacity-40">
          <Image
            src="/icon/page_icon/mainUpperIcon1.png"
            alt="게임 아이콘 1"
            width={48}
            height={48}
            className="absolute top-[20%] left-[10%] rotate-[-20deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon2.png"
            alt="게임 아이콘 2"
            width={48}
            height={48}
            className="absolute top-[10%] left-[30%] rotate-[15deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon3.png"
            alt="게임 아이콘 3"
            width={48}
            height={48}
            className="absolute top-[25%] right-[10%] rotate-[15deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon4.png"
            alt="게임 아이콘 4"
            width={100}
            height={48}
            className="absolute top-[-1%] right-[35%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon5.png"
            alt="게임 아이콘 5"
            width={48}
            height={48}
            className="absolute top-[10%] right-[20%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
          <Image
            src="/icon/page_icon/mainUpperIcon6.png"
            alt="게임 아이콘 6"
            width={48}
            height={48}
            className="absolute top-[40%] left-[20%] rotate-[10deg] drop-shadow-[0_2px_8px_rgba(255,255,255,0.7)]"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-2">
            흩어져 있는 순위, 이제 한곳에서 모아보자
          </h2>
          <h3 className="text-1xl font-semibold font-bangers">[GAME RANK]</h3>
        </div>
      </section>
    </>
  );
}
