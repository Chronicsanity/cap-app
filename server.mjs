import react, { useState, useEffect } from "react";
import App from "./app/models/calendar.js";
import express from "express";

import session from "express-session";
import cors from "cors";
import cookieSession from "cookie-session";
import path from 'path';
import Sequelize from "sequelize";
import bodyParser from "body-parser";
import db from "./app/models/index.js";
import {fileURLToPath} from 'url';
const User = db.user;
const Employee = db.employee;
const QueuedUser = db.queuedUsers;
const Shift = db.shift;
const Jobs = db.jobs;
const WeekofShifts = db.weekofshifts;
const Shift_Assignments = db.shift_assignments;
import mysql from 'mysql';
import Promise from 'promise';
import bcrypt from 'bcryptjs';
import controller from "./app/controllers/auth.controller.js";
import flash from 'connect-flash';
const sequelize = new Sequelize("mysql://b68ec5f8aea53b:6f4d23b2@us-cdbr-east-06.cleardb.net/heroku_a26e4a307a3f41f?reconnect=true", {
logging: false
});
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(flash());
app.use(express.json());
import ejs from 'ejs';


 app.use(cors());
 app.enable('trust proxy');
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.use('/jquery',express.urlencoded({ extended: true }));


app.set('view engine','ejs')



app.use(
  cookieSession({
    name: "cap-session",
    secret: "COOKIE_SECRET", 
    httpOnly: true,
    sameSite: 'strict'
  })
);

db.sequelize.sync();

app.get("/", (req, res) => {
  res.render('login', {title: "Login"});
});

app.get("/signin")
import authRoute from './app/routes/auth.routes.js';
import userRoute from'./app/routes/user.routes.js';
import e from "connect-flash";
authRoute(app);
userRoute(app);
app.get( '/forgetpass', (req, res) =>{
  res.render('forgetpass.ejs');
});
app.post('/forgetpass', (req, res) => {
  if (req.body.password != req.body.confPassword) {
    return res.status(404).send({ message: "Passwords do not match."})
  }
  else if (req.body.email != User.email) {
    return res.status(404).send({ message: "No such email."})
  }
  else {
  
    if (req.body.email === User.email)
    {
      User.password = bcrypt.hashSync(req.body.password, 8);
    }
  }
  });
app.get('/index', async (req, res) =>{
 const message = false;
await res.render('index', {message: message})
});
app.post('/index', async (req, res) => {
 await controller.signup(req, res);
 const message = true;
 res.render('index', {message:message})
  });


app.post('/thanks'), async function (req,res) {
  res.render('/')
}

app.get('/data', async function (req, res) {
   
  

    controller.scheduleTable().then(info => {
    //console.log(info)
    res.render('data.ejs', {user: info})
    
}) 
  
async function generateID(min, max) {
  return  Math.floor(
      Math.random() *(max - min) + min
  )
}
})
app.post('/data', async (req, res) => {

req.body = JSON.parse(JSON.stringify(req.body));


async function createEmployee(req) {
   
  const user = await JSON.stringify(req.body.employee_name).replace(/]|[[]/g, '');
    const EmpChoice = await Employee.findAll( {where: {user: user}});
  const editEmployee = await Employee.findAll( {where: {user: user}}).then(result => {
    if (result == null || result == "")  
    
    {return false}
    
  })
  
  
  if (await editEmployee != false)
  {
    return console.log(req.body.employee_name + user),
    await Employee.update({
    job_title: req.body.job_choice},
  
  {where: {user:user}
    })
  }
  else if (user == null || user =='""')
  {
   return console.log("User not found!");
    
      
    }
  



else {
  const value = [];
  const choice = req.body.job_choice
  if (choice.indexOf("busser") < 0) { value.push(1)
  }
  if (choice.indexOf("lineCook") < 0) { value.push (2)
  
  }
  if (choice.indexOf("sousChef") < 0) { value.push(3)
  
  }
  if (choice == "headChef") { value.push(4)}


  const createEmp = Employee.create(
{

user: user,
job_title: req.body.job_choice,
job_value: value

})



 return await createEmp 
 

}
}



if (req.body.hasOwnProperty("acceptEmployee")) {

await createEmployee(req);
  controller.scheduleTable().then(info => {

  res.render('data', {user: info}
 )
})

}

  if(req.body.hasOwnProperty("rejectEmployee")) 
  { 
    

    async function remove(req) {
      const removeUser = await JSON.stringify(req.body.remove_Employee).replace(/]|[[]/g, '');
      const userRemoved = await  Employee.findOne({where: {user: removeUser}})
   
     await Employee.destroy({
    
        where: {user: removeUser }
    })
  
      
    
}

    
   await remove(req);
    controller.scheduleTable().then(info => {
    //console.log(info)
    res.render('data', {user: info}
    )
  })
  
  }
      
  else {
  controller.scheduleTable().then(info => {
    //console.log(info)
    res.render('data', {user: info}
    )
  })
  
  }
  
    })

