# Task Scheduler

## This is used for scheduling Email newsletters;

### Developed With

* Nodejs
* Agenda
* Nodemailer
* ExpressJs
* MongoDb


#### Functionality

- Schedule emails for Day(n)(1-31) of every month
- Get All schedules
- Update Schedules
- Delete Schedules


### Install and tweak to your satisfaction and also start the repo


#### Available Routes

- POST /api/schedule/createjob
    * it takes an object of 
        * "nameOfJob": "",
	    * "recievingEmail": "",
	    * "message": "",
	    * "emailSubject": "",
	    * "time":, (between 1-31)

- GET /api/schedule/getAll 
    * It returns an array of all scheduled tasks

- PUT /api/schedule/update
    * it takes an object of 
        * "nameOfJob": "",
	    * "priority": (Like i said earlier, you can install and tweak)

- DELETE /api/schedule/delete
    * it takes an object of 
        * "nameOfJob": "",


Happy Hacking :yum: