const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const router = express.Router();

const connection=mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: 'root@123',
  database: 'crud_operations'
});

connection.connect(function(error){
  if(!!error) console.log(error);
  else console.log('Database Connected');
});

app.set('views',path.join(__dirname,'views'));

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/get',(req, res) => {
    let sql = "SELECT * FROM incident";
    let query = connection.query(sql, (err,rows) => {
      if(err) throw err;
      res.render('user_index',{
        title : 'CRUD Operation',
         incident : rows

     });
});
});

app.get('/add',(req, res) => {
    res.render('incident_add', {
        title : 'Add Incident'
    });
});



app.post('/save',(req, res) => {
    let data = {reported_by: req.body.reportedby, date_of_report: req.body.dateofreport, title_role: req.body.titlerole,incident_no: req.body.incidentno,incident_type: req.body.incidenttype,date_of_incident: req.body.dateofincident,location: req.body.location,city: req.body.city,state: req.body.state,zipe_code: req.body.zipcode,incident_description: req.body.description,followup_action: req.body.followupaction};
    let sql = "INSERT INTO incident SET ?";
    let query = connection.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/get');
    });
});

app.get('/edit/:incidentId',(req, res) => {
    const incidentId = req.params.incidentId;
  let sql = `Select * from incident where id = ${incidentId}`;
    let query = connection.query(sql,(err, result) => {
        if(err) throw err;
        res.render('incident_edit', {
          title : 'Edit',
            incident : result[0]
        });
    });
});

app.post('/update',(req, res) => {
    const incidentId = req.body.id;
    let sql = "update incident SET  reported_by ='"+req.body.reportedby+"',  date_of_report='"+req.body.dateofreport+"',  title_role='"+req.body.titlerole+"',  incident_no='"+req.body.incidentno+"', date_of_incident='"+req.body.dateofincident+"' ,  location='"+req.body.location+"',  city='"+req.body.city+"',  state='"+req.body.state+"',  zipe_code='"+req.body.zipcode+"',  incident_description='"+req.body.description+"',  followup_action='"+req.body.followupaction+"'  where id ="+incidentId;
    let query = connection.query(sql,(err, results) => {
      if(err) throw err;
      res.redirect('/get');
    });
});





app.listen(3001, () => {
  console.log('Server is running at port 3001');

});
