
import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

dotenv.config({ silent: true });

export const signin = (req, res, next) => {
  res.send({ token: tokenForUser(req.user) });
};

export const signup = (req, res, next) => {
  const { username } = req.body;
  const { password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  const newUser = {
    username,
    password: hash,
  };

  if (!username || !password) {
    return res.status(422).send('You must provide email and password');
  }
  const personId = parseInt(Math.random() * 1000000000);
  const sql = 'insert into DatabaseUsers (PersonId, Username, Password) values (?,?,?);';
  global.connection.query(sql, [personId, username, hash], (err, response1) => {
    if (err) console.error(err);
    return res.send({ token: tokenForUser(newUser) });
  });
};

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.username, iat: timestamp }, process.env.AUTH_SECRET);
}

export const getAllUsers = async (req, res) => {
  const sql = 'select * from DatabaseUsers;';
  global.connection.query(sql, (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getUser = async (req, res) => {
  const { personId } = req.query;
  const sql = 'select * from DatabaseUsers where PersonID = ?;';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const updateUser = async (req, res) => {
  const { personId, username, password } = req.body;
  const sql = 'update DatabaseUsers set Username = ?, Password = ? where PersonID = ?;';
  global.connection.query(sql, [username, password, personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const deleteUser = async (req, res) => {
  const { personId } = req.body;
  const sql = 'delete from DatabaseUsers where PersonID = ?';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
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

export const createBed = async (req, res) => {
  const { bedId, wardId } = req.body;
  const sql = 'insert into Beds (BedID, WardID) values (?, ?);';
  global.connection.query(sql, [bedId, wardId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const getAllPatients = async (req, res) => {
  const sql = 'select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId inner join Wards as w on w.wardID = pa.wardID;';
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
  const sql = 'select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId inner join inner join Wards as w on w.wardId = pa.wardID where pa.personID=?;';
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

export const assignPatientToWard = async (req, res) => {
  const { personId, wardId } = req.body;
  const sql = 'update Patients set WardID = ? where PersonID = ?;';
  global.connection.query(sql, [wardId, personId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};

export const deletePerson = async (req, res) => {
  const { personId } = req.body;
  let sql = 'delete from Staff where PersonID = ?;';
  global.connection.query(sql, [personId], (err, response) => {
    if (err) console.error(err);
    sql = 'delete from Doctors where PersonID = ?;';
    global.connection.query(sql, [personId], (err, response2) => {
      if (err) console.error(err);
      sql = 'delete from Patients where PersonID = ?;';
      global.connection.query(sql, [personId], (err, response3) => {
        if (err) console.error(err);
        sql = 'delete from People where PersonID = ?;';
        global.connection.query(sql, [personId], (err, response4) => {
          if (err) console.error(err);
          res.send(response);
        });
      });
    });
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

export const getWardPatients = async (req, res) => {
  const { wardId } = req.query;
  const sql = 'select * from People as pe inner join Patients as pa on pe.personID = pa.PersonId inner join Beds as b on pa.BedID = b.BedID inner join Wards as w on b.WardId = w.wardId where w.wardId=?;';
  global.connection.query(sql, [wardId], (err, response) => {
    if (err) console.error(err);
    res.send(response);
  });
};
