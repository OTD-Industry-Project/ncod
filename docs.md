## Modules

<dl>
<dt><a href="#module_App">App</a></dt>
<dd></dd>
<dt><a href="#module_Footer">Footer</a></dt>
<dd></dd>
<dt><a href="#module_FooterScrubBar">FooterScrubBar</a></dt>
<dd></dd>
<dt><a href="#module_MediaControls">MediaControls</a></dt>
<dd></dd>
<dt><a href="#module_AlertBtn">AlertBtn</a></dt>
<dd></dd>
<dt><a href="#module_DarkModeToggle">DarkModeToggle</a></dt>
<dd></dd>
<dt><a href="#module_Datetime">Datetime</a></dt>
<dd></dd>
<dt><a href="#module_Header">Header</a></dt>
<dd></dd>
<dt><a href="#module_HistoryToggle">HistoryToggle</a></dt>
<dd></dd>
<dt><a href="#module_Logo">Logo</a></dt>
<dd></dd>
<dt><del><a href="#module_MenuBtn">MenuBtn</a></del></dt>
<dd></dd>
<dt><a href="#module_Loading">Loading</a></dt>
<dd></dd>
<dt><a href="#module_BusIcon">BusIcon</a></dt>
<dd></dd>
<dt><a href="#module_Layers">Layers</a></dt>
<dd></dd>
<dt><a href="#module_MapWrapper">MapWrapper</a></dt>
<dd></dd>
<dt><a href="#module_ColorPicker">ColorPicker</a></dt>
<dd></dd>
<dt><a href="#module_Filter">Filter</a></dt>
<dd></dd>
<dt><a href="#module_InfoCard">InfoCard</a></dt>
<dd></dd>
<dt><a href="#module_MUITable">MUITable</a></dt>
<dd></dd>
<dt><a href="#module_Sidetabs">Sidetabs</a></dt>
<dd></dd>
<dt><a href="#module_Table">Table</a></dt>
<dd></dd>
<dt><a href="#module_Theme">Theme</a></dt>
<dd></dd>
<dt><a href="#module_ScheduleHelper">ScheduleHelper</a></dt>
<dd></dd>
<dt><a href="#module_api-access">api-access</a></dt>
<dd></dd>
<dt><a href="#module_api-calls">api-calls</a></dt>
<dd></dd>
<dt><a href="#module_DataHelper">DataHelper</a></dt>
<dd></dd>
</dl>

## Constants

<dl>
<dt><del><a href="#processedData">processedData</a></del></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#getSchedule">getSchedule(req, res)</a> ⇒ <code>Object</code></dt>
<dd><p>queries database for schedule data and returns to client</p>
</dd>
</dl>

<a name="module_App"></a>

## App

