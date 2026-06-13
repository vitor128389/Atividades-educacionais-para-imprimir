export interface ActivitySample {
  id: string;
  title: string;
  category: string;
  age: string;
  thumbnailSvg: string; // Dynamic interactive SVG representation of the worksheet
  instructions: string;
  printableContent: {
    title: string;
    description: string;
    instructions: string;
    elements: Array<{
      type: 'trace' | 'match' | 'color' | 'math' | 'maze';
      data: any;
    }>;
  };
}

export interface Bonus {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: string;
  value: number;
  isFree: boolean;
  description: string;
  bullets: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  text: string;
  childInfo?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
