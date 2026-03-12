create table usuarios(
id_usuario serial primary key,
tipoConta varchar(255) DEFAULT 'cliente',
nome varchar(255) not null,
email varchar(255) not null unique,
senha varchar(255) not null,
endereco varchar(255) not null, 
);
select * from usuarios;
select * from pedidos;

drop table usuarios;
drop table pedidos;

insert into pedidos(nome, descricao_problema,tipoeletronico,modelo,valor)values(
'Anderson',
'Erro no software',
'console',
'Play Station 5',
3000
)

create table pedidos(
id_pedido serial primary key,
nome varchar(255) not null,
descricao_problema varchar(2000) not null,
tipoeletronico varchar(255) not null,
modelo varchar(255) not null,
telefone varchar(255) not null,
valor numeric(10,2)
comentario varchar(2000)
)