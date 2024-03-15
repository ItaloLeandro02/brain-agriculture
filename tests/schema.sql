create schema brain_agriculture;

create table brain_agriculture.rural_producer (
  id         serial primary key,
  name       varchar(100) not null,
  cpf_cnpj   varchar(100) not null
);

create table brain_agriculture.farm (
  id				 						serial primary key,
	rural_producer_id			serial not null,
	name									varchar(100) not null,
	city_name							varchar(100) not null,
	state									char(2) not null,
	total_area						numeric(5, 2) not null,
	agricultural_area			numeric(5, 2) not null,
	vegetation_area				numeric(5, 2) not null
);
