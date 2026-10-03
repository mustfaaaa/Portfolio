export type SkillCategory = { title: string; description: string; items: string[] };

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  detail: string;
  role: string;
  technologies: string[];
  features: string[];
  outcome: string;
  github?: string;
  demo?: string;
  image?: { src: string; alt: string };
  placeholder?: boolean;
  visual: "signal" | "atlas" | "flow";
};

export const portfolio = {
  identity: {
    name: "Syed Mustafa",
    initials: "SM",
    role: "Software Engineer",
    headline: "Building intelligent software experiences.",
    shortBio: "I build mobile and web applications with a focus on Flutter, thoughtful product engineering, and practical AI/ML integration.",
    about: [
      "I’m a software engineer based in Peshawar, Pakistan, and a Software Engineering student at COMSATS University Islamabad, Abbottabad Campus. I turn complex ideas into focused, useful products across mobile, web, backend, and machine learning.",
      "My current work centers on Flutter applications and applied AI/ML systems—from real-time audio analysis to computer vision and explainable prediction tools. I care about reliable engineering, honest evaluation, and interfaces that make advanced technology understandable.",
    ],
    focus: ["Flutter application development", "Applied AI / ML", "Product-minded engineering"],
    email: "shahsyedmustfa@gmail.com",
    location: "Peshawar, Pakistan",
  },
  site: {
    url: "https://your-domain.vercel.app",
    title: "Syed Mustafa — Software Engineer",
    description: "Portfolio of Syed Mustafa, a software engineer building Flutter, web, and applied AI/ML experiences.",
  },
  links: { github: "https://github.com/mustfaaaa", linkedin: "https://www.linkedin.com/in/syed-mustafa-7b4b2438a/" },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Journey", href: "#experience" },
    { label: "Notes", href: "#articles" },
    { label: "Contact", href: "#contact" },
  ],
  skills: [
    { title: "Frontend", description: "Responsive interfaces for modern web products.", items: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML / CSS"] },
    { title: "Backend", description: "Validated APIs and dependable application services.", items: ["Python", "FastAPI", "Flask", "REST APIs"] },
    { title: "AI / Machine Learning", description: "Applied models with measured, explainable results.", items: ["TensorFlow", "scikit-learn", "XGBoost", "OpenCV", "librosa"] },
    { title: "Mobile", description: "Cross-platform experiences designed around real workflows.", items: ["Flutter", "Dart", "Android", "Responsive UI"] },
    { title: "Database", description: "Pragmatic persistence and structured application data.", items: ["Firebase", "Data modeling"] },
    { title: "Tools", description: "A disciplined workflow from experiment to shipped code.", items: ["Git", "GitHub", "Jupyter Notebook", "VS Code"] },
  ] satisfies SkillCategory[],
  projects: [
    {
      title: "MakharijPro AI", eyebrow: "Featured case study · Flutter + AI",
      description: "An AI-powered Quran recitation companion that detects Tajweed errors and gives word-level feedback as a learner recites.",
      detail: "The system connects a Flutter reading experience to a FastAPI backend and a streaming Arabic speech recognizer. Its phoneme-to-word mapping turns raw recognition output into understandable Tajweed feedback.",
      role: "Full-stack & AI/ML developer", technologies: ["Flutter", "Dart", "Python", "FastAPI", "Firebase"],
      features: ["Live word highlighting driven by speech recognition", "Named Tajweed feedback with recording playback", "Progress tracking and personalized practice plans"],
      outcome: "Built an end-to-end system supporting word-level reference data across all 6,236 Quran ayahs.", github: "https://github.com/mustfaaaa/makharij-pro", demo: "", placeholder: false, visual: "signal",
    },
    {
      title: "Cardiac Risk Model Explorer", eyebrow: "Applied machine learning",
      description: "An educational disease-risk prediction system that compares multiple model families and explains individual predictions through an accessible interface.",
      detail: "The project controls data leakage, calibrates its decision threshold, exports the selected model, and serves live predictions through a validated FastAPI application.",
      role: "Machine learning & full-stack developer", technologies: ["Python", "scikit-learn", "XGBoost", "SHAP", "FastAPI"],
      features: ["Five-model evaluation on the UCI Heart Disease dataset", "Model explanations and calibrated uncertainty", "Tested API with a dependency-free web interface"], outcome: "Reached 0.959 ROC-AUC and 96.4% sensitivity on the held-out project test set.", github: "https://github.com/mustfaaaa/Disease-Prediction", demo: "", placeholder: false, visual: "atlas",
    },
    {
      title: "Handwritten Character Recognition", eyebrow: "Computer vision",
      description: "A complete EMNIST character-recognition workflow that accepts uploaded photos or drawings and returns predictions with confidence and alternatives.",
      detail: "The project compares classical baselines with a CNN, documents controlled experiments, analyzes real confusion patterns, and exposes the exported model through a responsive web application.",
      role: "Machine learning & application developer", technologies: ["Python", "TensorFlow", "OpenCV", "scikit-learn", "Flask"],
      features: ["Drawing and real-photo input", "Confidence with top-five alternatives", "Responsive, accessible light and dark themes"], outcome: "Achieved 90.01% accuracy across 47 classes on 18,800 held-out test images.", github: "https://github.com/mustfaaaa/Hand-Written-Character-recognition", demo: "", placeholder: false, visual: "flow",
    },
  ] satisfies Project[],
  experience: [
    { role: "Internship 01 — details needed", organization: "TODO: Add verified organization", period: "TODO: Add dates", summary: "Your LinkedIn profile indicates internship experience, but the public page did not expose enough detail to publish it accurately.", contributions: ["TODO: Add your role, responsibilities, and a specific contribution"], technologies: ["TODO: Add technologies"], placeholder: true },
    { role: "Internship 02 — details needed", organization: "TODO: Add verified organization", period: "TODO: Add dates", summary: "Replace this entry with the exact title, organization, dates, and work completed.", contributions: ["TODO: Add one or two truthful, specific contributions"], technologies: ["TODO: Add technologies"], placeholder: true },
    { role: "Internship 03 — details needed", organization: "TODO: Add verified organization", period: "TODO: Add dates", summary: "Replace this entry with the exact title, organization, dates, and work completed.", contributions: ["TODO: Add one or two truthful, specific contributions"], technologies: ["TODO: Add technologies"], placeholder: true },
  ],
  education: [{ institution: "COMSATS University Islamabad, Abbottabad Campus", degree: "Bachelor of Science", program: "Software Engineering", dates: "2023 — 2027 (expected)", detail: "Undergraduate study in software engineering, with practical work across application development and machine learning.", placeholder: false }],
  certifications: [
    { name: "TODO: Add your certification", issuer: "Issuing organization", date: "Date", credential: "" },
    { name: "TODO: Add another certification", issuer: "Issuing organization", date: "Date", credential: "" },
  ],
  achievements: [
    { metric: "6,236", title: "Quran ayahs supported", detail: "MakharijPro’s word-level reference and recitation workflow spans the complete Quran." },
    { metric: "90.01%", title: "Held-out recognition accuracy", detail: "Measured across 18,800 EMNIST test images covering 47 character classes." },
    { metric: "0.959", title: "Cardiac model ROC-AUC", detail: "Measured on the project’s held-out test set with documented leakage controls." },
  ],
  testimonials: [
    { quote: "Placeholder testimonial — replace this with a real quote only after receiving permission to publish it.", name: "TODO: Person’s name", role: "Role", organization: "Organization" },
    { quote: "Placeholder testimonial — use a specific observation about how you think, collaborate, or deliver.", name: "TODO: Person’s name", role: "Role", organization: "Organization" },
  ],
  articles: [
    { title: "Mapping Quranic phonemes to word-level Tajweed feedback", summary: "How MakharijPro turns a streaming phoneme sequence into understandable, word-aligned recitation feedback.", date: "MakharijPro AI", category: "AI systems", readingTime: "Technical README", link: "https://github.com/mustfaaaa/makharij-pro#how-the-analysis-actually-works" },
    { title: "Building a leakage-safe cardiac risk model", summary: "A practical model-selection workflow covering threshold choice, calibration, explainability, and honest evaluation.", date: "Cardiac Risk Explorer", category: "Machine learning", readingTime: "Case study", link: "https://github.com/mustfaaaa/Disease-Prediction" },
    { title: "From EMNIST experiment to a usable recognition interface", summary: "Taking a CNN beyond a notebook with real image inputs, confidence communication, and an accessible application layer.", date: "Character Recognition", category: "Computer vision", readingTime: "Project note", link: "https://github.com/mustfaaaa/Hand-Written-Character-recognition" },
  ],
} as const;
