# Deratisation.app

Application de gestion professionnelle pour les programmes de dératisation, comprenant une application mobile pour les agents de terrain et une application web pour les superviseurs et clients.

## Structure du projet

Ce projet utilise une architecture monorepo pour faciliter le partage de code et la cohérence entre les différentes parties de l'application :

- `/backend` : API NestJS et logique métier
- `/mobile` : Application mobile React Native pour les agents de terrain
- `/web` : Application web React pour les superviseurs et clients
- `/shared` : Code et types partagés entre les différentes applications
- `/docs` : Documentation technique et spécifications

## Technologies utilisées

- **Backend** : NestJS (TypeScript), PostgreSQL avec PostGIS
- **Application Mobile** : React Native avec WatermelonDB pour la synchronisation offline
- **Application Web** : React avec TypeScript
- **Cartographie** : Leaflet (web) et react-native-maps (mobile)
- **Authentification** : JWT

## Prérequis de développement

- Node.js (v18+)
- Docker et Docker Compose
- PostgreSQL avec extension PostGIS
- Visual Studio Code (recommandé)

## Conventions de code

- Utilisation de TypeScript strict
- ESLint et Prettier pour le formatage du code
- Commits conventionnels (feat, fix, docs, etc.)
- Tests unitaires et d'intégration

## Installation et démarrage

Chaque module (backend, mobile, web) contient ses propres instructions d'installation et de démarrage dans son README respectif.

## Licence

Ce projet est développé sous licence open source.
