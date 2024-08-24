CREATE DATABASE projeto;
GO

USE projeto;
GO

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    CPF NVARCHAR(11) NOT NULL UNIQUE,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    Grupo NVARCHAR(50),
    Perfil NVARCHAR(50) NOT NULL,
    Senha NVARCHAR(255) NOT NULL,
    SenhaResetCode NVARCHAR(255),
    SenhaResetExpired DATETIME,
    CreatedAt DATETIME DEFAULT GETDATE()
);
GO

CREATE TABLE Solucoes (
    ID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    ANO NVARCHAR(255) NULL,
    MP NVARCHAR(255) NULL,
    SOLUCAO NVARCHAR(255) NULL,
    DESENVOLVEDOR NVARCHAR(255) NULL,
    CATEGORIA NVARCHAR(255) NULL,
    ABRANGENCIA NVARCHAR(255) NULL,
    FUNCIONALIDADE TEXT NULL,
    FINALIDADE NVARCHAR(255) NULL,
    PERMISSIONAMENTO NVARCHAR(255) NULL,
    FONTE NVARCHAR(255) NULL,
    CONTATO NVARCHAR(255) NULL,
    CONSUMO NVARCHAR(255) NULL,
    LINK NVARCHAR(1000) NULL,
);
GO

CREATE TABLE Gestao (
    ID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    created_at datetime NOT NULL DEFAULT (sysutcdatetime()),
    GESTAO NVARCHAR(255) NOT NULL,
    MPPRESIDENTE NVARCHAR(10) NULL,
    PRESIDENTE NVARCHAR(255) NULL,
    MPVICE NVARCHAR(10) NULL,
    VICE NVARCHAR(255) NULL,
    SECRETARIA NVARCHAR(1000) NULL,
    GRUPOS NVARCHAR(1000) NULL,
    REUNIOES NVARCHAR(255) NULL,
    DOC_REUNIOES TEXT NULL,
    LINK_REUNIOES NVARCHAR(1000) NULL,
    ESCOLAS NVARCHAR(1000) NULL,
    DOC_ESCOLAS TEXT NULL,
    LINK_ESCOLAS NVARCHAR(1000) NULL,
    DOC_NOTAS TEXT NULL,
    LINK_NOTAS NVARCHAR(1000) NULL,
    DOC_ORIENTACOES TEXT NULL,
    DOC_OPERACOES TEXT NULL,
    LINK_OPERACOES NVARCHAR(255) NULL,
    DOC_ESTATUTO TEXT NULL,
);
GO

CREATE TABLE Estrutura (
    ID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    MP NVARCHAR(10) NULL,
    ORGAO NVARCHAR(255) NULL,
    RESOLUCAO NVARCHAR(255) NULL,
    LINK NVARCHAR(1000) NULL,
);
GO

CREATE TABLE Convenios (
    ID INT PRIMARY KEY IDENTITY(1, 1) NOT NULL,
    MP NVARCHAR(100) NULL,
    SIGLA NVARCHAR(255) NULL,
    ESFERA NVARCHAR(255) NULL,
    DENOMINACAO NVARCHAR(255) NULL,
);
GO

INSERT INTO Users (CPF, Nome, Email, Grupo, Perfil, Senha, SenhaResetCode, SenhaResetExpired, CreatedAt)
VALUES ('12345678901', 'admin', 'admin@mpsp.mp.br', 'MPSP', 'Admin', '$2a$10$Le1vYXpUi8UvP2dO5fbbyOxAcDaxPi1pb2AKa5mg0xyzGn.EBsxEq', NULL, NULL, '2024-04-08T00:00:00');
GO
