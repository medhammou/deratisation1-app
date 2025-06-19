import React from 'react';

const AppWeb: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">4. Fonctionnalités Détaillées : Application Web (Superviseurs / Clients)</h2>
      
      <p className="mb-4">
        L'application web est l'interface de supervision, d'analyse et de reporting. Elle doit offrir une vue d'ensemble 
        claire de l'activité, des outils d'analyse pertinents et des fonctionnalités de gestion administrative.
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4.1 Tableau de Bord Principal (Dashboard)</h3>
        <div className="mb-4">
          <p className="mb-2"><span className="font-medium">Vue Synthétique :</span> Dès la connexion, l'utilisateur accède à un tableau de bord personnalisable affichant les informations clés.</p>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2">Widgets Configurables :</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li><span className="font-medium">Dernières Inspections :</span> Liste des sites récemment inspectés avec date et agent.</li>
            <li><span className="font-medium">Alertes de Consommation :</span> Stations signalant une consommation jugée anormale (seuil configurable).</li>
            <li><span className="font-medium">Incidents Récents :</span> Flux des derniers incidents signalés par les agents.</li>
            <li><span className="font-medium">Stations Récemment Retirées :</span> Liste des stations marquées comme inactives.</li>
            <li><span className="font-medium">Statistiques Clés :</span> Nombre total de stations actives, taux de consommation moyen, nombre d'interventions.</li>
            <li><span className="font-medium">Accès Rapide aux Photos :</span> Galerie des dernières photos prises sur le terrain, filtrable par site/date.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4.2 Visualisation Cartographique Interactive</h3>
        <ul className="list-disc pl-6 space-y-3">
          <li><span className="font-medium">Carte Globale :</span> Affiche tous les sites gérés sur une carte.</li>
          <li><span className="font-medium">Vue Site Détaillée :</span> En sélectionnant un site, la carte zoome et affiche toutes les stations d'appâtage associées.</li>
          <li>
            <span className="font-medium">Marqueurs de Stations :</span>
            <ul className="list-disc pl-6 mt-1">
              <li>Chaque station est représentée par un marqueur.</li>
              <li>Le marqueur change de couleur ou d'icône en fonction du dernier niveau de consommation enregistré.</li>
              <li>Possibilité d'afficher l'identifiant de la station au survol ou au clic.</li>
            </ul>
          </li>
          <li><span className="font-medium">Informations au Clic :</span> Cliquer sur un marqueur ouvre une pop-up ou un panneau latéral affichant les détails de la station.</li>
          <li><span className="font-medium">Couches d'Information :</span> Possibilité d'activer/désactiver des couches sur la carte.</li>
          <li><span className="font-medium">Intégration des Plans Scannés :</span> Possibilité d'afficher un plan scanné en superposition ou à côté de la carte GPS.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4.3 Cartes de Chaleur (Heatmaps)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Génération Dynamique :</span> Fonctionnalité permettant de générer des heatmaps superposées à la carte du site.</li>
          <li><span className="font-medium">Basées sur la Consommation :</span> Visualise les zones de plus forte consommation de raticide sur une période donnée.</li>
          <li><span className="font-medium">Basées sur l'Activité :</span> Visualise les zones où les incidents sont les plus fréquemment signalés.</li>
          <li><span className="font-medium">Filtres Temporels :</span> L'utilisateur peut sélectionner la période d'analyse pour la génération de la heatmap.</li>
          <li><span className="font-medium">Utilité :</span> Aide à identifier rapidement les points chauds d'infestation ou les zones à problèmes récurrents.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4.4 Gestion des Données et Historique</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Vue Tabulaire :</span> Une vue sous forme de tableau liste toutes les stations d'un site avec leurs informations détaillées.</li>
          <li><span className="font-medium">Filtrage et Tri :</span> Possibilité de filtrer et trier les données par n'importe quelle colonne.</li>
          <li><span className="font-medium">Historique Complet :</span> Accès à l'historique détaillé de chaque station et de chaque site.</li>
          <li><span className="font-medium">Recherche :</span> Fonction de recherche pour retrouver rapidement une station par son identifiant ou un site par son nom/adresse.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4.5 Génération de Rapports PDF</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Export Automatisé :</span> Module dédié à la génération de rapports d'intervention au format PDF.</li>
          <li>
            <span className="font-medium">Filtres d'Export :</span> L'utilisateur peut sélectionner les critères du rapport :
            <ul className="list-disc pl-6 mt-1">
              <li>Site(s) spécifique(s) ou tous les sites.</li>
              <li>Période (dates de début et de fin).</li>
              <li>Niveau d'activité/consommation.</li>
              <li>Type d'informations à inclure (résumé, détails par station, incidents, photos, heatmaps).</li>
            </ul>
          </li>
          <li><span className="font-medium">Modèles de Rapports :</span> Possibilité de définir des modèles de rapports standards.</li>
          <li><span className="font-medium">Personnalisation :</span> Inclure le logo de l'entreprise, les informations du client, etc.</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">4.6 Gestion des Utilisateurs et des Rôles</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Interface d'Administration :</span> Section réservée aux administrateurs/superviseurs pour gérer les accès.</li>
          <li><span className="font-medium">Création/Modification/Suppression d'Utilisateurs :</span> Gestion des comptes agents, superviseurs et clients.</li>
          <li>
            <span className="font-medium">Gestion des Rôles :</span>
            <ul className="list-disc pl-6 mt-1">
              <li><span className="font-medium">Agent :</span> Accès limité à l'application mobile, synchronisation des données de ses interventions.</li>
              <li><span className="font-medium">Superviseur :</span> Accès complet à l'application web, gestion des utilisateurs, configuration.</li>
              <li><span className="font-medium">Client :</span> Accès restreint à l'application web, visualisation des données et rapports uniquement pour ses propres sites.</li>
            </ul>
          </li>
          <li><span className="font-medium">Gestion Fine des Permissions :</span> Possibilité d'affiner les droits.</li>
          <li><span className="font-medium">Association Agent/Sites :</span> Le superviseur assigne les sites aux agents via cette interface.</li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">4.7 Ergonomie et Accessibilité</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Interface Web Responsive :</span> L'application doit s'adapter à différentes tailles d'écran.</li>
          <li><span className="font-medium">Navigation Intuitive :</span> Structure claire des menus et accès logique aux différentes fonctionnalités.</li>
          <li><span className="font-medium">Visualisations Claires :</span> Graphiques et cartes lisibles et faciles à interpréter.</li>
        </ul>
      </section>
    </div>
  );
};

export default AppWeb;
