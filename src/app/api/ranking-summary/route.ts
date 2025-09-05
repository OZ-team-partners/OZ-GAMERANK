import { NextResponse } from "next/server";
import puppeteer, { Page } from "puppeteer";

interface SteamGame {
  id: string; // number에서 string으로 변경
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

interface OnlineGame {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
}

interface NintendoGame {
  id: number;
  title: string;
  subtitle: string;
  img: string;
  rank: number;
  developer: string;
}