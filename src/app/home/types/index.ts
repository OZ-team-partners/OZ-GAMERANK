export interface MainSlide {
  id: number;
  title: string;
  desc: string;
  image?: string;
  render?: () => React.ReactNode;
}

export interface SmallSlide {
  id: number;
  title: string;
  smallSlides_text: string;
  image: string;
  href: string;
}

export interface HotIssueCard {
  id: number;
  image: string;
  title: string;
  description: string;
}

export interface HotIssueListItem {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  topic: string;
  time: string;
}