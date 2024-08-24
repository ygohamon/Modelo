CREATE TABLE
    Convenios (
                  ID int IDENTITY(1, 1) NOT NULL,
                  MP nvarchar(100) NULL,
                  SIGLA nvarchar(255) NULL,
                  ESFERA nvarchar(255) NULL,
                  DENOMINACAO nvarchar(255) NULL,
)
ALTER TABLE
    Convenios
    ADD
        CONSTRAINT PK__Convenio__3214EC27E88E2355 PRIMARY KEY (ID)