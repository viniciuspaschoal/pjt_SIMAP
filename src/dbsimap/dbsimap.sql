CREATE TABLE escola (
    cod_escola character(7),
    nome_escola character varying(200),
    telefone character varying(20),
    end_rua character varying(100),
    end_bairro character varying(100),
    end_numero character varying(10),
    end_cidade character varying(100),
    end_estado character(2),
    end_cep character(10),
    end_complemento text,
    CONSTRAINT pk_escola PRIMARY KEY (cod_escola)
);

CREATE TABLE professor (
    cod_professor character(7),
    nome_professor character varying(200),
    email_professor character varying(100),
    CONSTRAINT pk_professor PRIMARY KEY (cod_professor)
);

CREATE TABLE grupo_projeto (
    cod_grupoprojeto character(7),
    grupoprojeto character varying(10),
    descricao_grupoprojeto text,
    CONSTRAINT pk_grupo_projeto PRIMARY KEY (cod_grupoprojeto)
);

CREATE TABLE turma (
    cod_turma character(7),
    cod_escola character(7),
    serie character(1),
    turma character(1),
    periodo_regular character varying(20),
    anoletivo_r integer,
    CONSTRAINT pk_turma PRIMARY KEY (cod_turma),
    CONSTRAINT fk_turma_escola FOREIGN KEY (cod_escola)
        REFERENCES public.escola (cod_escola)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE declaracao (
    cod_declaracao character(7),
    declaracao character(2),
    descricao_declaracao character varying(20),
    CONSTRAINT pk_declaracao PRIMARY KEY (cod_declaracao)
);

CREATE TABLE aluno (
    cod_aluno character(7),
    cod_declaracao character(7),
    ra character(9),
    nome_aluno character varying(100),
    data_nascimento date,
    observacao text,
    CONSTRAINT pk_aluno PRIMARY KEY (cod_aluno),
    CONSTRAINT fk_aluno_declaracao FOREIGN KEY (cod_declaracao)
        REFERENCES public.declaracao (cod_declaracao)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE professor_turma (
    cod_professor character(7),
    cod_turma character(7),
    CONSTRAINT pk_professor_turma PRIMARY KEY (cod_professor, cod_turma),
    CONSTRAINT fk_professor_turma_professor FOREIGN KEY (cod_professor)
        REFERENCES public.professor (cod_professor)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_professor_turma_turma FOREIGN KEY (cod_turma)
        REFERENCES public.turma (cod_turma)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE aluno_turma (
    cod_aluno character(7),
    cod_turma character(7),
    CONSTRAINT pk_aluno_turma PRIMARY KEY (cod_aluno, cod_turma),
    CONSTRAINT fk_aluno_turma_aluno FOREIGN KEY (cod_aluno)
        REFERENCES public.aluno (cod_aluno)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_aluno_turma_turma FOREIGN KEY (cod_turma)
        REFERENCES public.turma (cod_turma)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE diagnostico (
    cod_diagnostico character(7),
    cod_turma character(7),
    bimestre_diagnostico character(1),
    data_inclusaodag timestamp DEFAULT now(),
    data_atualizacaodag timestamp DEFAULT now(),
    CONSTRAINT pk_diagnostico PRIMARY KEY (cod_diagnostico),
    CONSTRAINT fk_diagnostico_turma FOREIGN KEY (cod_turma)
        REFERENCES public.turma (cod_turma)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE frequencia_regular (
    cod_aluno character(7),
    cod_turma character(7),
    bimestre_r character(1),
    frequencia_r boolean,
    CONSTRAINT pk_frequencia_regular PRIMARY KEY (cod_aluno, cod_turma),
    CONSTRAINT fk_frequencia_regular_aluno FOREIGN KEY (cod_aluno)
        REFERENCES public.aluno (cod_aluno)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_frequencia_regular_turma FOREIGN KEY (cod_turma)
        REFERENCES public.turma (cod_turma)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE hipotese (
    cod_hipotese character(7),
    hipotese character varying(10),
    descricao_hipotese text,
    CONSTRAINT pk_hipotese PRIMARY KEY (cod_hipotese)
);

CREATE TABLE resultado_diagnostico (
    cod_resultdiagnostico character(7),
    cod_aluno character(7),
    cod_diagnostico character(7),
    cod_hipotese character(7),
    CONSTRAINT pk_resultado_diagnostico PRIMARY KEY (cod_resultdiagnostico),
    CONSTRAINT fk_resultado_diagnostico_aluno FOREIGN KEY (cod_aluno)
        REFERENCES public.aluno (cod_aluno)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_resultado_diagnostico_diagnostico FOREIGN KEY (cod_diagnostico)
        REFERENCES public.diagnostico (cod_diagnostico)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_resultado_diagnostico_hipotese FOREIGN KEY (cod_hipotese)
        REFERENCES public.hipotese (cod_hipotese)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE projeto_recomposicao (
    cod_projeto character(7),
    cod_professor character(7),
    cod_grupoprojeto character(7),
    periodo_projeto character varying(20),
    CONSTRAINT pk_projeto_recomposicao PRIMARY KEY (cod_projeto),
    CONSTRAINT fk_projeto_recomposicao_professor FOREIGN KEY (cod_professor)
        REFERENCES public.professor (cod_professor)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_projeto_recomposicao_grupoprojeto FOREIGN KEY (cod_grupoprojeto)
        REFERENCES public.grupo_projeto (cod_grupoprojeto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE aluno_projeto (
    cod_aluno character(7),
    cod_projeto character(7),
    CONSTRAINT pk_aluno_projeto PRIMARY KEY (cod_aluno, cod_projeto),
    CONSTRAINT fk_aluno_projeto_aluno FOREIGN KEY (cod_aluno)
        REFERENCES public.aluno (cod_aluno)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_aluno_projeto_projeto FOREIGN KEY (cod_projeto)
        REFERENCES public.projeto_recomposicao (cod_projeto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE data_projeto (
    cod_dataprojeto character(7),
    cod_projeto character(7),
    data_projeto date,
    CONSTRAINT pk_data_projeto PRIMARY KEY (cod_dataprojeto),
    CONSTRAINT fk_data_projeto_projeto FOREIGN KEY (cod_projeto)
        REFERENCES public.projeto_recomposicao (cod_projeto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE frequencia_projeto (
    cod_aluno character(7),
    cod_dataprojeto character(7),
    frequencia_p boolean,
    CONSTRAINT pk_frequencia_projeto PRIMARY KEY (cod_aluno, cod_dataprojeto),
    CONSTRAINT fk_frequencia_projeto_aluno FOREIGN KEY (cod_aluno)
        REFERENCES public.aluno (cod_aluno)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_frequencia_projeto_dataprojeto FOREIGN KEY (cod_dataprojeto)
        REFERENCES public.data_projeto (cod_dataprojeto)
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);