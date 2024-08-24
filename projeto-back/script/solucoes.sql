CREATE TABLE
    Solucoes (
                 id int IDENTITY(1, 1) NOT NULL,
                 ANO varchar(255) NULL,
                 MP varchar(255) NULL,
                 SOLUCAO varchar(255) NULL,
                 DESENVOLVEDOR varchar(255) NULL,
                 CATEGORIA varchar(255) NULL,
                 ABRANGENCIA varchar(255) NULL,
                 FUNCIONALIDADE text NULL,
                 FINALIDADE varchar(255) NULL,
                 PERMISSIONAMENTO varchar(255) NULL,
                 FONTE varchar(255) NULL,
                 CONTATO varchar(255) NULL,
                 CONSUMO varchar(255) NULL,
                 LINK varchar(1000) NULL,
)
ALTER TABLE
    Solucoes
    ADD
        CONSTRAINT PK__Solucoes__3213E83FAC5D1A6B PRIMARY KEY (id)