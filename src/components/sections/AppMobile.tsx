import React from 'react';

const AppMobile: React.FC = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">3. Fonctionnalités Détaillées : Application Mobile (Agents de Terrain)</h2>
      
      <p className="mb-4">
        L'application mobile est l'outil principal des agents sur le terrain. Elle doit être intuitive, rapide, 
        robuste et fonctionner de manière fiable même sans connexion réseau (mode "offline-first").
      </p>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3.1 Authentification et Synchronisation Initiale</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Login Sécurisé :</span> L'agent se connecte avec un identifiant et un mot de passe fournis par le superviseur. 
            L'authentification est vérifiée auprès du backend API si en ligne, ou localement si hors ligne (après une première connexion réussie).
          </li>
          <li>
            <span className="font-medium">Téléchargement Initial / Synchronisation :</span> Lors de la première connexion ou après une longue période hors ligne, 
            l'application télécharge les données nécessaires à l'agent : sites assignés, plans des sites, historique récent, configuration des stations existantes.
          </li>
          <li>
            <span className="font-medium">Indicateur de Statut :</span> Un indicateur visuel clair informe l'agent de l'état de la connexion réseau 
            et du statut de la synchronisation (à jour, synchronisation en cours, données locales non synchronisées).
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3.2 Gestion des Interventions sur Site</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <span className="font-medium">Sélection du Site :</span> L'agent sélectionne le site sur lequel il intervient depuis une liste ou une carte.
          </li>
          <li>
            <span className="font-medium">Visualisation des Stations :</span>
            <ul className="list-disc pl-6 mt-2">
              <li><span className="font-medium">Vue Carte GPS :</span> Affiche les stations positionnées par leurs coordonnées GPS sur une carte.</li>
              <li><span className="font-medium">Vue Plan/Scan :</span> Si un plan scanné/photographié a été associé au site, l'application l'affiche avec les stations marquées.</li>
              <li><span className="font-medium">Liste des Stations :</span> Une vue liste permet de voir toutes les stations du site avec leur identifiant et statut.</li>
            </ul>
          </li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3.3 Gestion d'une Station d'Appâtage</h3>
        <p className="mb-4">En sélectionnant une station (sur la carte, le plan ou la liste), l'agent accède à ses détails et peut effectuer les actions suivantes :</p>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Géolocalisation (Création/Mise à jour) :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li><span className="font-medium">Automatique :</span> Un bouton "Utiliser ma position actuelle" permet de récupérer les coordonnées GPS de l'appareil.</li>
            <li><span className="font-medium">Manuelle :</span> L'agent peut ajuster la position sur la carte GPS ou saisir manuellement les coordonnées.</li>
            <li><span className="font-medium">Marquage sur Plan :</span> Si un plan est utilisé, l'agent peut placer ou déplacer l'icône de la station directement sur l'image.</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Saisie du Niveau de Consommation :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Interface simple et rapide : boutons radio, curseur, liste déroulante ou saisie numérique directe.</li>
            <li>Options prédéfinies : "0% (Nulle)", "25% (Faible)", "50% (Moyenne)", "75% (Forte)", "100% (Totale)", "Appât moisi", "Appât intact".</li>
            <li>Champ optionnel pour noter le poids exact si nécessaire.</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Ajout de Photos :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Accès direct à l'appareil photo du téléphone pour prendre des photos.</li>
            <li>Possibilité de sélectionner des photos depuis la galerie.</li>
            <li>Les photos sont associées à la visite de cette station spécifique et horodatées.</li>
            <li>Optimisation de la taille des images avant stockage local et synchronisation.</li>
          </ul>
        </div>
        
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Signalement d'Incidents :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Menu déroulant ou liste de cases à cocher pour sélectionner le type d'incident.</li>
            <li>Types d'incidents : station endommagée, déplacée/disparue, animaux non-cibles, activité suspecte, conditions environnementales particulières, autres.</li>
            <li>Possibilité d'ajouter une description texte détaillée et des photos spécifiques à l'incident.</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-medium mb-2">Retrait d'une Station :</h4>
          <ul className="list-disc pl-6 space-y-1">
            <li>Un bouton "Marquer comme retirée" ou "Désactiver" avec demande de confirmation.</li>
            <li>Option pour ajouter une raison du retrait (fin de campagne, zone inaccessible, etc.).</li>
            <li>La station apparaît ensuite comme inactive dans l'application mobile et web.</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-4">3.4 Historique des Interventions (par Site)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Accessible depuis la fiche du site.</li>
          <li>Affiche la chronologie des visites précédentes sur ce site.</li>
          <li>Pour chaque visite : date, agent intervenu, résumé des consommations, incidents signalés, photos associées.</li>
          <li>Permet à l'agent de consulter rapidement le contexte et l'évolution de la situation sur le site.</li>
          <li>Les données historiques sont synchronisées depuis le serveur.</li>
        </ul>
      </section>
      
      <section>
        <h3 className="text-xl font-semibold mb-4">3.5 Ergonomie et Interface Utilisateur (UI/UX)</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><span className="font-medium">Interface Claire et Lisible :</span> Gros caractères, forts contrastes pour une bonne visibilité en extérieur.</li>
          <li><span className="font-medium">Navigation Simple :</span> Accès rapide aux fonctions clés en un minimum de clics.</li>
          <li><span className="font-medium">Gros Boutons :</span> Faciles à utiliser même avec des gants ou les doigts froids/humides.</li>
          <li><span className="font-medium">Feedback Visuel :</span> Confirmation claire des actions effectuées.</li>
          <li><span className="font-medium">Mode Hors-Ligne Transparent :</span> L'application doit clairement indiquer son état mais rester pleinement fonctionnelle.</li>
        </ul>
      </section>
    </div>
  );
};

export default AppMobile;
