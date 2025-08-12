"use client"; // useState 등 client 컴포넌트 훅 쓰려면 필수
import React, { useState } from "react";
import "@fontsource/press-start-2p"; // 8비트 폰트 적용

interface IChoice {
  text: string;
  type: Genre;
}
interface IQuestion {
  question: string;
  choices: IChoice[];
}
type Genre = "액션 & 어드벤처" | "RPG" | "전략 & 시뮬레이션" | "힐링 & 퍼즐";
interface IGame {
  title: string;
  image: string;
}

const questions: IQuestion[] = [
    {
        question: "Q1.새로운 게임을 시작할 때 당신의 스타일은?",
        choices: [
            { text: "1. 일단 부딪혀본다! 화려한 액션이 최고!", type: "액션 & 어드벤처" },
            { text: "2. 캐릭터의 서사를 중시하며 몰입한다.", type: "RPG" },
            { text: "3. 공략을 찾아보며 최적의 루트를 계획한다.", type: "전략 & 시뮬레이션" },
            { text: "4. 아기자기한 세상을 꾸미고 탐험한다.", type: "힐링 & 퍼즐" }
        ]
    },
    {
        question: "Q2.게임 속에서 가장 짜릿한 순간은?",
        choices: [
            { text: "1. 강력한 보스를 컨트롤로 쓰러뜨렸을 때!", type: "액션 & 어드벤처" },
            { text: "2. 레벨업으로 강해진 내 캐릭터를 볼 때!", type: "RPG" },
            { text: "3. 나의 전략이 완벽하게 맞아떨어졌을 때!", type: "전략 & 시뮬레이션" },
            { text: "4. 숨겨진 이스터에그나 아이템을 발견했을 때!", type: "힐링 & 퍼즐" }
        ]
    },
    {
        question: "Q3.게임에서 선호하는 플레이 방식은?",
        choices: [
            { text: "1. 혼자서 모든 것을 해결하는 솔로 플레이", type: "액션 & 어드벤처" },
            { text: "2. 다른 유저와 파티를 맺고 협동하는 플레이", type: "RPG" },
            { text: "3. 상대방의 허를 찌르는 경쟁(PvP) 플레이", type: "전략 & 시뮬레이션" },
            { text: "4. 경쟁 없이 자유롭게 소통하는 플레이", type: "힐링 & 퍼즐" }
        ]
    },
    {
        question: "Q4.게임의 어떤 요소를 가장 중요하게 생각하나요?",
        choices: [
            { text: "1. 타격감과 속도감", type: "액션 & 어드벤처" },
            { text: "2. 성장 시스템과 스토리", type: "RPG" },
            { text: "3. 복잡하고 깊이 있는 시스템", type: "전략 & 시뮬레이션" },
            { text: "4. 아름다운 그래픽과 사운드", type: "힐링 & 퍼즐" }
        ]
    },
    {
        question: "Q5.게임을 하다가 막혔을 때 당신의 행동은?",
        choices: [
            { text: "1. 될 때까지 도전한다. 나의 피지컬을 믿는다.", type: "액션 & 어드벤처" },
            { text: "2. 다른 지역으로 가서 레벨업부터 하고 온다.", type: "RPG" },
            { text: "3. 잠시 쉬면서 다른 전략을 구상해본다.", type: "전략 & 시뮬레이션" },
            { text: "4. 급할 것 없다. 주변을 구경하며 다른 할 일을 찾는다.", type: "힐링 & 퍼즐" }
        ]
    },
    {
        question: "Q6.어떤 종류의 퀘스트를 가장 선호하나요?",
        choices: [
            { text: "1. 거대한 괴물을 사냥하는 토벌 퀘스트", type: "액션 & 어드벤처" },
            { text: "2. 세상의 비밀을 파헤치는 메인 스토리 퀘스트", type: "RPG" },
            { text: "3. 나만의 영지를 건설하고 발전시키는 퀘스트", type: "전략 & 시뮬레이션" },
            { text: "4. 마을 주민의 소소한 부탁을 들어주는 생활 퀘스트", type: "힐링 & 퍼즐" }
        ]
    },
     {
        question: "Q7.게임 속 세계가 멸망의 위기에 처했다면?",
        choices: [
            { text: "1. 내 손으로 직접 악을 무찌르겠다.", type: "액션 & 어드벤처" },
            { text: "2. 동료들을 모아 전설의 무기를 찾아 떠나겠다.", type: "RPG" },
            { text: "3. 자원을 효율적으로 관리하여 위기를 극복하겠다.", type: "전략 & 시뮬레이션" },
            { text: "4. 안전한 곳에 나만의 쉼터를 만들겠다.", type: "힐링 & 퍼즐" }
        ]
    },
     {
        question: "Q8.게임 아이템 중 하나를 가질 수 있다면?",
        choices: [
            { text: "1. 무한히 쓸 수 있는 순간이동 스크롤", type: "액션 & 어드벤처" },
            { text: "2. 착용하면 모든 스탯이 2배가 되는 갑옷", type: "RPG" },
            { text: "3. 미래를 예측할 수 있는 수정 구슬", type: "전략 & 시뮬레이션" },
            { text: "4. 무엇이든 만들 수 있는 마법의 작업대", type: "힐링 & 퍼즐" }
        ]
    },
     {
        question: "Q9.플레이 타임이 100시간이 넘는 게임이 있다면, 그 이유는?",
        choices: [
            { text: "1. 모든 보스를 클리어하고 모든 맵을 탐험해서", type: "액션 & 어드벤처" },
            { text: "2. 내 캐릭터에 너무 정이 들어서", type: "RPG" },
            { text: "3. 이 게임의 '고인물'이 되기 위해서", type: "전략 & 시뮬레이션" },
            { text: "4. 나만의 공간을 꾸미고 가꾸는 게 즐거워서", type: "힐링 & 퍼즐" }
        ]
    },
     {
        question: "Q10.게임을 끄고 나서 가장 기억에 남는 것은?",
        choices: [
            { text: "1. 손에 땀을 쥐게 했던 보스전의 긴장감", type: "액션 & 어드벤처" },
            { text: "2. 영화 같았던 게임의 엔딩 장면", type: "RPG" },
            { text: "3. 나의 완벽한 승리로 끝난 전투 기록", type: "전략 & 시뮬레이션" },
            { text: "4. 게임 속에서 만난 친구들과 나눈 이야기", type: "힐링 & 퍼즐" }
        ]
    }
];

