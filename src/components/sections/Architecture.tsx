import React from 'react';

const Architecture: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">2. Architecture Fonctionnelle Générale</h2>
      
      <p className="mb-4">
        L'architecture du système est conçue pour répondre aux besoins de mobilité des agents de terrain 
        et aux exigences de supervision et d'analyse centralisées, tout en tenant compte des contraintes de connectivité.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">2.1 Vue d'Ensemble</h3>
        <p className="mb-4">Le système s'articule autour de trois composants principaux :</p>
        <ol className="list-decimal pl-6 space-y-2 mb-4">
          <li><span className="font-medium">Application Mobile Native (iOS/Android) :</span> Utilisée par les agents de terrain pour la collecte de données en temps réel ou différé.</li>
          <li><span className="font-medium">Application Web Responsive :</span> Accessible via un navigateur, utilisée par les superviseurs et les clients pour la visualisation, l'analyse, la gestion et le reporting.</li>
          <li><span className="font-medium">Backend API (Serveur Central) :</span> Sert de pont entre les applications mobile et web, gère la logique métier, l'authentification, la synchronisation et l'interaction avec la base de données principale.</li>
        </ol>
        
        <div className="bg-gray-100 p-4 rounded-md mb-4">
          <p className="font-mono text-sm mb-2">
            graph LR<br/>
            A[Agent Terrain] -- Utilise --{'>'}Mob(📱 Application Mobile);<br/>
            Mob -- Synchronisation (API REST/GraphQL) --{'>'}API(🌐 Backend API);<br/>
            Mob -- Stockage Local --{'>'}DB_Mob[(💾 Base de Données Locale)];<br/>
            S[Superviseur/Client] -- Utilise --{'>'}Web(💻 Application Web);<br/>
            Web -- Requêtes (API REST/GraphQL) --{'>'}API;<br/>
            API -- Accès Données --{'>'}DB[(🐘 Base de Données Centrale)];
          </p>
          <p className="text-xs text-gray-600 italic">*(Diagramme conceptuel simplifié)*</p>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">2.2 Flux de Données et Synchronisation</h3>
        <ul className="list-disc pl-6 space-y-3">
          <li>
            <span className="font-medium">Collecte Terrain (Mobile) :</span> L'agent saisit les informations (coordonnées GPS, consommation, photos, incidents) via l'application mobile. Ces données sont d'abord stockées dans une base de données locale sur l'appareil.
          </li>
          <li>
            <span className="font-medium">Mode Hors-Ligne :</span> L'application mobile est conçue pour fonctionner pleinement hors connexion. Toutes les données collectées sont sauvegardées localement.
          </li>
          <li>
            <span className="font-medium">Synchronisation :</span> Lorsque l'appareil retrouve une connexion réseau (déclenchée manuellement par l'agent ou automatiquement en arrière-plan), l'application mobile initie une synchronisation avec le Backend API :
            <ul className="list-disc pl-6 mt-2">
              <li><span className="font-medium">Upload :</span> Les nouvelles données ou modifications locales sont envoyées au serveur.</li>
              <li><span className="font-medium">Download :</span> Les mises à jour pertinentes provenant du serveur (ex: nouvelles missions, informations sur les sites, mises à jour de statut par le superviseur) sont téléchargées et intégrées à la base de données locale.</li>
            </ul>
          </li>
          <li>
            <span className="font-medium">Accès Web :</span> L'application web interagit directement avec le Backend API pour afficher les données à jour, générer des visualisations (cartes, heatmaps), des tableaux de bord et des rapports. Elle permet également la saisie ou la modification de certaines informations (gestion des sites, des utilisateurs, etc.).
          </li>
          <li>
            <span className="font-medium">Backend et Base de Données Centrale :</span> Le Backend API traite les requêtes des applications mobile et web, applique la logique métier, gère les droits d'accès et assure la persistance des données dans la base de données centrale.
          </li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">2.3 Gestion des Données Hors-Ligne (Offline-First)</h3>
        <p className="mb-4">
          L'approche "offline-first" est au cœur de la conception de l'application mobile, permettant aux agents de terrain de travailler efficacement même dans des zones sans couverture réseau. Cette approche implique :
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Stockage local prioritaire de toutes les données saisies</li>
          <li>Synchronisation intelligente et différentielle lors du retour de la connectivité</li>
          <li>Gestion des conflits selon des règles métier prédéfinies</li>
          <li>Téléchargement préalable des données nécessaires aux interventions planifiées</li>
        </ul>
      </section>
    </div>
  );
};

export default Architecture;
