import type { Locale } from "@/i18n-config";

type UiCopy = {
  status: string;
  roles: string[];
  heroLead: string;
  explore: string;
  resume: string;
  hero: { findMe: string; terminalRole: string; terminalFocus: string; terminalStatus: string };
  search: {
    open: string;
    placeholder: string;
    close: string;
    noResults: string;
    hint: string;
    groups: { navigation: string; projects: string; writing: string; services: string; process: string };
  };
  stats: { projects: string; articles: string; stack: string; experience: string };
  about: {
    eyebrow: string;
    based: string;
    focus: string;
    focusAreas: string;
    studies: string;
    profile: { label: string; bio: string; projects: string; articles: string; viewGithub: string };
  };
  skills: { eyebrow: string; note: string; titleSuffix: string };
  experience: { eyebrow: string; title: string; present: string; location: string };
  services: { eyebrow: string; note: string };
  process: {
    eyebrow: string;
    title: { before: string; emphasis: string };
    note: string;
    steps: { title: string; text: string; output: string }[];
  };
  work: {
    eyebrow: string;
    caseStudy: string;
    demo: string;
    source: string;
    featured: string;
    pinned: string;
    repository: string;
    language: string;
  };
  writing: { eyebrow: string; read: string; all: string; titleSuffix: string };
  content: { home: string; blogLead: string; read: string; articles: string };
  article: {
    minRead: string;
    updated: string;
    topics: string;
    related: string;
    contents: string;
    allTopics: string;
    latest: string;
    filterByTopic: string;
  };
  projectDetails: {
    back: string;
    caseStudy: string;
    liveDemo: string;
    source: string;
    downloadApk: string;
    previewEmpty: string;
    features: string;
    development: string;
    devops: string;
    delivery: string;
    nextProject: string;
    techStack: string;
  };
  contact: {
    eyebrow: string;
    title: string;
    lead: string;
    direct: string;
  };
  footer: { built: string; localTime: string };
};

