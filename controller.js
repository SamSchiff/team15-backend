
export const testQuery = async (req, res) => {
  const sql = 'SELECT * FROM Doctors limit 100';
  global.connection.query(sql, (err, response) => {
    if (err) console.error(err);
    console.log(response);
    res.send('success');
  });
};

export const createDoctor = async (req, res) => {
  const { firstName, lastName, age, covidPositive, wardId } = req.body;
  const personId = parseInt(Math.random() * 1000000000);
  let sql = 'insert into People (PersonId, PersonType, LastName, FirstName, Age, COVIDPositive) values (?,?,?,?,?,?);';
  global.connection.query(sql, [personId, 'Staff', lastName, firstName, age, covidPositive], (err, response1) => {
    if (err) console.error(err);
    sql = 'insert into Staff (PersonId, StaffType) values (?,?);';
    global.connection.query(sql, [personId, 'Doctor'], (err, response2) => {
      if (err) console.error(err);
      sql = 'insert into Doctors (PersonId, WardID) values (?,?);';
      global.connection.query(sql, [personId, wardId], (err, response3) => {
        if (err) console.error(err);
        res.send('success');
      });
    });
  });
};

export const createPatient = async (req, res) => {
  const { firstName, lastName, age, covidPositive } = req.body;
  const personId = parseInt(Math.random() * 1000000000);
  let sql = 'insert into People (PersonId, PersonType, LastName, FirstName, Age, COVIDPositive) values (?,?,?,?,?,?);';
  global.connection.query(sql, [personId, 'Patient', lastName, firstName, age, covidPositive], (err, response1) => {
    if (err) console.error(err);
    sql = 'insert into Patients (PersonId, CheckedIn) values (?,?);';
    global.connection.query(sql, [personId, 1], (err, response2) => {
      if (err) console.error(err);
      res.send('success');
    });
  });
};

export const getAllPatients = async (req, res) => {
  const sql = 'select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId;';
  global.connection.query(sql, (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getAllDoctors = async (req, res) => {
  const sql = 'select * from People as p inner join Staff as s on p.personID = s.PersonId inner join Doctors as d on d.personID = p.personID;';
  global.connection.query(sql, (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getAllWards = async (req, res) => {
  const sql = 'select * from Wards;';
  global.connection.query(sql, (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getPatient = async (req, res) => {
  const { personId } = req.query;
  const sql = 'select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId where pe.PersonId = ?;';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getDoctor = async (req, res) => {
  const { personId } = req.query;
  const sql = 'select * from People as p inner join Staff as s on p.personID = s.PersonId inner join Doctors as d on d.personID = p.personID where p.personId = ?;';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};
