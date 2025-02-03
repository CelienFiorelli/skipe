CREATE DATABASE IF NOT EXISTS Skipe;

CREATE TABLE IF NOT EXISTS Skipe.Utilisateur (
    Id INT PRIMARY KEY AUTO_INCREMENT,

    Nom VARCHAR(200) NOT NULL,
    Pseudo VARCHAR(50) NOT NULL,
    Mail VARCHAR(200) NOT NULL,
    Mdp VARCHAR(300) NOT NULL
);

CREATE TABLE IF NOT EXISTS Skipe.Ami (
    IdUtilisateur INT NOT NULL,
    IdUtilisateurAmi INT NOT NULL,

    PRIMARY KEY (IdUtilisateur, IdUtilisateurAmi),

    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur (Id),
    FOREIGN KEY (IdUtilisateurAmi) REFERENCES Utilisateur (Id)
);

CREATE TABLE IF NOT EXISTS Skipe.Groupe (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    Nom VARCHAR(100) NULL,
    Date DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE IF NOT EXISTS Skipe.GroupeUtilisateur (
    IdGroupe INT NOT NULL,
    IdUtilisateur INT NOT NULL,
    UtilisateurEstParti TINYINT(1) NOT NULL DEFAULT 0,

    PRIMARY KEY(IdGroupe, IdUtilisateur),

    FOREIGN KEY (IdGroupe) REFERENCES Groupe (Id),
    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur (Id)
);

CREATE TABLE IF NOT EXISTS Skipe.Publication (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdUtilisateur INT NOT NULL,

    Contenu VARCHAR(1500) NOT NULL,
    EstFichier TINYINT(1) DEFAULT 0,

    Date DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),

    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur (Id)
);

CREATE TABLE IF NOT EXISTS Skipe.PublicationPartager (
    IdUtilisateurAuteur INT NOT NULL,
    IdUtilisateurCible INT NOT NULL,

    PRIMARY KEY (IdUtilisateurAuteur, IdUtilisateurCible),

    FOREIGN KEY (IdUtilisateurAuteur) REFERENCES Utilisateur (Id),
    FOREIGN KEY (IdUtilisateurCible) REFERENCES Utilisateur (Id)
);

CREATE TABLE IF NOT EXISTS Skipe.Conversation (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdGroupe INT NULL,

    Date DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),

    FOREIGN KEY (IdGroupe) REFERENCES Groupe (Id)
);

CREATE TABLE IF NOT EXISTS Skipe.Message (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdConversation INT NOT NULL,
    IdUtilisateur INT NOT NULL,

    Contenu VARCHAR(1500) NOT NULL,
    EstFichier TINYINT(1) DEFAULT 0,

    Date DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP),

    FOREIGN KEY (IdUtilisateur) REFERENCES Utilisateur (Id),
    FOREIGN KEY (IdConversation) REFERENCES Conversation (Id)
);