app.get('/userQueue', async function (req, res) {

    
    
  

    controller.QueueTable(res).then(info => {
    //console.log(info)
    res.render('userQueue.ejs', {user: info})
    if (info.id == null) {
      res.render('userQueue.ejs', {user: "---"})

    }
    }
    )})
app.post('/userQueue', async function (req, res) {
  req.body = JSON.parse(JSON.stringify(req.body));
 
if (await req.body.hasOwnProperty("accept")){


    

  
  console.log("User Accepted!")
  async function clone(){
  await controller.QueueTable().then(info => { 
    for (var i = 0; i < info.length; i++) {
     
      const newUser = info[1]
      const newRole = req.body.selectpicker
      User.upsert({
        id: newUser.id,
        username: newUser.username,
        password: newUser.password,
        email: newUser.email,
        role: req.body.selectpicker
      })
     QueuedUser.destroy({

        where: {id: info[1].id }
    })
  
  
     
return res.render('userQueue',  {user:info})
  }})
  }
    
   await clone();

  
  
}

else if (await req.body.hasOwnProperty("deny")){
  async function removeUser() {
  await controller.QueueTable().then(info => {
  for (var i = 0; i < info.length; i++) {
  QueuedUser.destroy({

    where: {id: info[1].id }
})
return res.render('userQueue', {user:info})
}
  
})

}
await removeUser();
}


})
app.get('/schedule', async (req, res) =>{
const scheduleInfo = App;
  res.render ('schedule', {date: scheduleInfo})

})

app.use(express.static(__dirname + '/views'));

app.get('/shiftmaker', async (req, res) => {

  const employee_list = await Employee.findAll();
  
  const job_list = await Jobs.findAll();
const data = employee_list;
const jobData = job_list;

  res.render ('shiftmaker',{data: data, jobData:jobData} )
  })
