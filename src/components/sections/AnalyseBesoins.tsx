import React from 'react';

const AnalyseBesoins: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">1. Analyse des Besoins et Contraintes</h2>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">1.1 Contexte et Objectifs</h3>
        <p className="mb-4">
          Le projet vise à développer un système intégré composé d'une application mobile pour les agents de terrain 
          et d'une application web pour les superviseurs et clients, afin d'optimiser la gestion des programmes de 
          dératisation professionnels. L'objectif principal est d'améliorer l'efficacité des interventions, la 
          traçabilité des actions, le suivi de l'activité des rongeurs, et la communication entre les différents 
          acteurs (agents, superviseurs, clients finaux).
        </p>
        <p>
          Le système doit permettre une collecte de données précise et rapide sur le terrain, une visualisation 
          claire des informations pour le suivi et l'analyse, ainsi qu'une génération de rapports automatisée.
        </p>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">1.2 Utilisateurs Cibles</h3>
        <div className="pl-4">
          <div className="mb-4">
            <p className="font-medium">Agents de Terrain :</p>
            <p>Utilisateurs principaux de l'application mobile. Ils effectuent les relevés, posent/retirent les stations, signalent les incidents et documentent leurs interventions.</p>
          </div>
          <div className="mb-4">
            <p className="font-medium">Superviseurs :</p>
            <p>Utilisateurs de l'application web. Ils supervisent les opérations, analysent les données, gèrent les équipes et les sites, et génèrent des rapports.</p>
          </div>
          <div>
            <p className="font-medium">Clients Finaux :</p>
            <p>Utilisateurs potentiels de l'application web (avec des droits restreints). Ils consultent l'état des interventions, les niveaux d'activité et les rapports pour leurs sites.</p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">1.3 Besoins Fonctionnels Clés</h3>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Application Mobile (Agents) :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Géolocalisation précise (automatique/manuelle) des stations d'appâtage.</li>
            <li>Intégration de plans/cartes physiques (scan/photo) avec marquage manuel des stations.</li>
            <li>Saisie structurée de la consommation de raticide par station.</li>
            <li>Prise et ajout de photos comme preuves visuelles.</li>
            <li>Système de signalement d'incidents variés (station endommagée/déplacée, animaux non-cibles, etc.).</li>
            <li>Fonctionnalité pour marquer une station comme retirée.</li>
            <li>Accès à l'historique des interventions par site.</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2">Application Web (Superviseurs/Clients) :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>Visualisation cartographique interactive des stations et de leur état (niveaux de consommation).</li>
            <li>Génération de cartes de chaleur (heatmaps) dynamiques basées sur la consommation/activité.</li>
            <li>Tableau de bord synthétique (dernières inspections, alertes, stations retirées, photos).</li>
            <li>Exportation de rapports PDF personnalisables (par site, date, activité).</li>
            <li>Gestion fine des utilisateurs, des rôles et des permissions.</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">1.4 Contraintes Spécifiques</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Usage Terrain :</span> L'application mobile doit être robuste et utilisable en extérieur, potentiellement dans des conditions difficiles (luminosité, météo).</li>
          <li><span className="font-medium">Connectivité Limitée :</span> Fonctionnement fiable requis même sans connexion réseau constante (mode hors-ligne avec synchronisation ultérieure).</li>
          <li><span className="font-medium">Rapidité et Ergonomie :</span> Interface utilisateur claire, intuitive et rapide à utiliser pour minimiser le temps de saisie sur le terrain.</li>
          <li><span className="font-medium">Précision GPS :</span> Nécessité d'une bonne précision pour la localisation des stations.</li>
          <li><span className="font-medium">Compatibilité :</span> Développement cross-platform (iOS/Android) pour l'application mobile est souhaitable.</li>
          <li><span className="font-medium">Technologies Open Source :</span> L'ensemble des technologies, bibliothèques et dépendances utilisées doit être open source.</li>
          <li><span className="font-medium">Environnement de Développement :</span> Utilisation de Visual Studio Code (VSC) comme environnement de développement principal.</li>
          <li><span className="font-medium">Sécurité :</span> Protection des données sensibles (localisation, informations client).</li>
          <li><span className="font-medium">Scalabilité :</span> L'architecture doit pouvoir supporter un nombre croissant d'utilisateurs, de sites et de données.</li>
        </ul>
      </section>
    </div>
  );
};

export default AnalyseBesoins;
