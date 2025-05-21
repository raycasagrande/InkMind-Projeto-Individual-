create database inkmind;

use inkmind;

create table usuario(
idUsuario int primary key auto_increment,
nome varchar(45),
nick varchar(20),
email varchar(50),
senha char(6)
);

select * from usuario;

create table postagem(
idPostagem int primary key auto_increment,
caracteres varchar(300), -- Quantidade de caracteres permitidos por comentário
dataPostagem datetime default current_timestamp,
fkUsuario int,
foreign key (fkUsuario) references usuario(idUsuario)
);

create table comentario(
idComentario int primary key auto_increment,
conteudo varchar(300) not null,
dataComentario datetime default current_timestamp,
fkUsuario int,
fkPostagem int,
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkPostagem) references postagem(idPostagem)
);

create table curtida(
idCurtida int primary key auto_increment,
dataCurtida datetime, 
fkUsuario int,
fkPostagem int,
foreign key (fkUsuario) references usuario(idUsuario),
foreign key (fkPostagem) references postagem(idPostagem),
unique(fkUsuario, fkPostagem) -- Vai impedir que o mesmo usuário curta a mesma postagem mais de uma vez
);

