CREATE TABLE
    Gestao (
               ID int IDENTITY(1, 1) NOT NULL,
               created_at datetime NOT NULL DEFAULT (sysutcdatetime()),
               GESTAO nvarchar(255) NOT NULL,
               MPPRESIDENTE nvarchar(10) NULL,
               PRESIDENTE nvarchar(255) NULL,
               MPVICE nvarchar(10) NULL,
               VICE nvarchar(255) NULL,
               SECRETARIA nvarchar(1000) NULL,
               GRUPOS nvarchar(1000) NULL,
               REUNIOES nvarchar(255) NULL,
               DOC_REUNIOES text NULL,
               LINK_REUNIOES nvarchar(1000) NULL,
               ESCOLAS nvarchar(1000) NULL,
               DOC_ESCOLAS text NULL,
               LINK_ESCOLAS nvarchar(1000) NULL,
               DOC_NOTAS text NULL,
               LINK_NOTAS nvarchar(1000) NULL,
               DOC_ORIENTACOES text NULL,
               DOC_OPERACOES text NULL,
               LINK_OPERACOES varchar(255) NULL,
               DOC_ESTATUTO text NULL,
)
ALTER TABLE
    Gestao
    ADD
        CONSTRAINT Gestao_pkey PRIMARY KEY (ID)