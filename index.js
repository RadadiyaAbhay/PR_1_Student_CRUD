const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set("view engine", "ejs");  
let students = []
app.get('/' ,(req, res) =>{
    res.render('index')
})

app.post('/addstudent' ,(req, res) =>{
    console.log()
    let newStudent = {
        grid : req.body.grid,
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile,
        course : req.body.course,
        id : Math.floor(Math.random()*1000000000)
    }
    students.push(newStudent)
    res.redirect('/view')
})

app.get('/view' ,(req, res) =>{
    res.render( 'view', {students});
})

app.get('/delete/:id', (req, res)=>{
    let uid = req.params.id;
    let newStudent = students.filter((student)=>{
        return student.id != uid;
    })
    students = newStudent;
    res.redirect('/view');
    
})

app.post('/updatestudent' ,(req, res) =>{
    let newStudent = {
        grid : req.body.grid,
        name : req.body.name,
        email : req.body.email,
        mobile : req.body.mobile,
        course : req.body.course,
        id : req.body.id
    }
    let newStudents = students.map((student) =>{
        if(student.id == newStudent.id){
            return newStudent ;
        }else{
            return student ;
        }
    })
    students = newStudents;
    res.redirect('/view')
})

app.get('/edit/:id', (req, res)=>{
    let uid = req.params.id;
    let newStudents = students.filter((student)=>{
        return student.id == uid;
    })
    res.render('edit', {data :newStudents[0] });
})
app.listen(port , () =>{
    console.log('Server is  running on port ' + port);
})