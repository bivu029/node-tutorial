const express= require('express');
const  connection= require('./connection');
const app= express();
app.use(express.json());
app.get('/' , (req , res)=>{

    con.query("select * from bus ",(err,result)=>{
        if(err){
            res.send(err)
        }else{
            res.send(result);
        }
    })


});


app.post('/insertAllData', (req, res) => {
    const { busService, busStations, runningDays } = req.body;

    const busServiceSql = `INSERT INTO BusService (bus_name, bus_number, public_transport, start_from, end_stop, start_time, end_time, run_all_days, is_running_today) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const busServiceValues = [
        busService.bus_name,
        busService.bus_number,
        busService.public_transport,
        busService.start_from,
        busService.end_stop,
        busService.start_time,
        busService.end_time,
        busService.run_all_days,
        busService.is_running_today
    ];

    connection.beginTransaction((err) => {
        if (err) throw err;

        connection.query(busServiceSql, busServiceValues, (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).send('Error inserting BusService data');
                    throw err;
                });
            }

            const bus_id = result.insertId; // Retrieve the inserted bus_id

            const busStationsSql = `INSERT INTO BusStations (bus_id, station_name, arrival_time) VALUES ?`;
            const busStationsValues = busStations.map(station => [bus_id, station.station_name, station.arrival_time]);

            const runningDaysSql = `INSERT INTO RunningDays (bus_id, day_of_week) VALUES ?`;
            const runningDaysValues = runningDays.map(day => [bus_id, day.day_of_week]);

            connection.query(busStationsSql, [busStationsValues], (err, result) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).send('Error inserting BusStations data');
                        throw err;
                    });
                }

                connection.query(runningDaysSql, [runningDaysValues], (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error inserting RunningDays data');
                            throw err;
                        });
                    }

                    connection.commit((err) => {
                        if (err) {
                            return connection.rollback(() => {
                                res.status(500).send('Transaction commit error');
                                throw err;
                            });
                        }

                        res.status(200).send('Data inserted into all tables');
                    });
                });
            });
        });
    });
});

app.put('/updateAllData/:bus_id', (req, res) => {
    const bus_id = req.params.bus_id;
    const { busService, busStations, runningDays } = req.body;

    const updateBusServiceQuery = `UPDATE BusService 
                                   SET bus_name = ?, bus_number = ?, public_transport = ?, start_from = ?, end_stop = ?, start_time = ?, end_time = ?, run_all_days = ?, is_running_today = ?
                                   WHERE bus_id = ?`;

    const busServiceValues = [
        busService.bus_name,
        busService.bus_number,
        busService.public_transport,
        busService.start_from,
        busService.end_stop,
        busService.start_time,
        busService.end_time,
        busService.run_all_days,
        busService.is_running_today,
        bus_id
    ];

    connection.beginTransaction((err) => {
        if (err) throw err;

        connection.query(updateBusServiceQuery, busServiceValues, (err, result) => {
            if (err) {
                return connection.rollback(() => {
                    res.status(500).send('Error updating BusService data');
                    throw err;
                });
            }

            busStations.forEach(station => {
                const updateBusStationsQuery = `UPDATE BusStations 
                                               SET station_name = ?, arrival_time = ?
                                               WHERE station_id = ?`;

                const stationValues = [
                    station.station_name,
                    station.arrival_time,
                    station.station_id
                ];

                connection.query(updateBusStationsQuery, stationValues, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error updating BusStations data');
                            throw err;
                        });
                    }
                });
            });

            runningDays.forEach(day => {
                const updateRunningDaysQuery = `UPDATE RunningDays 
                                               SET day_of_week = ?
                                               WHERE running_id = ?`;

                const dayValues = [
                    day.day_of_week,
                    day.running_id
                ];

                connection.query(updateRunningDaysQuery, dayValues, (err, result) => {
                    if (err) {
                        return connection.rollback(() => {
                            res.status(500).send('Error updating RunningDays data');
                            throw err;
                        });
                    }
                });
            });

            connection.commit((err) => {
                if (err) {
                    return connection.rollback(() => {
                        res.status(500).send('Transaction commit error');
                        throw err;
                    });
                }

                res.status(200).send('Data updated in all tables');
            });
        });
    });
});


app.get('/busData/:bus_id', (req, res) => {
    const bus_id = req.params.bus_id;

    const getBusServiceQuery = `SELECT * FROM BusService WHERE bus_id = ?`;
    const getBusStationsQuery = `SELECT * FROM BusStations WHERE bus_id = ?`;
    const getRunningDaysQuery = `SELECT * FROM RunningDays WHERE bus_id = ?`;

    connection.query(getBusServiceQuery, bus_id, (err, busServiceResults) => {
        if (err) {
            res.status(500).send('Error fetching BusService data');
            throw err;
        }

        connection.query(getBusStationsQuery, bus_id, (err, busStationsResults) => {
            if (err) {
                res.status(500).send('Error fetching BusStations data');
                throw err;
            }

            connection.query(getRunningDaysQuery, bus_id, (err, runningDaysResults) => {
                if (err) {
                    res.status(500).send('Error fetching RunningDays data');
                    throw err;
                }

                const data = {
                    busService: busServiceResults,
                    busStations: busStationsResults,
                    runningDays: runningDaysResults
                };

                res.status(200).json(data);
            });
        });
    });
});



app.get('/allBusData', (req, res) => {
    const query = `SELECT * FROM BusService;`;

    connection.query(query, (err, busServiceResults) => {
        if (err) {
            res.status(500).send('Error fetching BusService data');
            throw err;
        }

        const data = [];

        busServiceResults.forEach(bus => {
            const busData = {
                busService: bus,
                busStations: [],
                runningDays: []
            };

            const stationQuery = `SELECT * FROM BusStations WHERE bus_id = ?`;
            const runningDaysQuery = `SELECT * FROM RunningDays WHERE bus_id = ?`;

            connection.query(stationQuery, bus.bus_id, (err, stationResults) => {
                if (err) {
                    res.status(500).send('Error fetching BusStations data');
                    throw err;
                }
                busData.busStations = stationResults;

                connection.query(runningDaysQuery, bus.bus_id, (err, runningDaysResults) => {
                    if (err) {
                        res.status(500).send('Error fetching RunningDays data');
                        throw err;
                    }
                    busData.runningDays = runningDaysResults;

                    data.push(busData);

                    if (data.length === busServiceResults.length) {
                        res.status(200).json(data);
                    }
                });
            });
        });
    });
});


app.delete('/deleteBusData/:bus_id', (req, res) => {
    const bus_id = req.params.bus_id;

    const deleteRunningDaysQuery = `DELETE FROM RunningDays WHERE bus_id = ?`;
    const deleteBusStationsQuery = `DELETE FROM BusStations WHERE bus_id = ?`;
    const deleteBusServiceQuery = `DELETE FROM BusService WHERE bus_id = ?`;

    connection.query(deleteRunningDaysQuery, bus_id, (err, runningDaysResults) => {
        if (err) {
            res.status(500).send('Error deleting RunningDays data');
            throw err;
        }

        connection.query(deleteBusStationsQuery, bus_id, (err, busStationsResults) => {
            if (err) {
                res.status(500).send('Error deleting BusStations data');
                throw err;
            }

            connection.query(deleteBusServiceQuery, bus_id, (err, busServiceResults) => {
                if (err) {
                    res.status(500).send('Error deleting BusService data');
                    throw err;
                }

                res.status(200).send(`Data related to bus_id ${bus_id} deleted successfully`);
            });
        });
    });
});

app.listen(3000);