const gameRecommendations: Record<Genre, IGame[]> = {
  '액션 & 어드벤처': [
    { title: '갓 오브 워', image: 'https://placehold.co/400x300/ff0000/ffffff?text=Action1' },
    { title: '젤다의 전설: 야생의 숨결', image: 'https://placehold.co/400x300/ff4500/ffffff?text=Action2' },
    { title: '다크 소울 3', image: 'https://placehold.co/400x300/ff6347/ffffff?text=Action3' },
    { title: '세키로', image: 'https://placehold.co/400x300/ff7f50/ffffff?text=Action4' },
    { title: '엘든 링', image: 'https://placehold.co/400x300/ff8c00/ffffff?text=Action5' },
    { title: '호라이즌 제로 던', image: 'https://placehold.co/400x300/ffa500/ffffff?text=Action6' },
    { title: '어쌔신 크리드 발할라', image: 'https://placehold.co/400x300/ffc0cb/ffffff?text=Action7' },
    { title: '레드 데드 리뎀션 2', image: 'https://placehold.co/400x300/ffb6c1/ffffff?text=Action8' }
  ],
  'RPG': [
    { title: '위쳐 3: 와일드 헌트', image: 'https://placehold.co/400x300/0000ff/ffffff?text=RPG1' },
    { title: '파이널 판타지 7 리메이크', image: 'https://placehold.co/400x300/1e90ff/ffffff?text=RPG2' },
    { title: '발더스 게이트 3', image: 'https://placehold.co/400x300/00bfff/ffffff?text=RPG3' },
    { title: '페르소나 5 로얄', image: 'https://placehold.co/400x300/add8e6/ffffff?text=RPG4' },
    { title: '디아블로 4', image: 'https://placehold.co/400x300/87ceeb/ffffff?text=RPG5' },
    { title: '사이버펑크 2077', image: 'https://placehold.co/400x300/b0c4de/ffffff?text=RPG6' },
    { title: '드래곤 퀘스트 11 S', image: 'https://placehold.co/400x300/6495ed/ffffff?text=RPG7' },
    { title: '로스트아크', image: 'https://placehold.co/400x300/4682b4/ffffff?text=RPG8' }
  ],
  '전략 & 시뮬레이션': [
    { title: '문명 6', image: 'https://placehold.co/400x300/800080/ffffff?text=Strategy1' },
    { title: '스타크래프트 2', image: 'https://placehold.co/400x300/9932cc/ffffff?text=Strategy2' },
    { title: '토탈 워: 삼국', image: 'https://placehold.co/400x300/ba55d3/ffffff?text=Strategy3' },
    { title: '심시티', image: 'https://placehold.co/400x300/dda0dd/ffffff?text=Strategy4' },
    { title: '롤러코스터 타이쿤', image: 'https://placehold.co/400x300/ee82ee/ffffff?text=Strategy5' },
    { title: '플래닛 주', image: 'https://placehold.co/400x300/da70d6/ffffff?text=Strategy6' },
    { title: '엑스컴 2', image: 'https://placehold.co/400x300/ff00ff/ffffff?text=Strategy7' },
    { title: '풋볼 매니저', image: 'https://placehold.co/400x300/d8bfd8/ffffff?text=Strategy8' }
  ],
  '힐링 & 퍼즐': [
    { title: '모여봐요 동물의 숲', image: 'https://placehold.co/400x300/008000/ffffff?text=Healing1' },
    { title: '스타듀 밸리', image: 'https://placehold.co/400x300/2e8b57/ffffff?text=Healing2' },
    { title: '마인크래프트', image: 'https://placehold.co/400x300/3cb371/ffffff?text=Healing3' },
    { title: '포탈 2', image: 'https://placehold.co/400x300/90ee90/ffffff?text=Healing4' },
    { title: '테트리스 이펙트', image: 'https://placehold.co/400x300/98fb98/ffffff?text=Healing5' },
    { title: '언패킹', image: 'https://placehold.co/400x300/8fbc8f/ffffff?text=Healing6' },
    { title: '저니', image: 'https://placehold.co/400x300/adff2f/ffffff?text=Healing7' },
    { title: '슬라임 랜처', image: 'https://placehold.co/400x300/7cfc00/ffffff?text=Healing8' }
  ]
};

