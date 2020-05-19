
export const testQuery = async (req, res) => {
  const sql = 'SELECT * FROM Doctors limit 100';
  global.connection.query(sql, (err, response) => {
    if (err) console.error(err);
    console.log(response);
    res.send('success');
  });
};
