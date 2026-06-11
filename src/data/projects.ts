export interface Project {
  name: string;
  company: string;
  companyUrl: string;
  period: string;
  description: string;
  impact: string;
}

export const projects: Project[] = [
  {
    name: 'User Onboarding & Activation',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2025 – Present',
    description:
      'Built a new user onboarding and activation experience end to end. Teachers set up a personalized account with their school, class, subjects, and interests, then land on a control-center homepage that walks them through real workflows: assigning their first activity, reviewing student responses, customizing their shortcuts. Every step shipped behind an A/B test.',
    impact: '77% increase in user retention',
  },
  {
    name: 'Internationalization',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2024 – 2025',
    description:
      'Added i18n and RTL support across a mixed codebase (Jinja, Angular, React, React Native). Full bidirectional support for Arabic, Hebrew, and 30+ languages. Built admin features for K-12 standards so districts can track student progress against state benchmarks.',
    impact: '30+ languages, RTL included',
  },
  {
    name: 'Modernization & Design Systems',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2023 – 2024',
    description:
      'Rebuilt 2 of 4 core platform libraries from Angular/Jinja to React + TypeScript. Created a shared component library adopted platform-wide. Led the company rebrand: new design system, color palette, and typography across all libraries.',
    impact: '44-48% faster page loads, 25M+ users',
  },
  {
    name: 'Xbox Cloud Gaming (xCloud)',
    company: 'Microsoft',
    companyUrl: 'https://www.xbox.com/en-US/cloud-gaming',
    period: '2018 – 2022',
    description:
      'One of the first 10 engineers. Built the first player-facing prototype, presented it to Satya Nadella, and that demo got us the budget to scale. As xCloud grew, I shifted to backend: microservices for OS updates and server pool management across the fleet.',
    impact: 'POC to global launch, 150,000+ servers',
  },
  {
    name: 'Xbox Backwards Compatibility',
    company: 'Microsoft',
    companyUrl: 'https://www.xbox.com',
    period: '2016 – 2018',
    description:
      'Built the tools that tracked game title readiness for Xbox backwards compatibility. The program became a fan favorite and half of Xbox One users played legacy games through it.',
    impact: '50% of Xbox One users played legacy games',
  },
];
