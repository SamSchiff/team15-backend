use Hospitals_sp20;

select * from DatabaseUsers limit 100;
select * from People limit 100;
select * from Staff limit 100;
select * from Doctors limit 100;
select * from Wards limit 100;
select * from Patients limit 100;

select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId;

select * from People as p inner join Staff as s on p.personID = s.PersonId inner join Doctors as d on d.personID = p.personID;

select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId where pe.PersonId = 12345;

select * from People as p inner join Staff as s on p.personID = s.PersonId inner join Doctors as d on d.personID = p.personID where p.personId = 238987611;

select * from Wards where WardID = 123456;

insert into
DatabaseUsers (
	PersonId, Username, Password
)
values (
	12345, "admin", "password"
);

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

insert into
People (
	PersonId, PersonType, LastName, FirstName, Age, COVIDPositive
)
values (
	123456, "Patient", "Patient", "Test", 25, 1
);

insert into
Patients (
	PersonId, CheckedIn
)
values (
	123456, 1
);
