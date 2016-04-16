create table blog_entries(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  short_subject text not null,
  subject text not null,  
  entry_date date not null,
  is_published boolean not null default false
);

create table blog_entry_entries(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  blog_entry_id INT(6) references blog_entries.id,
  entry_number INT(3) not null,
  entry_type INT(1) not null,
  entry_content text not null
); 
create unique index entry_id_number on blog_entry_entries(blog_entry_id, entry_number);

alter table blog_entry_entries add column style_class text default null;

create table comments(
  id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  entry_reference INT(6) not null,
  name text n ot null,
  comment text not null,  
  entry_date date not null
);