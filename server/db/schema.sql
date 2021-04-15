create database nhl_stats;

create table skaters(
    id int auto_increment primary key,
    player_id varchar(255),
    full_name varchar(255) not null,
    number varchar(255),
    nationality varchar(255),
    team varchar(255),
    position varchar(255),
    games_played varchar(255),
    goals varchar(255),
    assists varchar(255),
    points varchar(255),
    plus_minus varchar(255),
    fo_percentage varchar(255),
    shot_percentage varchar(255),
    pim varchar(255),
    hits varchar(255),
    blocks varchar(255)
);

create table goalies(
  id int auto_increment primary key,
    player_id varchar(255),
    full_name varchar(255) not null,
    number varchar(255),
    nationality varchar(255),
    team varchar(255),
    position varchar(255),
    games_played varchar(255),
    wins varchar(255),
    losses varchar(255),
    ot varchar(255),
    so varchar(255),
    save_percentage varchar(255),
    gaa varchar(255),
    sa varchar(255),
    saves varchar(255),
    ga varchar(255)
);
