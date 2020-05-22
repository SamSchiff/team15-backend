
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
