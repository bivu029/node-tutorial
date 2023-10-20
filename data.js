
const data= {
    busName:'biavs',
    busNumber:30,
    publicTransport:'black',
    startFrom:'',
    allStation:[
        {
        station:"kolkata",
        time:"6:30" , },
        {
            station:"howrah",
            time:"12:30" , },
            {
                station:"beltola",
                time:"11:30" , }

    ],
    endStop:"digha",
    startTime:"6.30",
    endTime:"14:56",
    runAllDays:true,
    isRunningToday:true,
    runningDays: [{sunday:"sunday"},
                  {monday:"monday"},
                 {tuesday:"tuesday"},
                 {wednesday:"wednesday"},
                {thursday:"thursday"},
                {friday:"friday"},
                {"saturday":"saturday"}
   ],
};


module.exports = data;
