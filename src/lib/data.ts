// Resume data module — typed exports for all resume content
// Source: Resume.pdf, adapted for web per D-10 and D-11

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  description?: string;
  highlights: string[];
  technologies?: string[];
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Project {
  name: string;
  technologies: string[];
  description: string;
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export const personalInfo: PersonalInfo = {
  name: "Moksh Verma",
  title: "Backend Engineer",
  location: "Delhi, India",
  email: "mokshverma98@gmail.com",
  phone: "+91 9868024906",
  linkedin: "https://www.linkedin.com/in/moksh-verma",
  github: "https://github.com/MokshVerma",
  summary:
    "Backend Engineer with 5+ years of experience building distributed systems at scale. Specialized in identity unification, real-time data pipelines, and cloud cost optimization at companies serving hundreds of millions of users.",
};

export const experiences: Experience[] = [
  {
    company: "Expedia Group",
    role: "SDE-II",
    period: "Apr 2024 - Present",
    location: "Gurugram",
    highlights: [
      "Unified 380M+ multi-brand user identities into a single identity system across Expedia, Hotels.com, and Vrbo",
      "Migrated Tier-1 Kafka infrastructure to Confluent Cloud with zero downtime and zero event loss",
      "Reduced cloud costs by $200K+/year by redesigning ETL pipelines from scratch",
      "Decomposed a core monolith into an independently deployable Kotlin + Postgres microservice",
      "Accelerated delivery by ~30% using AI-assisted workflows (Claude Code, Cursor, Copilot)",
    ],
  },
  {
    company: "Radio Mirchi",
    role: "Software Developer",
    period: "Aug 2022 - Mar 2024",
    location: "Noida",
    description:
      "Built backend services powering Radio Mirchi's digital platform \u2014 Podcasts, Videos, Articles, and Shorts.",
    highlights: [
      "Increased user engagement by ~30% by designing a scalable Automated Push Notification module using Spark and Kafka",
      "Reduced login time and errors by 50% with a secure JWT-based login handoff from mobile app to webview",
      "Increased business revenue by 10% by building a high-performance Ads Rule Engine using Redis and MongoDB",
    ],
  },
  {
    company: "Gaana (Acq. by Radio Mirchi)",
    role: "Software Developer",
    period: "Aug 2021 - Mar 2024",
    location: "Noida",
    highlights: [
      "Boosted music playout from homepage by 40% for 50M Daily Active Users with personalized recommendation algorithms",
      "Reduced API response time by 35% with Aerospike caching strategies at high-latency points",
      "Solved Cold Start and Artist Similarity challenges through POCs that shipped to production",
    ],
  },
  {
    company: "EPAM Systems",
    role: "Junior Software Engineer",
    period: "Feb 2021 - Jul 2021",
    location: "Pune",
    highlights: [
      "Developed secure RESTful APIs using Singleton and Factory design patterns, improving data security and scalability",
    ],
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: ["Java", "Kotlin", "Python", "Spring Boot"],
  },
  {
    category: "Databases & Caching",
    skills: [
      "MySQL",
      "Postgres",
      "MongoDB",
      "Cassandra",
      "Redis",
      "Aerospike",
      "Elasticsearch",
      "MS SQL",
      "Hive",
    ],
  },
  {
    category: "Streaming & Data",
    skills: ["Apache Kafka", "KStreams", "Apache Spark", "Confluent Cloud"],
  },
  {
    category: "Cloud & Infrastructure",
    skills: ["AWS", "Vault", "Docker", "Kubernetes"],
  },
  {
    category: "AI & Dev Tooling",
    skills: ["Claude Code", "Cursor", "GitHub Copilot", "Git"],
  },
  {
    category: "Methodologies",
    skills: ["Agile", "TDD", "CI/CD"],
  },
];

export const projects: Project[] = [
  {
    name: "Auto-Terminal",
    technologies: ["Python", "AI", "LLM"],
    description:
      "A command-line tool that converts natural language to shell commands using AI.",
    link: "https://github.com/MokshVerma",
  },
  {
    name: "Song Hit Predictor 5000",
    technologies: ["Python", "Machine Learning", "NLP"],
    description:
      "A tool to predict whether a song has the potential to take off.",
    link: "https://github.com/MokshVerma",
  },
];

export const education: Education = {
  degree: "Bachelor of Technology in Computer Science, B.Tech (CSE)",
  institution: "Guru Gobind Singh Indraprastha University",
  location: "Delhi, India",
  period: "2016 - 2020",
};
