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
    name: 'Modernization & Design Systems',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2023 – Present',
    description:
      'I rebuilt 2 of 4 core platform libraries from Angular/Jinja to React + TypeScript and shipped a shared component library that the rest of the platform adopted. I led the rebrand rollout: new design system, palette, and typography, threaded through every library.',
    impact: '44-48% faster page loads, 25M+ users',
  },
  {
    name: 'Internationalization',
    company: 'Seesaw',
    companyUrl: 'https://web.seesaw.me',
    period: '2023 – Present',
    description:
      'I added i18n and RTL support across a mixed codebase of Jinja, Angular, React, and React Native. Full bidirectional support for Arabic, Hebrew, and 30+ languages. I also built admin features for K-12 standards so districts can track student progress against state benchmarks.',
    impact: '30+ languages, 130+ countries',
  },
  {
    name: 'Xbox Cloud Gaming (xCloud)',
    company: 'Microsoft',
    companyUrl: 'https://www.xbox.com/en-US/cloud-gaming',
    period: '2018 – 2022',
    description:
      'I came in as one of the first 10 engineers. I built the first player-facing prototype: a browser-based client that streamed a live Xbox session to a phone. Xbox demoed it to Satya Nadella, and that demo secured the funding that turned the internal project into the public Cloud Gaming product. As xCloud scaled, I moved to the backend and shipped microservices for OS updates and server-pool management across the fleet.',
    impact: 'POC to global launch, 150,000+ servers',
  },
  {
    name: 'Xbox Backwards Compatibility',
    company: 'Microsoft',
    companyUrl: 'https://www.xbox.com',
    period: '2016 – 2018',
    description:
      'I built the tooling that tracked game-title readiness for the Xbox backwards-compatibility program. The program became a fan favorite, and half of Xbox One users played legacy games through it.',
    impact: '50% of Xbox One users played legacy games',
  },
];
