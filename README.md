# Projet

Application web, d'une mini messagerie instantanée.

## Membre

- Nicolas
- Célien
- Lenaic
- Johan

## Fonctionnalités

- Connexion / inscription
- Creation d'un groupe de discution entre une ou plusieurs personnes
- Envoie d'un message ou image via Web socket
- Notification lorsque qu'un message est envoyé au autre membre du groupe

## Service cloud

- EC2 (AWS)
- RDS (AWS)
- FCM messaging (Firebase)

## Techs

- Laravel (API)
- React (Front)
- MySQL

## Problemes rencontrés

- Lancer la commande `npm install --legacy-peer-deps` fait crash EC2 pendant 20min (https://stackoverflow.com/questions/66693201/npm-install-hangs-forever-in-ec2)

- Mise en place des notifications en local, mais on a pas pu le mettre en place sur le serveur

# Lien du site : http://15.188.54.190