export default function GameQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<Genre, number>>({
    "액션 & 어드벤처": 0,
    "RPG": 0,
    "전략 & 시뮬레이션": 0,
    "힐링 & 퍼즐": 0
  });

  const handleChoice = (type: Genre) => {
    setScores((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setStep((prev) => prev + 1);
  };

  const getResult = () => {
    return (Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0] as Genre);
  };
  const resetQuiz = () => {
    setStep(0);
    setScores({
      "액션 & 어드벤처": 0,
      "RPG": 0,
      "전략 & 시뮬레이션": 0,
      "힐링 & 퍼즐": 0
    });
  };
  if (step >= questions.length) {
    const result = getResult();
    return (
      <div className="relative min-h-screen mx-auto max-w-6xl font-['Press_Start_2P'] p-8 text-white">
        {/* 배경 이미지 + blur */}
        <div
          className="absolute inset-0 bg-center bg-cover filter blur-sm brightness-75"
          style={{ backgroundImage: "url('/icon/page_icon/small_contents_game_mbti_bg.jpg')" }}
        />
        <div className="relative bg-opacity-70 rounded-lg p-8">
        {/* 콘텐츠 */}
          <h1 className="text-2xl mb-6">당신의 게임 성향은 🎮</h1>
          <h2 className="text-yellow-300 text-xl mb-8">{result}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {gameRecommendations[result].map((game, idx) => (
              <div
                key={idx}
                className="bg-gray-800 p-3 rounded-lg shadow-lg hover:scale-105 transition transform duration-200 border-4 border-pink-500"
              >
                <img src={game.image} alt={game.title} className="rounded mb-3" />
                <p className="text-sm">{game.title}</p>
              </div>
            ))}
          </div>
          <button
            onClick={resetQuiz}
            className="flex ml-auto mt-5 self-end bg-pink-600 hover:bg-pink-400 text-white font-bold py-3 px-6 rounded-lg border-4 border-pink-300 transition"
          >
            이게 내 취향일리가 없어!
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen mx-auto max-w-6xl font-['Press_Start_2P'] p-8 text-white ">
      {/* 배경 이미지 + 흐림 */}
      <div
        className="absolute inset-0 bg-center bg-cover filter blur-sm brightness-75"
        style={{ backgroundImage: "url('/icon/page_icon/small_contents_game_mbti_bg.jpg')" }}
      />
      {/* (필요하면) 반투명 오버레이 */}
      <div className="absolute inset-0  bg-opacity-50" />
      
      {/* 내용물 */}
      <div className="relative z-10  bg-opacity-50 rounded-lg p-4">
        <h1 className="bg-cyan-600 border-2 text-xl mb-4 pl-3">{questions[step].question}</h1>
        <div className="flex flex-col gap-4">
          {questions[step].choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => handleChoice(choice.type)}
              className="bg-pink-600 hover:bg-pink-400 p-4 rounded-lg border-4 border-pink-300 text-left"
            >
              {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
}

