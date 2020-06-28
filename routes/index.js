const express = require("express");
const router = express.Router();
const {nodemailer,agenda } = require( '../middlewares/config' )


//@route POST /api/schedule/createjob
//@desc  Create Items
//@ccess  Public
router.post( '/createjob', ( req, res ) => {
    const { time,emailSubject,recievingEmail, message, nameOfJob } = req.body;
    // console.log(nameOfJob)
    // createJob({minute: "1 minutes", name: "Texting"})
    if ( !time || !emailSubject || !recievingEmail || !message || !nameOfJob ) {
        res.json('Please Enter all Fields')
    } else {
        agenda.define( nameOfJob, () => {
            var transporter = nodemailer.createTransport( {
                service: 'gmail.com',
                // port: 25,
                // secure: false,
                auth: {
                    user: process.env.GMAIL_USERNAME,
                    pass: process.env.GMAIL_PASSWORD
                },
                // tls: {
                //     rejectUnauthorized: false
                // }
            } );
            
            var mailOptions = {
                from: process.env.GMAIL_USERNAME,
                to: recievingEmail,
                subject: emailSubject,
                html: message
            };
    
            transporter.sendMail( mailOptions, ( err, info ) => {
                if ( err ) {
                    console.log( err )
                } else {
                    console.log( info )
                }
            } )
           
        } );
        const email = agenda.create( nameOfJob )
        // console.log(nameOfJob)
        agenda.start()
            .then( () => {
                email.repeatEvery( `* * * ${ time } * *` ).save()
                res.json('Task Scheduled')
            } )
        .catch(err=> res.json(err))
       
    }
    

})

//@route GET /api/schedule/getAll
//@desc  get all Schedules
//@ccess  Public

router.get( '/getAll', ( req, res ) => {
    agenda.start().then( () => {
        agenda.jobs()
            .then( data => {
               res.json(data)
            } )
            .catch( err => console.log( err ) )
    } ).catch( err => console.log( err ) )
} )

//@route PUT /api/schedule/update
//@desc  update Schedule
//@ccess  Public
router.put( '/update', ( req, res ) => {
    const { nameOfJob, priority } = req.body
    if ( !nameOfJob || !priority) {
        res.json('Enter all Field')
    } else {
        agenda.start().then( () => {
            agenda.jobs( { name: nameOfJob } )
                .then( ( res ) => {
                    res.map( (Job )=> {
                        // console.log( Job.attrs )
                        Job.attrs.priority = priority
                        Job.save()
    
                    })
                } )
                .then(()=> res.json(`${nameOfJob} updated`))
                .catch( err => res.json(err) )
        } ).catch( err => res.json(err) )
    }
} )

//@route DELETE /api/schedule/delete
//@desc  delete Schedule
//@ccess  Public

router.delete( '/delete', ( req, res ) => {
    const { nameOfJob, } = req.body;
    if ( !nameOfJob ) {
        res.json("Please Enter Name of Task")
    } else {
        agenda.start().then( () => {
            agenda.cancel( { name: nameOfJob } )
                .then( () =>res.json(`${nameOfJob} deleted`) )
                .catch( err => console.log( err ) )
        } ).catch( err => console.log( err ) )
    }
})
module.exports = router;
