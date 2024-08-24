CREATE TABLE
    Estrutura (
                  ID int IDENTITY(1, 1) NOT NULL,
                  MP nvarchar(10) NULL,
                  ORGAO nvarchar(255) NULL,
                  RESOLUCAO nvarchar(255) NULL,
                  LINK nvarchar(1000) NULL,
)
ALTER TABLE
    Estrutura
    ADD
        CONSTRAINT PK__Estrutur__3214EC27311BD1E2 PRIMARY KEY (ID)