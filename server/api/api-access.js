/*
 * Authors: James Hawes, Jamie Garner, Joseph Ising, Mark Dodson
 * -----
 * Created Date: Fri Dec 24 2021
 * -----
 * Last Modified: Sat Jan 22 2022
 */

const axios = require('axios')
const API_VERSION = '0.9'

/** @module api-access */


/**
 * RETURNS API KEY
 * @function getAPIKey
 * @description Creates a post request to Nuline's server in accordance with provided API instructions. 
 * @returns {string} API key in order to create a session
 * @example
 * export function getAPIKey() {
    axios
        .post('http://rest.nulinecharter.com.au:7920', {
            'Request': 'Login',
            'Username': process.env.APIUSERNAME,
            'Password': process.env.APIPASSWORD,
            'API': API_VERSION
        })
        .then(res => {
            console.log(res.Login)
            console.log(res.APIInUse)
            console.log(res.LatestAPIAvailable)
            console.log(res.SessionKey)
            return res.SessionKey
        })
        .catch(error => {
            console.log("This is the command we sent: ", error.Error)
            console.log("We received no session key")
            console.log("This is the reason for the error: ", error.Reason)
        })
}
 * 
 */
export function getAPIKey() {
    axios
        .post('http://rest.nulinecharter.com.au:7920', {
            'Request': 'Login',
            'Username': process.env.APIUSERNAME,
            'Password': process.env.APIPASSWORD,
            'API': API_VERSION
        })
        .then(res => {
            console.log(res.Login)
            console.log(res.APIInUse)
            console.log(res.LatestAPIAvailable)
            console.log(res.SessionKey)
            return res.SessionKey
        })
        .catch(error => {
            console.log("This is the command we sent: ", error.Error)
            console.log("We received no session key")
            console.log("This is the reason for the error: ", error.Reason)
        })
}




/**
 * @function getGPSVehicles
 * @description RETURNS BUS ID, BUS NAME, BUS REGO OF EACH BUS MAY NEED MULTIPLE CALLS IF RETURNED DATA IS TOO BIG
 * @param {string} apikey Fetched ApiKey
 * @returns {array} 
 */
export function getGPSVehicles(apikey) {
    axios
        .post('http://rest.nulinecharter.com.au:7920', {
            'SessionKey': apikey,
            'Request': 'GetGPSVehicles'
        })
        .then(res => {
            console.log("We sent the ", res.Response, " request")
            console.log("We used this key: ", res.SessionKey)
            console.log("If this is not empty there is more data: [", res.NextRequestData, "]")
            console.log("We received this vehicle data: \n", res.Vehicles)
            return res.Vehicles
        })
        .error(err => {
            console.log("We received an error for the GetGPSVehicles request")
            onsole.log("This is the error response: \n", err)
        })
}



/**
 * RETURNS API KEY
 * @function getGPSLocationHistory
 * @param {string} apiKey Key retrieved with getApiKey call
 * @param {number} vehicleid Unique identifier for a vehicle
 * @param {date} startdatetime Timestamp representing start time
 * @param {date} enddatetime Timestamp representing end time
 * @description RETURNS LOCATION HISTORY FOR A GIVEN BUS ID, START AND END DATETIMES FORMAT: yyyy-MM-ddThh:mm:ss 
 * @returns {array} GPS location history 
 * @example
 * 
 * const startdatetime = new Date(2021, 11, 25); // 25th December 2021
 * const enddatetime = new Date(2021, 11, 26); // 26th December 2021
 * 
 * const vehicleHistory = getGPSLocationHistory('asldffk2q44324laiejfdkt398df', 101, startdatetime, enddatetime);
 *
 * 
 */
export function getGPSLocationHistory(apikey,vehicleid,startdatetime,enddatetime) {
    axios
        .post('http://rest.nulinecharter.com.au:7920', {
            'SessionKey': apikey,
            'Request': 'GetGPSLocationHistory',
            'VehicleID': vehicleid,
            'PeriodStart': startdatetime,
            'PeriodEnd': enddatetime
        })
        .then(res => {
            console.log("We sent the ", res.Response, " request")
            console.log("We used this key: ", res.SessionKey)
            console.log("If this is not empty there is more data: [", res.NextResponseData, "]")
            console.log("This is the ID of the request: ", res.ID)
            console.log("We received this data: \n", res.Data)
            return res.Data
        })
        .error(err => {
            console.log("We received an error for the GetGPSLocationHistory request")
            console.log("This is the error response: ", err)
        })
}




/**
 * @function getCurrentGPSSnapshot
 * @description RETURNS THE SNAPSHOT OF CURRENT GPS LOCATIONS (10 MINUTE INTERVALS)
 * @param {string} apikey ApiKey
 * @returns {Object} 
 */
export function getCurrentGPSSnapshot(apikey) {
    axios
        .post('http://rest.nulinecharter.com.au:7920', {
            'SessionKey': apikey,
            'Request': 'GetCurrentGPSSnapshot'
        })
        .then(res => {
            console.log("We sent the ", res.Response, " request")
            console.log("We used the ", res.SessionKey, " key")
            console.log("If this is not empty there is more data: [", res.NextRequestData, "]")
            console.log("This is the data:", res.Data)
            return res.Data
        })
        .error(err => {
            console.log("GetCurrentGPSSnapshot response error:")
            console.log("We received this error:", err)
        })
}

/**
 * @function getScheduledVehicles
 * @description RETURNS THE CURRENT SCHEDULE (LIST OF BUSSES CURRENTLY ASSIGNED TO THE SCHEDULE)
 * @param {string} apikey ApiKey
 * @returns {Object} 
 */
export function getScheduledVehicles(apikey) {
    axios
        .post('http://rest.nulinecharter.com.au:7920', {
            "SessionKey": apikey,
            "Request": "GetScheduledVehicles"
        })
        .then(res => {
            console.log("We send this response: ", res.Response)
            console.log("We used this key: ", res.SessionKey)
            console.log("If this is not blank there is more data:", NextRequestData)
            console.log("We received this data:", res.Vehicles)
            return res.Vehicles
        })
        .error(err => {
            console.log("We received an error from the GetScheduledVehicles request")
            console.log("This is the error:", err)
        })
}

/**
 * @function getScheduledActivity
 * @description RETURNS THE SCHEDULE ACTIVITY (COMPLETE LIST OF LOCATIONAL DATA, START/END DESTINATION COORDS+DESCRIPTIONS)
//FOR A GIVEN DAY (yyyy-MM-dd)
 * @param {string} apikey ApiKey
 * @param {date} date 
 * @returns {Object} 
 */
export function getScheduledActivity(apikey,date) {
    return axios
        .post('http://rest.nulinecharter.com.au:7920', {
            'SessionKey': apikey,
            'Request': 'GetScheduledActivity',
            'Day': date
        })
        .then(res => {
            console.log("This was our request:", res.Response)
            console.log("This was the key we used:", res.SessionKey)
            console.log("If this is not blank there is more data:", res.NextRequestData)
            console.log("This is the data received:", res.Data)
            return res.Data
        })
        .error(err => {
            console.log("We received an error from the GetScheduledActivity")
            console.log("This is the error", err)
        })
}