app.post('/shiftmaker', async (req, res) =>{
 
  const check = req.body.chosen;
if(Employee.findOne( {where: {user: check}})) {
  const confirmed_Employee = await Employee.findOne( {where: {user: check}});
  const employee_list = await Employee.findAll();
  const job_list = await Jobs.findAll();
  const confirmedJob = req.body.jobList;
  const confirmed_job = await Jobs.findOne( {where: {jobs: confirmedJob}});
  const data = employee_list;
  const time1 = req.body.time1;
  const time2 = req.body.time2;
  const date = req.body.datetimes;
const jobData = job_list;
const fixedName = JSON.stringify(check).replace(/[\{\}\"]/g, "");


 
  const name = [];
  const job = [];
  const start = [];
  const end = [];
  const datetime = []
 const id = [];
 
  name.push(JSON.stringify(check).replace(/]|[[]/g, ''));
  job.push(confirmedJob);
  start.push(req.body.time1);
  end.push(req.body.time2);
  datetime.push(req.body.datetimes);
 
 
const conValue = confirmed_job.job_value;
const EmpValue = confirmed_Employee.job_value
  async function dayChecker (day) {
  const amountPull = await Shift_Assignments.findOne( {attributes: {exclude: ['id', 'Assignments', 'DaysAssigned', 'min_title']}},{where: {DaysAssigned: day}})

return JSON.stringify(amountPull)
}

if (conValue > EmpValue) { 
  const data = employee_list
   const jobData = job_list;
 
  return (res.status(404).send("They are not trained for this job yet!" ))
}
if (datetime.indexOf("Monday") >= 0 && start.toString().indexOf("AM") >= 0) {

if (await dayChecker("Mon AM") > 0)
{ 
  for (var i=0; i < await dayChecker("Mon AM");)
  {
    Shift.create({
    
      employee_name: name,
      jobs: job,
      time_start: start,
      time_end: end,
      date: datetime,
      
    })
   i++;
   if (i >= await dayChecker("Mon AM")){
    console.log("Day Full!")
   
    }
   
  }
  

  }}
  if (datetime.indexOf("Monday")>= 0 && start.toString().indexOf("PM") >= 0) {
if (await dayChecker("Mon PM") > -1)
{
  for (var i=0; i < await dayChecker("Mon PM");)
  {
    Shift.create({
    
      employee_name: name,
      jobs: job,
      time_start: start,
      time_end: end,
      date: datetime,
      
    })
   i++
   if (i >= await dayChecker("Mon PM")){
    console.log("Day Full!")
    Shift.upsert({
      employee_name: name,
      jobs: job,
      time_start: start,
      time_end: end,
      date: datetime
    })
   }
  }

  }
}
if (datetime.indexOf("Tuesday")>= 0 && start.toString().indexOf("AM") >= 0) {
  if (await dayChecker("Tue AM") > 0)
  {
    for (var i=0; i < await dayChecker("Tue AM");)
    {
      Shift.create({
      
        employee_name: name,
        jobs: job,
        time_start: start,
        time_end: end,
        date: datetime,
        
      })
     i++
     if (i == await dayChecker("Tue AM")){
      console.log("Day Full!")
      Shift.update({
        employee_name: name,
        jobs: job,
        time_start: start,
        time_end: end,
        date: datetime
      })
     }
    }
  
    }
  }
  if (datetime.indexOf("Tuesday")>= 0 && start.toString().indexOf("PM") >= 0) {
    if (await dayChecker("Tue PM") > 0)
    {
      for (var i=0; i < await dayChecker("Tue PM");)
      {
        Shift.create({
        
          employee_name: name,
          jobs: job,
          time_start: start,
          time_end: end,
          date: datetime,
          
        })
       i++
       if (i == await dayChecker("Tue PM")){
        console.log("Day Full!")
        Shift.update({
          employee_name: name,
          jobs: job,
          time_start: start,
          time_end: end,
          date: datetime
        })
       }
      }
    
      }
    }
    if (datetime.indexOf("Wednesday")>= 0 && start.toString().indexOf("AM") >= 0) {
      if (await dayChecker("Wed AM") > 0)
      {
        for (var i=0; i < await dayChecker("Wed AM");)
        {
          Shift.create({
          
            employee_name: name,
            jobs: job,
            time_start: start,
            time_end: end,
            date: datetime,
            
          })
         i++
         if (i == await dayChecker("Wed AM")){
          console.log("Day Full!")
          Shift.update({
            employee_name: name,
            jobs: job,
            time_start: start,
            time_end: end,
            date: datetime
          })
         }
        }
      
        }
      }
      if (datetime.indexOf("Wednesday")>= 0 && start.toString().indexOf("PM") >= 0) {
        if (await dayChecker("Wed PM") > 0)
        {
          for (var i=0; i < await dayChecker("Wed PM");)
          {
            Shift.create({
            
              employee_name: name,
              jobs: job,
              time_start: start,
              time_end: end,
              date: datetime,
              
            })
           i++
           if (i == await dayChecker("Wed PM")){
            console.log("Day Full!")
            Shift.update({
              employee_name: name,
              jobs: job,
              time_start: start,
              time_end: end,
              date: datetime
            })
           }
          }
        
          }
        }
        if (datetime.indexOf("Thursday")>= 0 && start.toString().indexOf("AM") >= 0) {
          if (await dayChecker("Thu AM") > 0)
          {
            for (var i=0; i < await controller.dayChecker("Thu AM");)
            {
              Shift.create({
              
                employee_name: name,
                jobs: job,
                time_start: start,
                time_end: end,
                date: datetime,
                
              })
             i++
             if (i == await dayChecker("Thu AM")){
              console.log("Day Full!")
              Shift.update({
                employee_name: name,
                jobs: job,
                time_start: start,
                time_end: end,
                date: datetime
              })
             }
            }
          
            }
          }
          if (datetime.indexOf("Thursday")>= 0 && start.toString().indexOf("PM")>= 0) {
            if (await dayChecker("Thu PM") > 0)
            {
              for (var i=0; i < await dayChecker("Thu PM");)
              {
                Shift.create({
                
                  employee_name: name,
                  jobs: job,
                  time_start: start,
                  time_end: end,
                  date: datetime,
                  
                })
               i++
               if (i == await dayChecker("Thu PM")){
                console.log("Day Full!")
                Shift.update({
                  employee_name: name,
                  jobs: job,
                  time_start: start,
                  time_end: end,
                  date: datetime
                })
               }
              }
            
              }
            }
            if (datetime.indexOf("Friday")>= 0 && start.toString().indexOf("AM") >= 0) {
              if (await dayChecker("Fri AM") > 0)
              {
                for (var i=0; i < await dayChecker("Fri AM");)
                {
                  Shift.create({
                  
                    employee_name: name,
                    jobs: job,
                    time_start: start,
                    time_end: end,
                    date: datetime,
                    
                  })
                 i++
                 if (i == await dayChecker("Fri AM")){
                  console.log("Day Full!")
                  Shift.update({
                    employee_name: name,
                    jobs: job,
                    time_start: start,
                    time_end: end,
                    date: datetime
                  })
                 }
                }
              
                }
              }
              if (datetime.indexOf("Saturday")>= 0 && start.toString().indexOf("AM") >= 0) {
                if (await dayChecker("Sat AM") > 0)
                {
                  for (var i=0; i < await dayChecker("Sat AM");)
                  {
                    Shift.create({
                    
                      employee_name: name,
                      jobs: job,
                      time_start: start,
                      time_end: end,
                      date: datetime,
                      
                    })
                   i++
                   if (i == await dayChecker("Sat AM")){
                    console.log("Day Full!")
                    Shift.update({
                      employee_name: name,
                      jobs: job,
                      time_start: start,
                      time_end: end,
                      date: datetime
                    })
                   }
                  }
                
                  }
                }
                if (datetime.indexOf("Saturday")>= 0 && start.toString().indexOf("PM") >= 0) {
                  if (await dayChecker("Sat PM") > 0)
                  {
                    for (var i=0; i < await dayChecker("Sat PM");)
                    {
                      Shift.create({
                      
                        employee_name: name,
                        jobs: job,
                        time_start: start,
                        time_end: end,
                        date: datetime,
                        
                      })
                     i++
                     if (i == await dayChecker("Sat PM")){
                      console.log("Day Full!")
                      Shift.update({
                        employee_name: name,
                        jobs: job,
                        time_start: start,
                        time_end: end,
                        date: datetime
                      })
                     }
                    }
                  
                    }
                  }
                  if (datetime.indexOf("Sunday")>= 0 && start.toString().indexOf("AM") >= 0) {
                    if (await dayChecker("Sun AM") > 0)
                    {
                      for (var i=0; i < await dayChecker("Sun AM");)
                      {
                        Shift.create({
                        
                          employee_name: name,
                          jobs: job,
                          time_start: start,
                          time_end: end,
                          date: datetime,
                          
                        })
                       i++
                       if (i == await dayChecker("Sun AM")){
                        console.log("Day Full!")
                        Shift.update({
                          employee_name: name,
                          jobs: job,
                          time_start: start,
                          time_end: end,
                          date: datetime
                        })
                       }
                      }
                    
                      }
                    }
                    if (datetime.indexOf("Sunday")>= 0  && start.toString().indexOf("PM") >= 0) {
                      if (await dayChecker("Sun PM") > 0)
                      {
                        for (var i=0; i < await dayChecker("Sun PM");)
                        {
                          Shift.create({
                          
                            employee_name: name,
                            jobs: job,
                            time_start: start,
                            time_end: end,
                            date: datetime,
                            
                          })
                         i++
                         if (i == await dayChecker("Sun PM")){
                          console.log("Day Full!")
                          Shift.update({
                            employee_name: name,
                            jobs: job,
                            time_start: start,
                            time_end: end,
                            date: datetime
                          })
                         }
                        }
                      
                        }
                      }


const ahhhh = await Shift_Assignments.findOne( {attributes: {exclude: ['id', 'Assignments', 'DaysAssigned', 'min_title']}},{where: {DaysAssigned: "Mon AM"}})

const fixed = JSON.stringify(ahhhh)
if (ahhhh > 0) {console.log("fixed")}
 console.log(check+" is set for "+start+" to "+end+ " at "+datetime+" "+id+" "+datetime.indexOf("Monday")+start.toString().indexOf("AM")+" "+datetime.indexOf("Friday")+start.toString().indexOf("PM"))}

 const employee_list = await Employee.findAll();
 const job_list = await Jobs.findAll();
 const data = employee_list;
 const jobData = job_list;
 await controller.assignmentsTable(res).then(info => {
  res.render ('shiftmaker',{data: data, jobData:jobData, week: info})
 })

})

  app.get('/weekshift', async function (req, res) {

   await controller.weekTable().then(info => {
      //console.log(info)
      res.render('weekshift', {week: info}
      )
    })
  })
  app.post('/weekshift', async (req, res) =>{

  
    await controller.checkedList(req)
  
  
  
  
  
  
  
  
    await controller.assignmentsTable(res).then(info => {
      //console.log(info)
      res.render('shiftassignment', {week: info}
      )


  })

})
app.get('/newWeek', async function (req,res){

  controller.assignmentsTable(res).then(info => {
    //console.log(info)
    res.render('newWeek', {info: info})
  

    })
  })

app.post('/newWeek', async function (req,res){

const dayChoice = await req.body.selectweek;
const timeCheck = await req.body.time;
const dayCheck = await Shift_Assignments.findAll({where: {DaysAssigned:dayChoice}})
const counting = await Shift_Assignments.count({where: {DaysAssigned: dayChoice+ " "+timeCheck}})
req.body = JSON.parse(JSON.stringify(req.body));



async function removeShift() {
  const removeDay =  await dayChoice
  const amOrPm = []
 const removalNumber = req.body.removalNumber;

  if (timeCheck != null) {
    amOrPm.push(timeCheck)
  }
 
 await Shift_Assignments.destroy({

    where: {DaysAssigned: removeDay+ " "+amOrPm, Shift_counter: removalNumber}
})}



async function timeAdd(){

  
 

  
  const amOrPm = []


  if (timeCheck != null) {
    
    amOrPm.push(timeCheck)
  }
  
  


 
    await Shift_Assignments.upsert({
      DaysAssigned: dayChoice+" "+amOrPm,
      Shift_counter: counting
    })

}

if (await req.body.hasOwnProperty("add")){
 
await timeAdd();


controller.assignmentsTable(res).then(info => {
  //console.log(info)
  res.render('newWeek', {info: info})
})
}

if (await req.body.hasOwnProperty("remove")){

  await removeShift();

  controller.assignmentsTable(res).then(info => {
    //console.log(info)
    res.render('newWeek', {info: info})})

}
});

app.get('/createAssignments', async function (req,res){
await controller.jobList(res).then(info => {
  res.render('createAssignments', {jobs:info})

})
})


app.post('/createAssignments', async function (req,res){

const newJobs = await req.body.assignments;
const newMinTitle = JSON.stringify(await req.body.min_title).replace(/]|[[]/g, '');
const value = []


const test = await Jobs.upsert({
job_value: newMinTitle,
jobs: newJobs
})

if(newMinTitle == "4")
{
  await test.min_title == JSON.stringify("Head Chef")
}
if(newMinTitle == "3")
{
  await test.min_title == "Sous Chef"
}
if(newMinTitle == "2")
{
  await test.min_title == "Line Cook"
}
if(newMinTitle == "1")
{
 await test.min_title =="Busser"
}
if(newMinTitle == "0")
{
 await test.min_title == "Busser"
}
console.log(await test, await test.min_title)

await controller.jobList(res).then(info => {
  res.render('createAssignments', {jobs:info})


})
})

app.get('/shiftassignment', async function (req,res){

  await controller.assignmentsTable(res).then(info => {
    //console.log(info)
    res.render('shiftassignment', {week: info}
    )

})
})
app.post('/shiftassignment', async function (req,res){
const counter =  await req.body.countercheck

const amount = await req.body.amntEmployees
const assignments = await req.body.assignments;
const min_title = await req.body.min_title
const check = await req.body.weekcheck

const maxCounter = await counter.length;
async function valueCheck(i) { 
  const valcounter = [];
if (min_title[i] == "headChef")
{
  valcounter.push("4")
}
if (min_title[i] == "sousChef")
{
  valcounter.push("3")
}
if (min_title[i] == "lineCook")
{
  valcounter.push("2")
}
if (min_title[i] == "busser")
{
  valcounter.push("1")
}
return JSON.stringify(valcounter).replace(/]|[/''[]/g, "")}


if (Shift_Assignments.id == null) {
  for (var i=0; i< counter;) {


if (check.indexOf("Mon AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.create({
      Assignments: assignments[i],

      DaysAssigned: "Mon AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Mon AM"}
    })
    
    console.log(check.indexOf("Mon AM"));
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Mon AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Mon AM"}})
  }



  if (check.indexOf("Mon PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.create({
      Assignments: assignments[i],

      DaysAssigned: "Mon PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Mon PM"}
    })
    
    console.log(check.indexOf("Mon PM"));
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Mon PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Mon PM"}})
  }



  if (check.indexOf("Tue AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],

      DaysAssigned: "Tue AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Tue AM"}
    })
    
    console.log(check.indexOf("Tue AM"));
   
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Tue AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Tue AM"}})
  }


  if (check.indexOf("Tue PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],

      DaysAssigned: "Tue PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Tue PM"}
    })
    
    console.log(check.indexOf("Tue PM"));

    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Tue PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Tue PM"}})
  }



  if (check.indexOf("Wed AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],

      DaysAssigned: "Wed AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Wed AM"}
    })
    
    console.log(check.indexOf("Wed AM"));
 
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Wed AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Wed AM"}})
  }


  if (check.indexOf("Wed PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
   
      DaysAssigned: "Wed PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Wed PM"}
    })
    
    console.log(check.indexOf("Wed PM"));

    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Wed PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Wed PM"}})
  }


  if (check.indexOf("Thu AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
  
      DaysAssigned: "Thu AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Thu AM"}
    })
    
    console.log(check.indexOf("Thu AM"));
   
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Thu AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Thu AM"}})
  }



  if (check.indexOf("Thu PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
    
      DaysAssigned: "Thu PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Thu PM"}
    })
    
    console.log(check.indexOf("Thu PM"));
  
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Thu PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Thu PM"}})
  }

  if (check.indexOf("Fri AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
  
      DaysAssigned: "Fri AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Fri AM"}
    })
    
    console.log(check.indexOf("Fri AM"));
   
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Fri AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Fri AM"}})
  }


  if (check.indexOf("Fri PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
   
      DaysAssigned: "Fri PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Fri PM"}
    })
    
    console.log(check.indexOf("Fri PM"));
   
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Fri PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Fri PM"}})
  }


  if (check.indexOf("Sat AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
   
      DaysAssigned: "Sat AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Sat AM"}
    })
    
    console.log(check.indexOf("Sat AM"));
   
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Sat AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Sat AM"}})
  }


  if (check.indexOf("Sat PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
    
      DaysAssigned: "Sat PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Sat PM"}
    })
    
    console.log(check.indexOf("Sat PM"));
   
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Sat PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Sat PM"}})
  }


  if (check.indexOf("Sun AM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
      DaysAssigned: "Sun AM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Sun AM"}
    })
    
    console.log(check.indexOf("Sun AM"));
    
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Sun AM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Sun AM"}})
  }



  if (check.indexOf("Sun PM") == 0)
  {
    if (amount > 0)
    {
   
    await Shift_Assignments.upsert({
      Assignments: assignments[i],
      DaysAssigned: "Sun PM",
      min_title: min_title[i]
    },
    {
      where: {DaysAssigned: "Sun PM"}
    })
    
    console.log(check.indexOf("Sun PM"));
    if (assignments.length == null )
  {
    console.log("No job selected, skipping!")}
  
  i++
  }
  
  }
  
  else if (check.indexOf("Sun PM") == -1) {
    await Shift_Assignments.destroy({where:{DaysAssigned: "Sun PM"}})
  }



else if (assignments != null) {
  await Jobs.create({
    job_value: valueCheck(i),
    jobs: assignments,
    min_title: min_title
  })
}
  }
  console.log("erase NULL"+ " "+" "+counter+" "+maxCounter)
   Shift_Assignments.destroy({id: [null]})
}

const employee_list = await Employee.findAll();
const job_list = await Jobs.findAll();
const data = employee_list;
const jobData = job_list;

await controller.assignmentsTable(res).then(info => {

  
    res.render('shiftassignment', {week: info, jobData: jobData, data: data}
    )
})
})






const PORT = process.env.PORT || 43488;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});