begin;

-- update field title with random wordings
update versions 
	set title = str_random_lipsum(5, null, null) 
	where id > 0 and not (title = '' or title is null);

-- update field description with random wordings and link
update versions 
	set description = concat('<p>', str_random_lipsum(5, null, null), ' <a href="http://google.com">'
		, str_random_lipsum(3, null, null), '</a> ', str_random_lipsum(4, null, null), '</p>')
	where id > 0 and not (description = '' or description is null);

select * from versions 
	limit 100;

commit;