insert into blog_entries (short_subject, subject, entry_date, is_published) values (
   'Tech Kickoff',
   'How Does This Work???',
    NOW(), 
    false
);
insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  2,
  1,
  "About three weeks before leaving, I decided to make this. As I mentioned in last post, it was serving two purposes:",
  "list-item-header");

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  3,
  1,
  "Keep friends/family updated on travels",
  "list-item");
  
insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  4,
  1,
  "Getting to try out some things I haven't done before",
  "list-item");

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  5,
  1,
  "I won't go into the specifics of my application (will do in a future post), but rather the frameworks and platforms I'm using.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  6,
  1,
  "At it's core, I'm using an express nodejs application, running on Amazon's Elastic Beanstalk.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  7,
  1,
  "Let's take each of these individually",
  "list-item-header");
insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  8,
  1,
  "Express: Framework that makes it super easy to get a basic page setup. The programming language that it uses is javascript, and more specificially nodeJS.",
  "list-item");
insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  9,
  1,
  "Elastic Beanstalk is a service that Amazon provides, and what it gives me is the ability to take code that I've developed on my computer, and dump it onto a host within Amazon, for direct access on the internet. Elastic beanstalk provides a URL (http://steveleavestug.us-west-2.elasticbeanstalk.com/) to access your application.",
  "list-item");

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  10,
  1,
  "Ok - so you've got this weird URL, why is that not what you're sharing? In short, because nobody wants to remember the long URL that Amazon provides. To get past that, you buy a domain name (URL), which I did through Route 53 (another Amazon service). You go there, type in the name you want, and if it hasn't yet been purchased, you can buy it. With that domain name, you can do many things. You can have it route to a specific web server you own, or simply map to another URL. The latter is what I did, creating what is called a CNAME to my Elastic Beanstalk URL.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  11,
  1,
  "For a templating language, I'm using Jade which is the default templating language using express.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  12,
  1,
  "So that I can both write these posts, as well as enhance the blog while not on internet (currently sitting on a 6 hour train ride), I'm using a local mysql database for development, and a mysql database in Amazon's RDS for the production site (the one you're viewing). The database stores the actual text of the blog entries, so that I can add a blog entry without having to deploy new code.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  13,
  1,
  "Elastic Beanstalk makes it very easy to deploy code. I have a local git repository (where all the code is stored), and when that package is linked to your Elastic Beanstalk environment through a one time setup, you just type 'eb deploy', and it packages up everything in your local repository, and updates the environment within about 2 minutes.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  14,
  1,
  "So, in summary: Code is developed using express/node, is deployed to elastic beanstalk, uses RDS for the database, and Route 53 for domain name management. Lastly, I've used AWS more in the past month than I have at any point since it was created. It's very powerful, but also kind of a pain in the ass. Many times I had issues with permissioning different services to talk to each other, how to configure certain environments, getting the Route 53 mapping correct, etc. My guess is that I spent about 20 hours over the past month getting this site all setup, and probably half of that was configuring AWS services, and the other half writing the actual code powering it. All that said, it's pretty great at what it does. I worked with a lot of people at Amazon that are now, or have been, in AWS - you guys have built a cool service.",
  null);

insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content, style_class) values (
  ?,
  15,
  1,
  "Questions about anything I said? You can ask in the comments section - the newest feature to the blog! It's pretty barebones for now, but it works.",
  null);
insert into blog_entry_entries (blog_entry_id, entry_number, entry_type, entry_content) values (
  ?,
  16,
  1,
  "Next post: India First Impressions"
);
  
