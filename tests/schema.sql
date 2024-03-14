create schema brain_agriculture;

create table brain_agriculture.rural_producer (
  id         serial primary key,
  name       varchar(100) not null,
  cpf_cnpj   varchar(100) not null
);