* [App](#module_App)
    * [~CreateRoutes(data, setRoutesArray)](#module_App..CreateRoutes)
    * [~App()](#module_App..App) ⇒
    * [~Hooks(waypoints, availableHistoryDates, data, date, play, historyMode, schedule, activeBus, theme, routesArray, oldRoutesArray, colors)](#module_App..Hooks)
    * [~playCallback(e)](#module_App..playCallback)
    * [~changeDate(newDate)](#module_App..changeDate)
    * [~activeCallBack(job_id)](#module_App..activeCallBack)
    * [~switchTheme()](#module_App..switchTheme)
    * [~changeColors(key, color)](#module_App..changeColors)
    * [~useEffect()](#module_App..useEffect)
    * [~fetchHistory(date)](#module_App..fetchHistory)
    * [~useEffect()](#module_App..useEffect)

<a name="module_App..CreateRoutes"></a>

### App~CreateRoutes(data, setRoutesArray)
**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | Scheduled data that is fetched from database |
| setRoutesArray | <code>callback</code> | Call back function to update state of App |

<a name="module_App..App"></a>

### App~App() ⇒
Entry point for entire application - Is injected into the 'body' DOM element with a class of 'root'.

**Kind**: inner method of [<code>App</code>](#module_App)  
**Returns**: The entire app as JSX<img src="demo.png" >  
**Author**: Mark Dodson  
**Author**: James Hawes  
**Author**: Jamie Garner  
**Author**: Joseph Ising  
<a name="module_App..Hooks"></a>

### App~Hooks(waypoints, availableHistoryDates, data, date, play, historyMode, schedule, activeBus, theme, routesArray, oldRoutesArray, colors)
global state hooks

**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| waypoints | <code>array</code> | array of waypoints in format [lat, long] |
| availableHistoryDates | <code>array</code> | array of Dates |
| data | <code>Object</code> | raw Data fetched from database |
| date | <code>date</code> | global Date |
| play | <code>boolean</code> | True = Play, false = Paused |
| historyMode | <code>boolean</code> | Switch history mode on and off |
| schedule | <code>array</code> | array of objects containing job info |
| activeBus | <code>Object</code> | Single Job object |
| theme | <code>boolean</code> | true = dark, false = light |
| routesArray | <code>array</code> | array of routes |
| oldRoutesArray | <code>array</code> | array of old routes |
| colors | <code>Object</code> | Object containing a color for each status. |

<a name="module_App..playCallback"></a>

### App~playCallback(e)
Callback to switch between play states

**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>boolean</code> | switches between play and pause |

<a name="module_App..changeDate"></a>

### App~changeDate(newDate)
Callback function to set and update global date of app

**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| newDate | <code>date</code> | Use this date to update the global date tracked in the app |

<a name="module_App..activeCallBack"></a>

### App~activeCallBack(job_id)
Callback function to update which bus is being tracked as active

**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| job_id | <code>number</code> | Unique number to identify each job |

<a name="module_App..switchTheme"></a>

### App~switchTheme()
Switches between true and false and sets the new theme to local storage

**Kind**: inner method of [<code>App</code>](#module_App)  
<a name="module_App..changeColors"></a>

### App~changeColors(key, color)
Callback function to update colorscheme of app. New color scheme is set to local storage

**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| key | <code>number</code> | number between 0 and existingColorScheme.length to update correct color |
| color | <code>string</code> | Hex code of new color to be set |

<a name="module_App..useEffect"></a>

### App~useEffect()
Checks if browser has existing theme and color scheme set and loads it up. Otherwise, loads a default theme.

**Kind**: inner method of [<code>App</code>](#module_App)  
<a name="module_App..fetchHistory"></a>

### App~fetchHistory(date)
Takes a date and makes a post request to the server to get relevant history information.

**Kind**: inner method of [<code>App</code>](#module_App)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | Date object |

<a name="module_App..useEffect"></a>

### App~useEffect()
On app load, makes a get request to Express server. Server queries database and responds with raw Scheduled data

**Kind**: inner method of [<code>App</code>](#module_App)  
**Example**  
```js
{
    "job_id": 400,
    "vehicle_id": 93,
    "driver_id": "JOHNSTON",
    "description_of_job": null,
    "pickup_time": "2022-01-13T08:30:00.000Z",
    "pickup_point": "Genazzano College - Group 2",
    "pickup_latitude": "-37.808730",
    "pickup_longitude": "145.056010",
    "destination_time": "2022-01-13T10:20:00.000Z",
    "destination": "Wesley College Glen Waverley Campus",
    "destination_latitude": "-37.875200",
    "destination_longitude": "145.154830",
    "empty_run": null,
    "req_facilities": null,
    "routing_info": null
  }
```
<a name="module_Footer"></a>

## Footer

* [Footer](#module_Footer)
    * [~action](#module_Footer..action) : <code>number</code>
    * [~Footer(props)](#module_Footer..Footer) ⇒ <code>Component</code>
    * [~handleDirectionChange(dir)](#module_Footer..handleDirectionChange)

<a name="module_Footer..action"></a>

### Footer~action : <code>number</code>
Keep track of the direction of the scrub bar. Where -1 = rewind, 1 = fast-forward and 0 = nothing

**Kind**: inner property of [<code>Footer</code>](#module_Footer)  
<a name="module_Footer..Footer"></a>

### Footer~Footer(props) ⇒ <code>Component</code>
Container for Media Controls and Scrub bar

**Kind**: inner method of [<code>Footer</code>](#module_Footer)  
**Returns**: <code>Component</code> - Returns renderable component<img src="footer.png">  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>props</code> | Passes various variables and props further down to child Components |

<a name="module_Footer..handleDirectionChange"></a>

### Footer~handleDirectionChange(dir)
Update the state with the provided number

**Kind**: inner method of [<code>Footer</code>](#module_Footer)  

| Param | Type | Description |
| --- | --- | --- |
| dir | <code>number</code> | Number. either -1, 0 or 1. |

<a name="module_FooterScrubBar"></a>

## FooterScrubBar

* [FooterScrubBar](#module_FooterScrubBar)
    * [~marks](#module_FooterScrubBar..marks)
    * [~value](#module_FooterScrubBar..value)
    * [~padZero(string)](#module_FooterScrubBar..padZero) ⇒ <code>string</code>
    * [~valuetext(value)](#module_FooterScrubBar..valuetext) ⇒ <code>string</code>
    * [~scrubTimer(value)](#module_FooterScrubBar..scrubTimer) ⇒ <code>string</code>
    * [~FooterScrubBar(play, historyMode, action, setDirection)](#module_FooterScrubBar..FooterScrubBar) ⇒ <code>Component</code>
        * [~handleChange(event, newValue)](#module_FooterScrubBar..FooterScrubBar..handleChange)
    * [~getTimeAsMinutes(date)](#module_FooterScrubBar..getTimeAsMinutes)
    * [~useffect()](#module_FooterScrubBar..useffect)

<a name="module_FooterScrubBar..marks"></a>

### FooterScrubBar~marks
Provides markers for the scrub bar, where total minutes (value) is mapped to a time in hours:minutes format (label)

**Kind**: inner property of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  
**Example**  
```js
const marks = [
  {
    value: 120,
    label: '02:00',
  },
  {
    value: 300,
    label: '05:00',
  },
  {
    value: 480,
    label: '08:00',
  },
  {
    value: 660,
    label: '11:00',
  },
  ...
```
<a name="module_FooterScrubBar..value"></a>

### FooterScrubBar~value
Track the state of the value

**Kind**: inner property of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  
<a name="module_FooterScrubBar..padZero"></a>

### FooterScrubBar~padZero(string) ⇒ <code>string</code>
Prepends a time string with a leading zero

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  

| Param | Type | Description |
| --- | --- | --- |
| string | <code>string</code> | The time string that needs to be prepended with a 00 |

<a name="module_FooterScrubBar..valuetext"></a>

### FooterScrubBar~valuetext(value) ⇒ <code>string</code>
Converts a value (time in minutes 0 - 1440) to a time.

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | number between 0 - 1440 ie. Time in minutes |

<a name="module_FooterScrubBar..scrubTimer"></a>

### FooterScrubBar~scrubTimer(value) ⇒ <code>string</code>
scrub bar function to display actual scrub bar
min and max set time for day
step is how often to set points
marks are the labeling of regular intervals

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  
**Returns**: <code>string</code> - formatted time string in 24hour time  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | A time in minutes converted to hh:mm |

**Example**  
```js
scrubTimer(420) // returns 07:00scrubTimer(930) // returns 15:30
```
<a name="module_FooterScrubBar..FooterScrubBar"></a>

### FooterScrubBar~FooterScrubBar(play, historyMode, action, setDirection) ⇒ <code>Component</code>
Tracks state of the Scrub bar and interval and renders it

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  
**Returns**: <code>Component</code> - renderable Component  

| Param | Type | Description |
| --- | --- | --- |
| play | <code>boolean</code> | Boolean to set inner state |
| historyMode | <code>boolean</code> | If true then history mode is active |
| action | <code>number</code> | current Direction of scrub bar |
| setDirection | <code>callback</code> | Callback to set the direction in parent compoenent (Header) |

<a name="module_FooterScrubBar..FooterScrubBar..handleChange"></a>

#### FooterScrubBar~handleChange(event, newValue)
Updates the value state

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar..FooterScrubBar)  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>e</code> |  |
| newValue | <code>number</code> | Value to be set |

<a name="module_FooterScrubBar..getTimeAsMinutes"></a>

### FooterScrubBar~getTimeAsMinutes(date)
Convers a time of the day to minutes

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | Date object |

**Example**  
```js
return (date.getHours() * 60) + date.getMinutes();Thus, 2:30 am:= (2 * 60) + 30= 120 + 30= 150 minutes
```
<a name="module_FooterScrubBar..useffect"></a>

### FooterScrubBar~useffect()
Checks props passed to component and calculates whether the scrub bar should be moving and tells it how to move.

**Kind**: inner method of [<code>FooterScrubBar</code>](#module_FooterScrubBar)  
<a name="module_MediaControls"></a>

## MediaControls

* [MediaControls](#module_MediaControls)
    * [~MediaControls(handleCallback)](#module_MediaControls..MediaControls) ⇒ <code>Component</code>
    * [~setPaused(paused)](#module_MediaControls..setPaused)
    * [~handleChange()](#module_MediaControls..handleChange)

<a name="module_MediaControls..MediaControls"></a>

### MediaControls~MediaControls(handleCallback) ⇒ <code>Component</code>
function for displaying mnedia controls practically deprecated at the moment as media buttons are actually called in "HistoryToggle.js"

**Kind**: inner method of [<code>MediaControls</code>](#module_MediaControls)  
**Returns**: <code>Component</code> - Renderable component        <img src="media-controls.png">  

| Param | Type | Description |
| --- | --- | --- |
| handleCallback | <code>callback</code> | Callback function to track state of play |

<a name="module_MediaControls..setPaused"></a>

### MediaControls~setPaused(paused)
Handle state of play and paused

**Kind**: inner method of [<code>MediaControls</code>](#module_MediaControls)  

| Param | Type |
| --- | --- |
| paused | <code>boolean</code> | 

<a name="module_MediaControls..handleChange"></a>

### MediaControls~handleChange()
Extends the onCLick for the play pause buttons

**Kind**: inner method of [<code>MediaControls</code>](#module_MediaControls)  
<a name="module_AlertBtn"></a>

## AlertBtn
<a name="module_AlertBtn..AlertBtn"></a>

### AlertBtn~AlertBtn() ⇒ <code>Component</code>
function for an alert button to display when alerts are available also allow clicking and displaying of said alerts

**Kind**: inner method of [<code>AlertBtn</code>](#module_AlertBtn)  
**Returns**: <code>Component</code> - Dom Element with Alers  
<a name="module_DarkModeToggle"></a>

## DarkModeToggle

* [DarkModeToggle](#module_DarkModeToggle)
    * [~DarkModeToggle(switchTheme, theme)](#module_DarkModeToggle..DarkModeToggle) ⇒ <code>Component</code>
    * [~handleChange()](#module_DarkModeToggle..handleChange)

<a name="module_DarkModeToggle..DarkModeToggle"></a>

### DarkModeToggle~DarkModeToggle(switchTheme, theme) ⇒ <code>Component</code>
**Kind**: inner method of [<code>DarkModeToggle</code>](#module_DarkModeToggle)  
**Returns**: <code>Component</code> - A toggle  
**Funtion**: A toggle that animates on toggle, and sets state theme with a callback  

| Param | Type | Description |
| --- | --- | --- |
| switchTheme | <code>callback</code> | Callback function to switch theme |
| theme | <code>boolean</code> | Sets inner state according to this. |

<a name="module_DarkModeToggle..handleChange"></a>

### DarkModeToggle~handleChange()
Extends the onChange method provided by react

**Kind**: inner method of [<code>DarkModeToggle</code>](#module_DarkModeToggle)  
<a name="module_Datetime"></a>

## Datetime

* [Datetime](#module_Datetime)
    * [~isSameDay(d1, d2)](#module_Datetime..isSameDay) ⇒ <code>boolean</code>
    * [~Datetime(date)](#module_Datetime..Datetime) ⇒ <code>Component</code>

<a name="module_Datetime..isSameDay"></a>

### Datetime~isSameDay(d1, d2) ⇒ <code>boolean</code>
Takes two Date objects returns true if they are same day (time of day is irrevelant).

**Kind**: inner method of [<code>Datetime</code>](#module_Datetime)  
**Returns**: <code>boolean</code> - If dates are same: True. Otherwise false.  

| Param | Type | Description |
| --- | --- | --- |
| d1 | <code>date</code> | First Date |
| d2 | <code>date</code> | Second Date |

<a name="module_Datetime..Datetime"></a>

### Datetime~Datetime(date) ⇒ <code>Component</code>
Component that keeps track of live time.

**Kind**: inner method of [<code>Datetime</code>](#module_Datetime)  
**Returns**: <code>Component</code> - Renderable component  

| Param | Type | Description |
| --- | --- | --- |
| date | <code>date</code> | Inner state is set with this |

<a name="module_Header"></a>

## Header
<a name="module_Header..Header"></a>

### Header~Header(props)
Main Header script for header component, design to give a top AppBar return an appbar with toolbar, with divs with responsive resizing each div calls another script to be placed inside the initial div

**Kind**: inner method of [<code>Header</code>](#module_Header)  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>props</code> | Various variables and callbacks that are further passed down to the children Components |

**Example**  
```js
<AppBar className="Header">
        <Toolbar>
            <div className="col-8 col-sm-1 col-md-1 col-lg-1 col-xl-1">
                    <Logo theme={this.props.theme} />
            </div>
            <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-2" align="center">
                <Datetime date={this.props.date}/>
            </div>
            <div className="d-none d-sm-block col-sm-2 col-md-2 col-lg-2 col-xl-7">
                <HistoryToggle changeDate={this.props.changeDate} availableHistoryDates={this.props.availableHistoryDates}/>
            </div>
            <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                <AlertBtn />
            </div>
            <div className="d-none d-sm-none d-md-none d-lg-block col-lg-1 col-xl-1">
                <DarkModeToggle theme={this.props.theme} switchTheme={this.props.switchTheme} />
            </div>
            
        </Toolbar>
    </AppBar>
```
<a name="module_HistoryToggle"></a>

## HistoryToggle

* [HistoryToggle](#module_HistoryToggle)
    * [~HistoryToggle(changeDate, availableHistoryDates)](#module_HistoryToggle..HistoryToggle) ⇒ <code>Component</code>
    * [~state_hooks(startDate, checked)](#module_HistoryToggle..state_hooks)
    * [~handleChange(nextChecked)](#module_HistoryToggle..handleChange)
    * [~onTrigger(d, reset)](#module_HistoryToggle..onTrigger)

<a name="module_HistoryToggle..HistoryToggle"></a>

### HistoryToggle~HistoryToggle(changeDate, availableHistoryDates) ⇒ <code>Component</code>
When toggled, datepicker is displayed. If date is changed, sets Global date of App.

**Kind**: inner method of [<code>HistoryToggle</code>](#module_HistoryToggle)  
**Returns**: <code>Component</code> - Renderable component  

| Param | Type | Description |
| --- | --- | --- |
| changeDate | <code>callback</code> | Callback that sets the the global state of App. |
| availableHistoryDates | <code>array</code> | Array of dates used to populate the calendar. |

<a name="module_HistoryToggle..state_hooks"></a>

### HistoryToggle~state\_hooks(startDate, checked)
Inner state variables

**Kind**: inner method of [<code>HistoryToggle</code>](#module_HistoryToggle)  

| Param | Type | Description |
| --- | --- | --- |
| startDate | <code>date</code> | Date that the datepicker defaults to |
| checked | <code>boolean</code> | Track state of toggle |

<a name="module_HistoryToggle..handleChange"></a>

### HistoryToggle~handleChange(nextChecked)
The logic behind the toggle.

**Kind**: inner method of [<code>HistoryToggle</code>](#module_HistoryToggle)  

| Param | Type | Description |
| --- | --- | --- |
| nextChecked | <code>boolean</code> | Boolean value that is used to set state. |

<a name="module_HistoryToggle..onTrigger"></a>

### HistoryToggle~onTrigger(d, reset)
Event handling. When toggleState changes, this fires.

**Kind**: inner method of [<code>HistoryToggle</code>](#module_HistoryToggle)  

| Param | Type | Description |
| --- | --- | --- |
| d | <code>date</code> | New Date to set |
| reset | <code>boolean</code> | Flag. If true, date should be reset back to current day. |

<a name="module_Logo"></a>

## Logo
<a name="module_Logo..Logo"></a>

### Logo~Logo(theme) ⇒ <code>Component</code>
Render the Logo

**Kind**: inner method of [<code>Logo</code>](#module_Logo)  
**Returns**: <code>Component</code> - Renderable Logo component<img src="logo.png" >  

| Param | Type | Description |
| --- | --- | --- |
| theme | <code>boolean</code> | Conditionally render the logo based on theme. |

<a name="module_MenuBtn"></a>

## ~~MenuBtn~~
***Deprecated***

<a name="module_MenuBtn..MenuBtn"></a>

### ~~MenuBtn~MenuBtn() ⇒ <code>Component</code>~~
***Deprecated***

**Kind**: inner method of [<code>MenuBtn</code>](#module_MenuBtn)  
**Returns**: <code>Component</code> - Hamburger Menu icon  
<a name="module_Loading"></a>

## Loading
<a name="module_Loading..Loading"></a>

### Loading~Loading([center]) ⇒ <code>Icon</code>
A loading icon that adds suspense

**Kind**: inner method of [<code>Loading</code>](#module_Loading)  
**Returns**: <code>Icon</code> - Loading icon that spins  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [center] | <code>boolean</code> | <code>false</code> | Optional field to alter styling and center icon |

<a name="module_BusIcon"></a>

## BusIcon

* [BusIcon](#module_BusIcon)
    * [~Schedule](#module_BusIcon..Schedule)
    * [~BusIcon(props)](#module_BusIcon..BusIcon) ⇒ <code>Component</code>

<a name="module_BusIcon..Schedule"></a>

### BusIcon~Schedule
Building the icons with a name and color.

**Kind**: inner property of [<code>BusIcon</code>](#module_BusIcon)  
**Example**  
```js
var schedule = null;
    var name = "";
    var busColor;
    switch (props.type) {
        // ADD IN A COLOUR
        case "predeparted":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Pre Departed"
            );
            busColor = props.colors.predeparted;
            name = "predeparted";
            break;
        case "ontime":
            schedule = props.schedule.filter(
                (buses) => buses.status === "On Time"
            );
            busColor = props.colors.ontime;
            name = "ontime";
            break;
        case "delayed":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Delayed"
            );
            busColor = props.colors.delayed;
            name = "delayed";
            break;
        case "completed":
            schedule = props.schedule.filter(
                (buses) => buses.status === "Completed"
            );
            busColor = props.colors.completed;
            name = "completed";
            break;
        default:
            schedule = props.schedule.filter(
                (buses) => buses.status === "Pre Departed"
            );
            busColor = props.colors.predeparted;
            name = "predeparted";
    }
```
<a name="module_BusIcon..BusIcon"></a>

### BusIcon~BusIcon(props) ⇒ <code>Component</code>
Each entry in the schedule is mapped to a BusIcon

**Kind**: inner method of [<code>BusIcon</code>](#module_BusIcon)  
**Returns**: <code>Component</code> - Renderable Component<img src="bus-icon.png" >  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>props</code> | Various Objects and variables used to setup each Bus Icon |

<a name="module_Layers"></a>

## Layers

* [Layers](#module_Layers)
    * [~Layers(schedule, activeBus, colors, waypoints, routesArray, oldRoutesArray, time, tracking)](#module_Layers..Layers)
    * [~setPosition(position)](#module_Layers..setPosition)
    * [~MyMarker(props)](#module_Layers..MyMarker) ⇒ <code>Component</code>

<a name="module_Layers..Layers"></a>

### Layers~Layers(schedule, activeBus, colors, waypoints, routesArray, oldRoutesArray, time, tracking)
**Kind**: inner method of [<code>Layers</code>](#module_Layers)  

| Param | Type | Description |
| --- | --- | --- |
| schedule | <code>Object</code> | Raw schedule data - JSON object |
| activeBus | <code>Object</code> | A single entry from schedule data w/ a status attached |
| colors | <code>Object</code> | Global color scheme that is used for layers |
| waypoints | <code>array</code> | Array of lat, long coords |
| routesArray | <code>array</code> | Array of routes |
| oldRoutesArray | <code>array</code> | Array of old routes |
| time | <code>date</code> | Current time selected by Scrub bar |
| tracking | <code>array</code> | Array of tracking objects. |

<a name="module_Layers..setPosition"></a>

### Layers~setPosition(position)
Track position state

**Kind**: inner method of [<code>Layers</code>](#module_Layers)  

| Param | Type | Description |
| --- | --- | --- |
| position | <code>array</code> | Array of lat long coords |

**Example**  
```js
const position = [144.040383, -37.405732]
```
<a name="module_Layers..MyMarker"></a>

### Layers~MyMarker(props) ⇒ <code>Component</code>
Access active bus Marker to force open Popup on selection

**Kind**: inner method of [<code>Layers</code>](#module_Layers)  
**Returns**: <code>Component</code> - A leaflet Marker component  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>props</code> | Props required to build the marker |

<a name="module_MapWrapper"></a>

## MapWrapper

* [MapWrapper](#module_MapWrapper)
    * [~defaultPosition](#module_MapWrapper..defaultPosition) : <code>Object</code>
    * [~MapWrapper(props)](#module_MapWrapper..MapWrapper) ⇒

<a name="module_MapWrapper..defaultPosition"></a>

### MapWrapper~defaultPosition : <code>Object</code>
Default Position map is centered about

**Kind**: inner property of [<code>MapWrapper</code>](#module_MapWrapper)  
**Example**  
```js
const defaultPosition = { lat: -37.813629, lng: 144.963058 };
```
<a name="module_MapWrapper..MapWrapper"></a>

### MapWrapper~MapWrapper(props) ⇒
Component that wraps the Map, Layers and Event handling

**Kind**: inner method of [<code>MapWrapper</code>](#module_MapWrapper)  
**Returns**: Component  

| Param | Description |
| --- | --- |
| props | Destructure into schedule, activeBus, waypoints, Routes and callbacks |

<a name="module_ColorPicker"></a>

## ColorPicker
<a name="module_ColorPicker..ColorPicker"></a>

### ColorPicker~ColorPicker(k, color, changeColors) ⇒ <code>Component</code>
**Kind**: inner method of [<code>ColorPicker</code>](#module_ColorPicker)  
**Returns**: <code>Component</code> - A color Picker containing 8 predefined colors.4 seperate color pickers being rendered:<img src="color-picker.png" >  

| Param | Type | Description |
| --- | --- | --- |
| k | <code>number</code> | Unique key to identify which color picker this is. Allows multiple to be rendered. |
| color | <code>string</code> | Hex code for current selected color |
| changeColors | <code>callback</code> | Callback to update global color scheme |

<a name="module_Filter"></a>

## Filter
<a name="module_Filter..Filter"></a>

### Filter~Filter(filter, setFilter) ⇒ <code>Component</code>
Return a simple input field. Updates the filter prop with every key typed

**Kind**: inner method of [<code>Filter</code>](#module_Filter)  
**Returns**: <code>Component</code> - A search bar<img src="search-bar.png" >  

| Param | Type | Description |
| --- | --- | --- |
| filter | <code>string</code> | The value after being filtered |
| setFilter | <code>callback</code> | Sets the value in the parent method |

<a name="module_InfoCard"></a>

## InfoCard

* [InfoCard](#module_InfoCard)
    * [~getRuntime(pickup, dest)](#module_InfoCard..getRuntime) ⇒ <code>number</code>
    * [~InfoCard(info, colors)](#module_InfoCard..InfoCard) ⇒ <code>Component</code>

<a name="module_InfoCard..getRuntime"></a>

### InfoCard~getRuntime(pickup, dest) ⇒ <code>number</code>
Takes two dates and returns the difference in minutes

**Kind**: inner method of [<code>InfoCard</code>](#module_InfoCard)  
**Returns**: <code>number</code> - Minutes between two dates  

| Param | Type | Description |
| --- | --- | --- |
| pickup | <code>date</code> | Pickup datetime |
| dest | <code>date</code> | Destination datetime |

<a name="module_InfoCard..InfoCard"></a>

### InfoCard~InfoCard(info, colors) ⇒ <code>Component</code>
Takes a json data as info and outputs to a component with styling and tabularized data.

**Kind**: inner method of [<code>InfoCard</code>](#module_InfoCard)  
**Returns**: <code>Component</code> - Information with table and styled display  

| Param | Type | Description |
| --- | --- | --- |
| info | <code>Object</code> | Schedule information |
| colors | <code>string</code> | Hex codes to style with |

<a name="module_MUITable"></a>

## MUITable

* [MUITable](#module_MUITable)
    * [~MUITable(props)](#module_MUITable..MUITable) ⇒ <code>Component</code>
    * [~handleEvent(i)](#module_MUITable..handleEvent)

<a name="module_MUITable..MUITable"></a>

### MUITable~MUITable(props) ⇒ <code>Component</code>
Extends external MuiDatables package

**Kind**: inner method of [<code>MUITable</code>](#module_MUITable)  
**Returns**: <code>Component</code> - Component containing interactive table with styling and additional features  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>props</code> |  |
| state.selectedRow | <code>number</code> | Track state of table rows |

<a name="module_MUITable..handleEvent"></a>

### MUITable~handleEvent(i)
Sets selected row into the class's state

**Kind**: inner method of [<code>MUITable</code>](#module_MUITable)  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | Index of selected row |

<a name="module_Sidetabs"></a>

## Sidetabs

* [Sidetabs](#module_Sidetabs)
    * [~Sidetabs(props)](#module_Sidetabs..Sidetabs) ⇒ <code>Component</code>
    * [~setOpenTab(openTab)](#module_Sidetabs..setOpenTab)
    * [~onClose()](#module_Sidetabs..onClose)
    * [~onOpen()](#module_Sidetabs..onOpen)

<a name="module_Sidetabs..Sidetabs"></a>

### Sidetabs~Sidetabs(props) ⇒ <code>Component</code>
Extends the react-leaflet-sidetabs package

**Kind**: inner method of [<code>Sidetabs</code>](#module_Sidetabs)  
**Returns**: <code>Component</code> - Floating sidebar  

| Param | Type | Description |
| --- | --- | --- |
| props | <code>props</code> | Various components and variables |

<a name="module_Sidetabs..setOpenTab"></a>

### Sidetabs~setOpenTab(openTab)
Track state of which tab is open

**Kind**: inner method of [<code>Sidetabs</code>](#module_Sidetabs)  

| Param | Type | Description |
| --- | --- | --- |
| openTab | <code>string</code> | String that represents an internal route to each tab |

<a name="module_Sidetabs..onClose"></a>

### Sidetabs~onClose()
Event listener that updates state of tabs

**Kind**: inner method of [<code>Sidetabs</code>](#module_Sidetabs)  
<a name="module_Sidetabs..onOpen"></a>

### Sidetabs~onOpen()
Event listener that updates state of tabs

**Kind**: inner method of [<code>Sidetabs</code>](#module_Sidetabs)  
<a name="module_Table"></a>

## Table

* [Table](#module_Table)
    * [~getTime(value)](#module_Table..getTime) ⇒ <code>Component</code>
    * [~Table(schedule, activeCallBack, activeBus)](#module_Table..Table) ⇒ <code>Component</code>
    * [~handleEvent(row, i)](#module_Table..handleEvent)

<a name="module_Table..getTime"></a>

### Table~getTime(value) ⇒ <code>Component</code>
**Kind**: inner method of [<code>Table</code>](#module_Table)  
**Returns**: <code>Component</code> - Stringified local time in 24 hour format  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>date</code> | Datetime object |

<a name="module_Table..Table"></a>

### Table~Table(schedule, activeCallBack, activeBus) ⇒ <code>Component</code>
**Kind**: inner method of [<code>Table</code>](#module_Table)  
**Returns**: <code>Component</code> - A functional table with styling and sort/search features  

| Param | Type | Description |
| --- | --- | --- |
| schedule | <code>Object</code> | Raw schedule data |
| activeCallBack | <code>callback</code> | Update state of activeBus in parent component |
| activeBus | <code>Object</code> | An entry from the schedule that represents on vehicle |

<a name="module_Table..handleEvent"></a>

### Table~handleEvent(row, i)
Essentially an event handler that sets the activeBus of the row that is selected.

**Kind**: inner method of [<code>Table</code>](#module_Table)  

| Param | Type | Description |
| --- | --- | --- |
| row | <code>Object</code> | Object containing schedule data from a particular entry |
| i | <code>number</code> | Index of row in Schedule |

<a name="module_Theme"></a>

## Theme

* [Theme](#module_Theme)
    * [~lightTheme](#module_Theme..lightTheme)
    * [~darkTheme](#module_Theme..darkTheme)
    * [~GlobalStyle()](#module_Theme..GlobalStyle)

<a name="module_Theme..lightTheme"></a>

### Theme~lightTheme
All the properties and colors that make up the styling for the light theme<img src="light-theme.png">

**Kind**: inner constant of [<code>Theme</code>](#module_Theme)  
**Example**  
```js
export const lightTheme = {
    appBar: '#0074d9',
    scrubBar: '#1976d2',
    warning: 'rgb(255, 244, 229)',
    info: 'rgb(229, 246, 253)',
    error: 'rgb(253, 237, 237)',
    success: 'rgb(237, 247, 237)',
    selectedRow: '#1976d2'
};
```
<a name="module_Theme..darkTheme"></a>

### Theme~darkTheme
All the properties and colors that make up the styling for the dark theme<img src="dark-theme.png">

**Kind**: inner constant of [<code>Theme</code>](#module_Theme)  
**Example**  
```js
export const darkTheme = {
    body: '#2C2F33',
    text: '#FFF',
    background: '#2C2F33',
    appBar: '#23272A',
    icon: 'rgb(133, 184, 88)',
    scrubBar: 'rgb(133, 184, 88)',
    warning: 'rgb(255, 215, 157)',
    info: 'rgb(153, 186, 240)',
    error: 'rgb(247, 186, 186)',
    success: 'rgb(153, 240, 169)',
    mapTiles: 'brightness(0.6) invert(1) contrast(4) hue-rotate(220deg) saturate(0.4) brightness(0.4)',
    selectedRow: 'rgb(133, 184, 88)'
};
```
<a name="module_Theme..GlobalStyle"></a>

### Theme~GlobalStyle()
Mixes Javascript and CSS to create dynamic styling that is cascaded down the heirarchy of components whereby, each child component has access to the context.

**Kind**: inner method of [<code>Theme</code>](#module_Theme)  
<a name="module_ScheduleHelper"></a>

## ScheduleHelper

* [ScheduleHelper](#module_ScheduleHelper)
    * _static_
        * [.calculatedSchedule](#module_ScheduleHelper.calculatedSchedule) ⇒ <code>Object</code>
    * _inner_
        * [~getStatus(bus, currentTime, tracking)](#module_ScheduleHelper..getStatus) ⇒ <code>string</code>

<a name="module_ScheduleHelper.calculatedSchedule"></a>

### ScheduleHelper.calculatedSchedule ⇒ <code>Object</code>
Takes a raw schedule and calculates a status for each bus and returns new schedule

**Kind**: static constant of [<code>ScheduleHelper</code>](#module_ScheduleHelper)  
**Returns**: <code>Object</code> - With an appended status to each bus  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| rawData | <code>Object</code> |  | Raw schedule data |
| time | <code>date</code> |  | Datetime object |
| [tracking] | <code>Object</code> | <code></code> | Optional tracking history information to build an accurate status from. |

<a name="module_ScheduleHelper..getStatus"></a>

### ScheduleHelper~getStatus(bus, currentTime, tracking) ⇒ <code>string</code>
Takes a bus and time and returns an approximate status

**Kind**: inner method of [<code>ScheduleHelper</code>](#module_ScheduleHelper)  
**Returns**: <code>string</code> - The calculated status of the bus  

| Param | Type | Description |
| --- | --- | --- |
| bus | <code>Object</code> | Bus object |
| currentTime | <code>date</code> | Datetime object of current time |
| tracking | <code>Object</code> | Provided tracking history waypoints to fetch accurate status's. Handles null values. |

<a name="module_api-access"></a>

## api-access

* [api-access](#module_api-access)
    * [~getAPIKey()](#module_api-access..getAPIKey) ⇒ <code>string</code>
    * [~getGPSVehicles(apikey)](#module_api-access..getGPSVehicles) ⇒ <code>array</code>
    * [~getGPSLocationHistory(apiKey, vehicleid, startdatetime, enddatetime)](#module_api-access..getGPSLocationHistory) ⇒ <code>array</code>
    * [~getCurrentGPSSnapshot(apikey)](#module_api-access..getCurrentGPSSnapshot) ⇒ <code>Object</code>
    * [~getScheduledVehicles(apikey)](#module_api-access..getScheduledVehicles) ⇒ <code>Object</code>
    * [~getScheduledActivity(apikey, date)](#module_api-access..getScheduledActivity) ⇒ <code>Object</code>

<a name="module_api-access..getAPIKey"></a>

### api-access~getAPIKey() ⇒ <code>string</code>
Creates a post request to Nuline's server in accordance with provided API instructions.

**Kind**: inner method of [<code>api-access</code>](#module_api-access)  
**Returns**: <code>string</code> - API key in order to create a session  
**Example**  
```js
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
```
<a name="module_api-access..getGPSVehicles"></a>

### api-access~getGPSVehicles(apikey) ⇒ <code>array</code>
RETURNS BUS ID, BUS NAME, BUS REGO OF EACH BUS MAY NEED MULTIPLE CALLS IF RETURNED DATA IS TOO BIG

**Kind**: inner method of [<code>api-access</code>](#module_api-access)  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | Fetched ApiKey |

<a name="module_api-access..getGPSLocationHistory"></a>

### api-access~getGPSLocationHistory(apiKey, vehicleid, startdatetime, enddatetime) ⇒ <code>array</code>
RETURNS LOCATION HISTORY FOR A GIVEN BUS ID, START AND END DATETIMES FORMAT: yyyy-MM-ddThh:mm:ss

**Kind**: inner method of [<code>api-access</code>](#module_api-access)  
**Returns**: <code>array</code> - GPS location history  

| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | Key retrieved with getApiKey call |
| vehicleid | <code>number</code> | Unique identifier for a vehicle |
| startdatetime | <code>date</code> | Timestamp representing start time |
| enddatetime | <code>date</code> | Timestamp representing end time |

**Example**  
```js
const startdatetime = new Date(2021, 11, 25); // 25th December 2021const enddatetime = new Date(2021, 11, 26); // 26th December 2021const vehicleHistory = getGPSLocationHistory('asldffk2q44324laiejfdkt398df', 101, startdatetime, enddatetime);
```
<a name="module_api-access..getCurrentGPSSnapshot"></a>

### api-access~getCurrentGPSSnapshot(apikey) ⇒ <code>Object</code>
RETURNS THE SNAPSHOT OF CURRENT GPS LOCATIONS (10 MINUTE INTERVALS)

**Kind**: inner method of [<code>api-access</code>](#module_api-access)  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | ApiKey |

<a name="module_api-access..getScheduledVehicles"></a>

### api-access~getScheduledVehicles(apikey) ⇒ <code>Object</code>
RETURNS THE CURRENT SCHEDULE (LIST OF BUSSES CURRENTLY ASSIGNED TO THE SCHEDULE)

**Kind**: inner method of [<code>api-access</code>](#module_api-access)  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | ApiKey |

<a name="module_api-access..getScheduledActivity"></a>

### api-access~getScheduledActivity(apikey, date) ⇒ <code>Object</code>
RETURNS THE SCHEDULE ACTIVITY (COMPLETE LIST OF LOCATIONAL DATA, START/END DESTINATION COORDS+DESCRIPTIONS)
//FOR A GIVEN DAY (yyyy-MM-dd)

**Kind**: inner method of [<code>api-access</code>](#module_api-access)  

| Param | Type | Description |
| --- | --- | --- |
| apikey | <code>string</code> | ApiKey |
| date | <code>date</code> |  |

<a name="module_api-calls"></a>

## api-calls

* [api-calls](#module_api-calls)
    * [~GetGPSVehicles(req, res)](#module_api-calls..GetGPSVehicles) ⇒ <code>Object</code>
    * [~GetScheduledActivity(req, res)](#module_api-calls..GetScheduledActivity) ⇒ <code>Object</code>
    * [~GetCurrentGPSSnapshot(req, res)](#module_api-calls..GetCurrentGPSSnapshot)
    * [~GetScheduledVehicles(req, res)](#module_api-calls..GetScheduledVehicles)
    * [~GetScheduledActivity(req, res)](#module_api-calls..GetScheduledActivity)

<a name="module_api-calls..GetGPSVehicles"></a>

### api-calls~GetGPSVehicles(req, res) ⇒ <code>Object</code>
queries database for Vehicle data and returns to client

**Kind**: inner method of [<code>api-calls</code>](#module_api-calls)  
**Returns**: <code>Object</code> - Http response with data and a status code attached  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Http request |
| res | <code>Object</code> | Http response |

<a name="module_api-calls..GetScheduledActivity"></a>

### api-calls~GetScheduledActivity(req, res) ⇒ <code>Object</code>
queries database for scheduled activity data and returns to client

**Kind**: inner method of [<code>api-calls</code>](#module_api-calls)  
**Returns**: <code>Object</code> - Http response with data and a status code attached  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Http request |
| res | <code>Object</code> | Http response |

<a name="module_api-calls..GetCurrentGPSSnapshot"></a>

### api-calls~GetCurrentGPSSnapshot(req, res)
Simulate pulling current GPS snapshots. Queries local database.

**Kind**: inner method of [<code>api-calls</code>](#module_api-calls)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Http request |
| res | <code>Object</code> | Http response |

<a name="module_api-calls..GetScheduledVehicles"></a>

### api-calls~GetScheduledVehicles(req, res)
Simulate pulling scheduled Vehicles from the database. Queries local database.

**Kind**: inner method of [<code>api-calls</code>](#module_api-calls)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Http request |
| res | <code>Object</code> | Http response |

<a name="module_api-calls..GetScheduledActivity"></a>

### api-calls~GetScheduledActivity(req, res)
Simulate pulling scheduled activity from the database. Queries local database.

**Kind**: inner method of [<code>api-calls</code>](#module_api-calls)  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Http request |
| res | <code>Object</code> | Http response |

<a name="module_DataHelper"></a>

## DataHelper

* [DataHelper](#module_DataHelper)
    * [~FILE](#module_DataHelper..FILE) : <code>string</code>
    * [~writeScheduleToFile(schedule)](#module_DataHelper..writeScheduleToFile)
    * [~readScheduleFromFile()](#module_DataHelper..readScheduleFromFile) ⇒ <code>Object</code>
    * [~getScheduledActivity()](#module_DataHelper..getScheduledActivity) ⇒ <code>Object</code>

<a name="module_DataHelper..FILE"></a>

### DataHelper~FILE : <code>string</code>
filepath of temp file

**Kind**: inner constant of [<code>DataHelper</code>](#module_DataHelper)  
<a name="module_DataHelper..writeScheduleToFile"></a>

### DataHelper~writeScheduleToFile(schedule)
Caches the day's schedule to disk. Writes the raw schedule to a .JSON file

**Kind**: inner method of [<code>DataHelper</code>](#module_DataHelper)  

| Param | Type | Description |
| --- | --- | --- |
| schedule | <code>array</code> | Array of objects (JSON data) |

<a name="module_DataHelper..readScheduleFromFile"></a>

### DataHelper~readScheduleFromFile() ⇒ <code>Object</code>
Reads the cached schedule from file

**Kind**: inner method of [<code>DataHelper</code>](#module_DataHelper)  
**Returns**: <code>Object</code> - JSON object of day's schedule  
<a name="module_DataHelper..getScheduledActivity"></a>

### DataHelper~getScheduledActivity() ⇒ <code>Object</code>
Reads the cached schedule from file

**Kind**: inner method of [<code>DataHelper</code>](#module_DataHelper)  
**Returns**: <code>Object</code> - JSON object of day's schedule  
<a name="processedData"></a>

## ~~processedData~~
***Deprecated***

**Kind**: global constant  
<a name="getSchedule"></a>

## getSchedule(req, res) ⇒ <code>Object</code>
queries database for schedule data and returns to client

**Kind**: global function  
**Returns**: <code>Object</code> - Http response with data and a status code attached  

| Param | Type | Description |
| --- | --- | --- |
| req | <code>Object</code> | Http request |
| res | <code>Object</code> | Http response |

