import React from 'react';

const Technologies: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">5. Spécifications Techniques Recommandées</h2>
      
      <p className="mb-4">
        Le choix des technologies est crucial pour assurer la robustesse, la maintenabilité, l'évolutivité de l'application, 
        et répondre aux contraintes spécifiques (open source, usage terrain, offline-first, développement VSC).
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5.1 Application Mobile (Cross-Platform iOS/Android)</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Framework : <span className="text-blue-600">React Native</span></h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Permet le développement cross-platform avec une seule base de code (JavaScript/TypeScript), réduisant le temps et les coûts. Vaste écosystème de bibliothèques, forte communauté, et intégration naturelle avec React pour le web. Performances proches du natif pour la plupart des cas d'usage. Parfaitement compatible avec VSC.</p>
          <p className="pl-4"><span className="italic">Alternative :</span> Flutter (Dart) est également une excellente option cross-platform.</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Base de Données Locale & Synchronisation : <span className="text-blue-600">WatermelonDB</span></h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Conçu spécifiquement pour React Native, optimisé pour les applications complexes et réactives. Gère nativement le mode "offline-first" et propose des mécanismes de synchronisation efficaces. Assure de bonnes performances même avec de grandes quantités de données locales. Open source.</p>
          <p className="pl-4"><span className="italic">Alternatives :</span> Realm (avec son Sync/Device Sync, attention au licensing pour le cloud sync), SQLite (via <code>react-native-sqlite-storage</code>) couplé à une logique de synchronisation manuelle ou une bibliothèque tierce.</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Géolocalisation (GPS) : <span className="text-blue-600">react-native-geolocation-service</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Bibliothèque open source offrant plus de fiabilité et d'options de configuration (précision, intervalles) que l'API Geolocation intégrée à React Native, surtout sur Android.</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Cartographie Mobile : <span className="text-blue-600">react-native-maps</span></h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Fournit des composants de carte natifs (Google Maps sur Android, Apple Maps sur iOS) pour une performance et une expérience utilisateur optimales. Permet l'affichage de marqueurs, polygones, et la position de l'utilisateur. Open source.</p>
          <p className="pl-4"><span className="italic">Alternative Open Source Stricte :</span> Si l'utilisation des services Google/Apple est une contrainte, des bibliothèques basées sur Leaflet comme <code>react-native-leaflet-view</code> peuvent être utilisées, affichant des tuiles OpenStreetMap.</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5.2 Application Web</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Framework Frontend : <span className="text-blue-600">React</span> (avec TypeScript)</h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Cohérence avec React Native (partage de compétences, potentiellement de logique métier via des hooks/libs partagés). Écosystème très riche, excellente performance avec le Virtual DOM, supporté par une large communauté. TypeScript ajoute la sécurité du typage statique. VSC offre un excellent support.</p>
          <p className="pl-4"><span className="italic">Alternatives :</span> Vue.js, Angular.</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Bibliothèque de Composants UI : <span className="text-blue-600">Material UI (MUI)</span> ou <span className="text-blue-600">Ant Design</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Fournissent un ensemble complet de composants React (tableaux, formulaires, boutons, modales, etc.) de haute qualité, respectant les bonnes pratiques de design et d'accessibilité. Accélèrent significativement le développement de l'interface web. Open source et bien documentées.</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Cartographie Web : <span className="text-blue-600">Leaflet</span> (avec <code>react-leaflet</code>)</h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Bibliothèque JavaScript open source de référence pour les cartes interactives. Légère, flexible, avec de nombreux plugins (heatmaps via <code>leaflet.heat</code>, marqueurs personnalisés, etc.). Fonctionne avec diverses sources de tuiles (OpenStreetMap par défaut). Idéale pour visualiser les stations et générer les heatmaps.</p>
          <p className="pl-4"><span className="italic">Alternative :</span> Mapbox GL JS (plus puissant visuellement mais avec un modèle de licence spécifique), OpenLayers (très complet mais plus complexe).</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5.3 Backend API</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Langage/Framework : <span className="text-blue-600">Node.js</span> avec <span className="text-blue-600">NestJS</span> (TypeScript)</h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Utilise TypeScript, assurant une cohérence de langage avec le frontend React/React Native. NestJS fournit une architecture modulaire et structurée (basée sur les principes d'Angular) pour construire des APIs robustes et maintenables. L'écosystème Node.js (npm) est immense. Performances excellentes pour les I/O.</p>
          <p className="pl-4"><span className="italic">Alternatives :</span> Python avec Django/Flask (excellent pour l'intégration potentielle d'IA/ML), Go (performances), Java avec Spring Boot (robustesse entreprise).</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Style d'API : <span className="text-blue-600">GraphQL</span> (avec Apollo Server)</h4>
          <p className="pl-4 mb-2"><span className="italic">Justification :</span> Particulièrement adapté aux applications mobiles et aux besoins de synchronisation, permettant aux clients de demander précisément les données dont ils ont besoin. Réduit le sur-fetching et le sous-fetching. Apollo fournit un écosystème complet pour construire et consommer des APIs GraphQL.</p>
          <p className="pl-4"><span className="italic">Alternative :</span> REST (plus standard, peut être plus simple pour des besoins basiques).</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">5.4 Base de Données Centrale</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">SGBDR : <span className="text-blue-600">PostgreSQL</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Système de gestion de base de données relationnelle open source le plus avancé. Extrêmement fiable, robuste, et respectueux des standards SQL. Offre des fonctionnalités avancées comme le support JSONB.</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Extension Géospatiale : <span className="text-blue-600">PostGIS</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Ajoute le support des objets géographiques à PostgreSQL. Indispensable pour stocker et requêter efficacement les coordonnées GPS des stations, calculer des distances, effectuer des recherches spatiales, et potentiellement alimenter les heatmaps.</p>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">5.5 Environnement de Développement</h3>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">IDE : <span className="text-blue-600">Visual Studio Code (VSC)</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Léger, gratuit, open source, avec un vaste écosystème d'extensions supportant tous les langages et technologies recommandés (JavaScript, TypeScript, Python, SQL, Docker, etc.).</p>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Gestion de Version : <span className="text-blue-600">Git</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Standard de l'industrie pour la gestion de version, avec une plateforme comme GitHub, GitLab ou Bitbucket.</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2">Conteneurisation : <span className="text-blue-600">Docker</span> et <span className="text-blue-600">Docker Compose</span></h4>
          <p className="pl-4"><span className="italic">Justification :</span> Pour gérer l'environnement de développement (base de données, backend) de manière isolée et reproductible.</p>
        </div>
      </section>
    </div>
  );
};

export default Technologies;
