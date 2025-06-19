import React from 'react';

const Developpement: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">7. Démarches et Étapes de Développement (de A à Z)</h2>
      
      <p className="mb-4">
        Ce guide décrit les étapes clés pour mener à bien le développement des applications mobile et web, 
        en utilisant les technologies recommandées et l'environnement VSC.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Phase 1 : Préparation et Configuration Initiale</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">1. Mise en Place de l'Environnement de Développement :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Installer les prérequis sur les postes des développeurs : Node.js (version LTS), Python (si besoin), Git, Docker Desktop.</li>
            <li>Configurer Visual Studio Code (VSC) avec les extensions recommandées.</li>
            <li>Configurer les émulateurs/simulateurs ou préparer des appareils physiques pour les tests mobiles.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">2. Gestion des Dépôts Git :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Choisir une stratégie : Monorepo ou Multi-repo.</li>
            <li>Initialiser le(s) dépôt(s) sur une plateforme (GitHub, GitLab, Bitbucket).</li>
            <li>Définir une stratégie de branches (ex: Gitflow simplifié).</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">3. Initialisation des Projets :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="font-medium">Backend (NestJS) :</span> Utiliser le CLI NestJS (<code>nest new backend-api</code>).</li>
            <li><span className="font-medium">Mobile (React Native) :</span> Utiliser le CLI React Native.</li>
            <li><span className="font-medium">Web (React) :</span> Utiliser Vite ou Create React App.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Phase 2 : Développement du Backend API (NestJS + PostgreSQL/PostGIS)</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">1. Modélisation et Migration BDD :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Définir les entités avec l'ORM choisi (TypeORM ou Prisma).</li>
            <li>Configurer la connexion à la base de données Dockerisée.</li>
            <li>Générer et appliquer les migrations de base de données.</li>
            <li>Configurer PostGIS pour les types géométriques.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">2. Structure du Projet Backend :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Organiser le code en modules fonctionnels.</li>
            <li>Définir les DTOs pour la validation des entrées/sorties API.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">3. Implémentation des Fonctionnalités Clés :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mettre en place l'authentification (ex: JWT avec Passport.js).</li>
            <li>Développer les services et controllers/resolvers pour les opérations CRUD.</li>
            <li>Implémenter la logique métier spécifique.</li>
            <li>Intégrer les requêtes spatiales avec PostGIS.</li>
            <li>Développer les endpoints pour la synchronisation avec l'application mobile.</li>
            <li>Implémenter la gestion des rôles et permissions.</li>
            <li>Intégrer le module de génération de PDF.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Phase 3 : Développement de l'Application Mobile (React Native)</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">1. Configuration Initiale Mobile :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Configurer la navigation entre écrans (React Navigation).</li>
            <li>Mettre en place la gestion d'état si nécessaire.</li>
            <li>Intégrer la bibliothèque de base de données locale (WatermelonDB).</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">2. Développement des Écrans et Fonctionnalités :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Créer les écrans : Login, Liste des Sites, Carte/Plan du Site, Détails Station, etc.</li>
            <li>Intégrer les bibliothèques de géolocalisation et cartographie.</li>
            <li>Développer les formulaires de saisie avec une ergonomie adaptée au terrain.</li>
            <li>Intégrer les fonctionnalités de prise et sélection de photos.</li>
            <li>Implémenter la logique de stockage local systématique (offline-first).</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">3. Synchronisation Offline :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Développer la logique de synchronisation avec le backend API.</li>
            <li>Gérer les états de synchronisation et fournir un feedback à l'utilisateur.</li>
            <li>Implémenter la stratégie de résolution des conflits définie.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Phase 4 : Développement de l'Application Web (React)</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">1. Configuration Initiale Web :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Configurer le routing (React Router).</li>
            <li>Intégrer la bibliothèque de composants UI et configurer le thème.</li>
            <li>Mettre en place la gestion d'état si nécessaire.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">2. Développement des Vues et Composants :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Créer les pages principales : Login, Tableau de Bord, Vue Cartographique, etc.</li>
            <li>Développer les composants réutilisables.</li>
            <li>Intégrer Leaflet pour afficher les sites et stations.</li>
            <li>Implémenter la génération de heatmaps.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Phase 5 : Intégration, Tests Finaux et Déploiement</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">1. Tests d'Intégration Globaux :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Valider le flux complet : saisie mobile -{'>'}synchronisation -{'>'}backend -{'>'}affichage web.</li>
            <li>Tester la cohérence des données entre les plateformes.</li>
            <li>Effectuer des tests de charge simulée sur le backend.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">2. Tests en Conditions Réelles :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Organiser des sessions de test sur le terrain avec de vrais agents.</li>
            <li>Tester la robustesse de l'application mobile en conditions de faible connectivité.</li>
            <li>Recueillir les retours utilisateurs pour ajustements ergonomiques.</li>
          </ul>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">3. Déploiement :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="font-medium">Backend :</span> Déployer l'API NestJS et la base de données sur un serveur ou une plateforme PaaS.</li>
            <li><span className="font-medium">Web :</span> Déployer l'application React sur une plateforme d'hébergement statique.</li>
            <li><span className="font-medium">Mobile :</span> Générer les builds signés et soumettre les applications sur les stores.</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">Phase 6 : Maintenance et Évolution Continue</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">1. Monitoring et Supervision :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Mettre en place des outils de monitoring d'erreurs et de performance.</li>
            <li>Surveiller l'utilisation des ressources serveur.</li>
            <li>Analyser les logs applicatifs.</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2">2. Maintenance Corrective et Évolutive :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Gérer les retours de bugs via un système de ticketing.</li>
            <li>Planifier les mises à jour régulières des dépendances.</li>
            <li>Prioriser et développer les améliorations et nouvelles fonctionnalités.</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Developpement;
