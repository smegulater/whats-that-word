const { ToadScheduler, SimpleIntervalJob, AsyncTask } = require('toad-scheduler')

const scheduler = new ToadScheduler()

const task = new AsyncTask(
    'simple task', 
    () => { return db.pollForSomeData().then((result) => { /* continue the promise chain */ }) },
    (err) => { /* handle error here */ }
)
const job = new SimpleIntervalJob({ seconds: 20, }, task)

scheduler.addSimpleIntervalJob(job)

// when stopping your app
scheduler.stop()





