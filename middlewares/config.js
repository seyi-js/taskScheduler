const Agenda = require( 'agenda' );
var nodemailer = require( "nodemailer" );

const connectionString = 'mongodb://127.0.0.1/agendaDB';

const agenda = new Agenda( {
    db: { address: connectionString, collection: 'schedules' },
    processEvery: '5 seconds',lockLimit: 0
} );

//Create New Job
const createJob = ( { name, }) => {
    agenda.define( name, (  ) => {
       console.log("Helllooooo")
    } )
    const run = agenda.create( name )
    agenda.start()
        .then( () => {
            // console.log( run )
        //  let   data = console.log('Nammmmm')
            run.repeatEvery( '0 6 * * *').save()
            // run.save()
        } )
}




//DeleteAll Shedules
const deleteAll = () => {
    agenda.start().then( () => {
        agenda.purge()
            .then( () => console.log( 'Deleted' ) )
            .catch( err => console.log( err ) )
    } ).catch( err => console.log( err ) )

}




module.exports= {nodemailer,createJob, agenda}