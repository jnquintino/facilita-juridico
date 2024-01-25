create table cliente
  (
      id       serial primary key,
      nome     varchar(150) not null,
      email    varchar(200),
      telefone varchar(25),
      coordx   varchar(100),
      coordy   varchar(100)
  );
