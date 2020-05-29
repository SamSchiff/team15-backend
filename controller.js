
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

export const createBed = async (req, res) => {
  const { bedId, wardId } = req.body;
  const sql = 'insert into Beds (BedID, WardID) values (?, ?);';
  global.connection.query(sql, [bedId, wardId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
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

export const getWard = async (req, res) => {
  const { wardId } = req.query;
  const sql = 'select * from Wards where WardID = ?;';
  global.connection.query(sql, [wardId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getBed = async (req, res) => {
  const { bedId } = req.query;
  const sql = 'select * from Beds where BedID = ?;';
  global.connection.query(sql, [bedId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const checkInPatient = async (req, res) => {
  const { personId } = req.body;
  const sql = 'update Patients set CheckedIn = 1 where PersonID = ?;';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const assignDoctorToWard = async (req, res) => {
  const { personId, wardId } = req.body;
  const sql = 'update Doctors set WardID = ? where PersonID = ?;';
  global.connection.query(sql, [wardId, personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const assignPatientToBed = async (req, res) => {
  const { personId, bedId } = req.body;
  const sql = 'update Patients set BedID = ? where PersonID = ?;';
  global.connection.query(sql, [bedId, personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const deletePerson = async (req, res) => {
  const { personId } = req.body;
  const sql = 'delete from People where PersonID = ?';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const deleteBed = async (req, res) => {
  const { bedId } = req.body;
  const sql = 'delete from Beds where BedID = ?';
  global.connection.query(sql, [bedId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};