export const ui: Record<Locale, UiCopy> = {
  en: {
    status: "Open to full-time roles · Web / Mobile / DevOps / AI",
    roles: ["Web & mobile engineer", "Platform / DevOps engineer", "Applied AI engineer"],
    heroLead: "I design and ship reliable web and mobile products, DevOps platforms and grounded AI systems — from interface to production.",
    explore: "Explore my work",
    resume: "Download CV",
    hero: {
      findMe: "find me /",
      terminalRole: "web & mobile engineer",
      terminalFocus: "web · mobile · devops · ai",
      terminalStatus: "open to full-time roles",
    },
    search: {
      open: "Search portfolio",
      placeholder: "Search projects, articles, sections…",
      close: "Close search",
      noResults: "No results for",
      hint: "↑ ↓ to navigate · Enter to open · Esc to close",
      groups: {
        navigation: "Navigation",
        projects: "Projects",
        writing: "Writing",
        services: "Services",
        process: "Process",
      },
    },
    stats: {
      projects: "Projects shipped",
      articles: "Articles written",
      stack: "Technologies",
      experience: "Professional experience",
    },
    about: {
      eyebrow: "02 / Profile",
      based: "Based in",
      focus: "Focus",
      focusAreas: "Web · Mobile · DevOps · AI",
      studies: "Background",
      profile: {
        label: "Public profile",
        bio: "Full-stack engineer building web and mobile products, delivery pipelines and grounded AI systems.",
        projects: "projects",
        articles: "articles",
        viewGithub: "View GitHub",
      },
    },
    skills: { eyebrow: "06 / Stack", note: "Tools I use to move from idea to production.", titleSuffix: " / stack" },
    experience: {
      eyebrow: "07 / Journey",
      title: "Experience & education",
      present: "Present",
      location: "Location",
    },
    services: { eyebrow: "03 / Services", note: "How I can help your team ship faster." },
    process: {
      eyebrow: "05 / Process",
      title: { before: "How we", emphasis: "work" },
      note: "A clear, low-friction path from first call to production.",
      steps: [
        {
          title: "Discover",
          text: "We align on goals, users, constraints and the metrics that define success.",
          output: "Scope map",
        },
        {
          title: "Architect",
          text: "I shape the system, data model and delivery plan before writing code.",
          output: "Technical plan",
        },
        {
          title: "Build",
          text: "Short iterations, visible progress and production-ready code.",
          output: "Working release",
        },
        {
          title: "Launch",
          text: "Deployment, monitoring and handover so your team owns the result.",
          output: "Handover pack",
        },
      ],
    },
    work: {
      eyebrow: "04 / Selected work",
      caseStudy: "Case study",
      demo: "Live demo",
      source: "Source",
      featured: "featured",
      pinned: "Pinned repositories",
      repository: "public",
      language: "Main stack",
    },
    writing: { eyebrow: "09 / Writing", read: "Read article", all: "All articles", titleSuffix: " / notes" },
    content: {
      home: "Home",
      blogLead: "{count} practical articles on web and mobile engineering, DevOps, security, performance, GenAI and shipping better software.",
      read: "Read",
      articles: "articles",
    },
    article: {
      minRead: "min read",
      updated: "Updated",
      topics: "Topics",
      related: "Related reading",
      contents: "In this article",
      allTopics: "All topics",
      latest: "Latest",
      filterByTopic: "Filter by topic",
    },
    projectDetails: {
      back: "Back to projects",
      caseStudy: "Case study",
      liveDemo: "Live demo",
      source: "Source",
      downloadApk: "Download APK",
      previewEmpty: "Preview available on request",
      features: "What I built",
      development: "development",
      devops: "devops",
      delivery: "Delivery & checks",
      nextProject: "Next project",
      techStack: "Tech stack",
    },
    contact: {
      eyebrow: "10 / Contact",
      title: "Let's build something solid.",
      lead: "Prefer a direct conversation? Here are the fastest ways to reach me.",
      direct: "Direct channels",
    },
    footer: { built: "Built with Next.js and a little bit of coffee.", localTime: "Tunis time" },
  },
  fr: {
    status: "Ouvert aux postes à temps plein · Web / Mobile / DevOps / IA",
    roles: ["Ingénieur web & mobile", "Ingénieur plateforme & DevOps", "Ingénieur IA appliquée"],
    heroLead: "Je conçois et déploie des produits web et mobiles fiables, des plateformes DevOps et des systèmes IA ancrés — de l’interface à la production.",
    explore: "Voir mes projets",
    resume: "Télécharger le CV",
    hero: {
      findMe: "retrouvez-moi /",
      terminalRole: "ingénieur web & mobile",
      terminalFocus: "web · mobile · devops · ia",
      terminalStatus: "ouvert aux postes à temps plein",
    },
    search: {
      open: "Rechercher dans le portfolio",
      placeholder: "Rechercher des projets, articles, sections…",
      close: "Fermer la recherche",
      noResults: "Aucun résultat pour",
      hint: "↑ ↓ pour naviguer · Entrée pour ouvrir · Échap pour fermer",
      groups: {
        navigation: "Navigation",
        projects: "Projets",
        writing: "Articles",
        services: "Services",
        process: "Processus",
      },
    },
    stats: {
      projects: "Projets livrés",
      articles: "Articles écrits",
      stack: "Technologies",
      experience: "Expérience professionnelle",
    },
    about: {
      eyebrow: "02 / Profil",
      based: "Basé à",
      focus: "Focus",
      focusAreas: "Web · Mobile · DevOps · IA",
      studies: "Parcours",
      profile: {
        label: "Profil public",
        bio: "Ingénieur full-stack qui construit des produits web et mobiles, des pipelines de livraison et des systèmes IA ancrés.",
        projects: "projets",
        articles: "articles",
        viewGithub: "Voir GitHub",
      },
    },
    skills: {
      eyebrow: "06 / Stack",
      note: "Les outils que j'utilise de l'idée à la production.",
      titleSuffix: " / stack",
    },
    experience: {
      eyebrow: "07 / Parcours",
      title: "Expérience & formation",
      present: "Aujourd'hui",
      location: "Lieu",
    },
    services: { eyebrow: "03 / Services", note: "Comment je peux aider votre équipe à livrer plus vite." },
    process: {
      eyebrow: "05 / Processus",
      title: { before: "Comment on", emphasis: "travaille" },
      note: "Un chemin clair et fluide du premier échange à la production.",
      steps: [
        {
          title: "Cadrer",
          text: "Nous alignons objectifs, utilisateurs, contraintes et indicateurs de réussite.",
          output: "Carte du périmètre",
        },
        {
          title: "Concevoir",
          text: "Je définis l'architecture, le modèle de données et le plan de livraison avant de coder.",
          output: "Plan technique",
        },
        {
          title: "Construire",
          text: "Des itérations courtes, une progression visible et un code prêt pour la production.",
          output: "Version exploitable",
        },
        {
          title: "Livrer",
          text: "Déploiement, supervision et transfert pour que votre équipe garde la main.",
          output: "Dossier de transfert",
        },
      ],
    },
    work: {
      eyebrow: "04 / Projets",
      caseStudy: "Étude de cas",
      demo: "Démo en ligne",
      source: "Code source",
      featured: "à la une",
      pinned: "Dépôts épinglés",
      repository: "public",
      language: "Stack principale",
    },
    writing: { eyebrow: "09 / Articles", read: "Lire l'article", all: "Tous les articles", titleSuffix: " / notes" },
    content: {
      home: "Accueil",
      blogLead: "{count} articles pratiques sur le développement web et mobile, le DevOps, la sécurité, la performance, la GenAI et une meilleure livraison.",
      read: "Lire",
      articles: "articles",
    },
    article: {
      minRead: "min de lecture",
      updated: "Mis à jour",
      topics: "Sujets",
      related: "À lire aussi",
      contents: "Dans cet article",
      allTopics: "Tous les sujets",
      latest: "Nouveautés",
      filterByTopic: "Filtrer par sujet",
    },
    projectDetails: {
      back: "Retour aux projets",
      caseStudy: "Étude de cas",
      liveDemo: "Démo en ligne",
      source: "Code source",
      downloadApk: "Télécharger l’APK",
      previewEmpty: "Aperçu disponible sur demande",
      features: "Ce que j’ai construit",
      development: "développement",
      devops: "devops",
      delivery: "Livraison & vérifications",
      nextProject: "Projet suivant",
      techStack: "Stack technique",
    },
    contact: {
      eyebrow: "10 / Contact",
      title: "Construisons quelque chose de solide.",
      lead: "Vous préférez un échange direct ? Voici les moyens les plus rapides de me joindre.",
      direct: "Canaux directs",
    },
    footer: { built: "Construit avec Next.js et un peu de café.", localTime: "Heure de Tunis" },
  },
  de: {
    status: "Offen für Vollzeitstellen · Web / Mobile / DevOps / KI",
    roles: ["Web- & Mobile-Entwickler", "Plattform- & DevOps-Engineer", "Angewandte KI"],
    heroLead: "Ich entwerfe und liefere zuverlässige Web- und Mobile-Produkte, DevOps-Plattformen und verankerte KI-Systeme — vom Interface bis zur Produktion.",
    explore: "Projekte ansehen",
    resume: "Lebenslauf laden",
    hero: {
      findMe: "finde mich /",
      terminalRole: "Web- & Mobile-Entwickler",
      terminalFocus: "Web · Mobile · DevOps · KI",
      terminalStatus: "offen für Vollzeitstellen",
    },
    search: {
      open: "Portfolio durchsuchen",
      placeholder: "Projekte, Artikel, Bereiche suchen…",
      close: "Suche schließen",
      noResults: "Keine Ergebnisse für",
      hint: "↑ ↓ zum Navigieren · Enter zum Öffnen · Esc zum Schließen",
      groups: {
        navigation: "Navigation",
        projects: "Projekte",
        writing: "Beiträge",
        services: "Leistungen",
        process: "Ablauf",
      },
    },
    stats: {
      projects: "Ausgelieferte Projekte",
      articles: "Geschriebene Artikel",
      stack: "Technologien",
      experience: "Berufserfahrung",
    },
    about: {
      eyebrow: "02 / Profil",
      based: "Standort",
      focus: "Fokus",
      focusAreas: "Web · Mobile · DevOps · KI",
      studies: "Ausbildung",
      profile: {
        label: "Öffentliches Profil",
        bio: "Full-Stack-Entwickler für Web- und Mobile-Produkte, Lieferpipelines und verankerte KI-Systeme.",
        projects: "Projekte",
        articles: "Beiträge",
        viewGithub: "GitHub ansehen",
      },
    },
    skills: {
      eyebrow: "06 / Stack",
      note: "Tools, die ich von der Idee bis zur Produktion nutze.",
      titleSuffix: " / Technik",
    },
    experience: {
      eyebrow: "07 / Werdegang",
      title: "Erfahrung & Ausbildung",
      present: "Heute",
      location: "Ort",
    },
    services: { eyebrow: "03 / Leistungen", note: "Wie ich Ihr Team schneller ausliefern lasse." },
    process: {
      eyebrow: "05 / Ablauf",
      title: { before: "Wie wir", emphasis: "arbeiten" },
      note: "Ein klarer, reibungsloser Weg vom ersten Gespräch bis zur Produktion.",
      steps: [
        {
          title: "Klären",
          text: "Wir stimmen Ziele, Nutzer, Rahmenbedingungen und Erfolgskennzahlen ab.",
          output: "Scope-Übersicht",
        },
        {
          title: "Architektur",
          text: "Ich entwerfe System, Datenmodell und Lieferplan, bevor Code entsteht.",
          output: "Technischer Plan",
        },
        {
          title: "Umsetzen",
          text: "Kurze Iterationen, sichtbarer Fortschritt und produktionsreifer Code.",
          output: "Funktionierende Version",
        },
        {
          title: "Starten",
          text: "Deployment, Monitoring und Übergabe, damit Ihr Team die Lösung besitzt.",
          output: "Übergabe-Paket",
        },
      ],
    },
    work: {
      eyebrow: "04 / Projekte",
      caseStudy: "Fallstudie",
      demo: "Live-Demo",
      source: "Quellcode",
      featured: "im Fokus",
      pinned: "Angeheftete Repositories",
      repository: "öffentlich",
      language: "Haupt-Stack",
    },
    writing: { eyebrow: "09 / Artikel", read: "Artikel lesen", all: "Alle Artikel", titleSuffix: " / Notizen" },
    content: {
      home: "Startseite",
      blogLead: "{count} praxisnahe Beiträge zu Web- und Mobile-Entwicklung, DevOps, Sicherheit, Performance, GenAI und besserer Auslieferung.",
      read: "Lesen",
      articles: "Beiträge",
    },
    article: {
      minRead: "Min. Lesezeit",
      updated: "Aktualisiert",
      topics: "Themen",
      related: "Weiterlesen",
      contents: "In diesem Artikel",
      allTopics: "Alle Themen",
      latest: "Neueste",
      filterByTopic: "Nach Thema filtern",
    },
    projectDetails: {
      back: "Zurück zu den Projekten",
      caseStudy: "Fallstudie",
      liveDemo: "Live-Demo",
      source: "Quellcode",
      downloadApk: "APK herunterladen",
      previewEmpty: "Vorschau auf Anfrage",
      features: "Was ich gebaut habe",
      development: "Entwicklung",
      devops: "DevOps",
      delivery: "Delivery & Prüfungen",
      nextProject: "Nächstes Projekt",
      techStack: "Technologie-Stack",
    },
    contact: {
      eyebrow: "10 / Kontakt",
      title: "Lassen Sie uns etwas Robustes bauen.",
      lead: "Sie bevorzugen ein direktes Gespräch? Hier sind die schnellsten Wege, mich zu erreichen.",
      direct: "Direkte Kanäle",
    },
    footer: { built: "Mit Next.js und ein wenig Kaffee gebaut.", localTime: "Tunesienzeit" },
  },
};
