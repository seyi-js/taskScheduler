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
	    * scheduled time of 
            - 	"min": 30, (default)(0-59)
            -    "hr":"",(0-23)
            -    "dayofMonth":"",(1-31)
            -    "dayOfWeek": "",(names or 0-7, 0 and 7 are sunday)
            -    "month": ""(1-12 or names)

            if you provide 2 for hr(hours)
                30 for min
                3 for dayOfMonth
            The email will be sent every 2:30am on the 3rd of every month

            To know more about the timing, Visit (Node cron npm page https://www.npmjs.com/package/node-cron).


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