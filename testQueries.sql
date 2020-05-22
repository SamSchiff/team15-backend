use Hospitals_sp20;

select * from People limit 100;
select * from Staff limit 100;
select * from Doctors limit 100;
select * from Wards limit 100;

insert into 
People (
	PersonId, PersonType, LastName, FirstName, Age, COVIDPositive
) 
values (
	12345, "Staff", "User", "Test", 24, 0
);

insert into 
Staff (
	PersonId, StaffType
) 
values (
	12345, "Doctor"
);

insert into 
Wards (
	WardID, WardName, COVIDExposed
)
values (
	123456, "Covid Ward 1", 1
);
insert into 
Wards (
	WardID, WardName, COVIDExposed
)
values (
	1234567, "Covid Ward 2", 1
);
insert into 
Wards (
	WardID, WardName, COVIDExposed
)
values (
	12345678, "Non-Covid Ward 1", 0
);
insert into 
Wards (
	WardID, WardName, COVIDExposed
)
values (
	123456789, "Non-Covid Ward 2", 0
);

insert into 
Doctors (
	PersonId, WardID
)
values (
	12345, 123456
);
