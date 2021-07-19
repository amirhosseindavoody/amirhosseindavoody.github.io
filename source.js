document.write('<script src="https://d3js.org/d3.v4.js"></script>');

// create an instance of a db object for us to store the IDB data in
let db;

const pomodoroList = document.getElementById("pomodoro-list");

const controlButton = document.getElementById('control-button');

const timerDisplay = document.getElementById('timer');

const plotArea = document.getElementById('plot-area');

const pomodoroDurationInput = document.getElementById('pomodoro-duration-input');
const pomodoroDurationLabel = document.getElementById('pomodoro-duration-label');

let pomodoroDurationValue = 25;

let permission = Notification.permission;

let timerIntervalExecutor;
let timerStartDate;

function tryNotification() {
    if(permission === "granted") {
        showNotification();
     } else if(permission === "default"){
        requestAndShowPermission();
     } else {
       alert("Use normal alert");
     }
}

function showNotification() {
    // if(document.visibilityState === "visible) {
    //     return;
    // }
    var title = "Pomodoro App";
    icon = "tomato-icon.png"
    var body = "Pomodoro finished";
    var notification = new Notification(title, { body:body, requireInteraction:true,  icon:icon});
    notification.onclick = () => { 
           notification.close();
           window.parent.focus();
    }
}

function requestAndShowPermission() {
    Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            showNotification();
        }
    });
}

function create_time_table_plot() {

    plotArea.innerHTML = "";

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 50, left: 100 },
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    let hour_domain = [6, 18];

    // append the svg object to the body of the page
    var svg = d3.select("#plot-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns
    let days_scale = [new Date().setHours(0,0,0,0) - 7 * 24 * 60 * 60 * 1000, new Date().setHours(24,0,0,0)];

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    hour_format = {
        0: "12 AM",
        1: "1 AM",
        2: "2 AM",
        3: "3 AM",
        4: "4 AM",
        5: "5 AM",
        6: "6 AM",
        7: "7 AM",
        8: "8 AM",
        9: "9 AM",
        10: "10 AM",
        11: "11 AM",
        12: "12 PM",
        13: "1 PM",
        14: "2 PM",
        15: "3 PM",
        16: "4 PM",
        17: "5 PM",
        18: "6 PM",
        19: "7 PM",
        20: "8 PM",
        21: "9 PM",
        22: "10 PM",
        23: "11 PM",
        24: "12 AM"
    };

    var x = d3.scaleLinear()
        .range([0, width])
        .domain(hour_domain)
        .clamp(true);

    // add the X gridlines
    svg.append("g")
        .attr("class", "grid")
        .attr("transform", "translate(0," + height + ")")
        .call(
            d3.axisBottom(x)
                .ticks(5)
                .tickSize(-height)
                .tickFormat("")
        );

    var y = d3.scaleTime()
        .range([height, 0])
        .domain(days_scale);

    // add the Y gridlines
    svg.append("g")
        .attr("class", "grid")
        .call(
            d3.axisLeft(y)
                .ticks(7)
                .tickSize(-width)
                .tickFormat("")
        );

    // svg.selectAll("g.grid").style({stroke:"blue"});

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(
            d3.axisBottom(x)
                .tickValues(range(hour_domain[0], hour_domain[1], 2))
                .tickFormat((d) => hour_format[d])
        )
        .selectAll("text")
        .attr("y", 0)
        .attr("x", 9)
        .attr("dy", ".35em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

    svg.append("g")
        .call(d3.axisLeft(y));

    getAllPomodoroForPast7Days((results) => {
        results.forEach(r => {
            svg
                .append("g")
                .append("rect")
                .attr("x", x(r.startHourOfDay))
                .attr("y", y(r.startDate.setHours(0,0,0,0)))
                .attr("rx", 3)
                .attr("ry", 3)
                .attr("width", calculate_width(r, x))
                .attr("height", 20)
                .attr("fill", get_color(r));
        })
    });
};

function calculate_width(pomodoro_event, xscale) {
    let width = xscale(pomodoro_event.startHourOfDay + pomodoro_event.durationInHours) - xscale(pomodoro_event.startHourOfDay);
    return Math.max(width, 1);
}

function get_color(pomodoro_event) {
    if (pomodoro_event.completed) {
        return "#1976d2";
    } else {
        return "#d32f2f";
    }
}

function cleanDataAndReload() {
    localStorage.clear();
    indexedDB.deleteDatabase('PomodoroDB');
    location.reload();
}

function startPomodoro() {
    controlButton.innerHTML = "Stop Pomodoro";
    controlButton.removeEventListener("click", startPomodoro);
    controlButton.addEventListener("click", stopPomodoro);

    timerStartDate = new Date();
    let maxEndDate = new Date(timerStartDate.getTime() + pomodoroDurationValue * 60 * 1000);

    // Update the count down every 1 second
    // setInterval() method calls a function or evaluates an expression at specified intervals (in milliseconds)
    timerIntervalExecutor = setInterval(function () {

        // Get today's date and time
        let now = new Date();

        // Find the distance between now and the count down date
        let distance = maxEndDate.getTime() - now.getTime();

        let hours = Math.floor(distance / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        function pad(num, size=2) {
            num = num.toString();
            while (num.length < size) num = "0" + num;
            return num;
        }

        timerDisplay.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);

        // If the count down is finished, write some text
        if (distance < 0) {
            timerDisplay.innerHTML = "Pomodoro Finished";
            tryNotification();
            stopPomodoro();
        }
    }, 100);
}

function stopPomodoro() {
    controlButton.innerHTML = "Start Pomodoro";
    controlButton.removeEventListener("click", stopPomodoro);
    controlButton.addEventListener("click", startPomodoro);

    if (timerIntervalExecutor) {
        clearInterval(timerIntervalExecutor);
    }

    // Get today's date and time
    var timerEndDate = new Date();

    // open a read/write db transaction, ready for adding the data
    let transaction = db.transaction(["pomodoroList"], "readwrite");

    // call an object store that's already been added to the database
    let objectStore = transaction.objectStore("pomodoroList");

    let durationInHours = (timerEndDate.getTime() - timerStartDate.getTime()) / (1000 * 60 * 60);
    let startHourOfDay = (timerStartDate.getTime() - new Date(timerStartDate).setHours(0, 0, 0, 0)) / (1000 * 60 * 60);

    let completed = true;
    if (durationInHours * 60 <= pomodoroDurationValue) {
        completed = false;
    }

    let newItem = [
        { startDate: timerStartDate, endDate: timerEndDate, project: "Work", durationInHours: durationInHours, startHourOfDay: startHourOfDay, completed: completed }
    ];
    let objectStoreRequest = objectStore.add(newItem[0]);
    objectStoreRequest.onsuccess = function () {
        create_time_table_plot();
    }
    objectStoreRequest.onerror = function (event) {
        console.log("failed to record pomodoro");
        console.log(event);
    }
}

function addDummyPomodoros() {

    let items = [
        { startDate: new Date(2021, 06, 13, 10, 30), endDate: new Date(2021, 06, 13, 10, 35), project: "Work", durationInHours: 0.25, startHourOfDay: 10.5 },
        { startDate: new Date(2021, 06, 14, 10, 30), endDate: new Date(2021, 06, 14, 10, 35), project: "Work", durationInHours: 0.5, startHourOfDay: 11.5 },
        { startDate: new Date(2021, 06, 14, 13, 30), endDate: new Date(2021, 06, 14, 13, 35), project: "Work", durationInHours: 0.15, startHourOfDay: 13.5 },
        { startDate: new Date(2021, 06, 15, 10, 30), endDate: new Date(2021, 06, 15, 10, 35), project: "Work", durationInHours: 1, startHourOfDay: 2 },
    ];

    // open a read/write db transaction, ready for adding the data
    let tx = db.transaction(["pomodoroList"], "readwrite");



    items.forEach(item => {
        tx.objectStore("pomodoroList").add(item);
    });

    tx.oncomplete = function () {
        console.log("Finished adding records");
    }

    tx.onerror = function () {
        console.log("Failed adding dummy records");
    }
}

function displayRecords() {
    if (db == null) {
        return;
    }
    pomodoroList.innerHTML = "";

    // Open our object store and then get a cursor list of all the different data items in the IDB to iterate through
    let objectStore = db.transaction('pomodoroList').objectStore('pomodoroList');

    objectStore.openCursor().onsuccess = function (event) {
        let cursor = event.target.result;

        // if there is still another cursor to go, keep runing this code
        if (cursor) {
            // create a list item to put each data item inside when displaying it
            const listItem = document.createElement('li');
            listItem.innerHTML = cursor.value.startDate.toString() + " - " + cursor.value.endDate.toString() + " - " + cursor.value.project;
            pomodoroList.appendChild(listItem);

            // continue on to the next item in the cursor
            cursor.continue();

            // if there are no more cursor items to iterate through, say so, and exit the function
        }
    }

}

function getAllPomodoroForThisWeek(callback) {
    let objectStore = db.transaction(["pomodoroList"], "readonly").objectStore('pomodoroList');
    let index = objectStore.index("startDate");

    let today = new Date();
    let startDate = new Date(today.setHours(0, 0, 0, 0) - today.getDay() * 24 * 60 * 60 * 1000);
    let endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    let range = IDBKeyRange.bound(startDate, endDate);

    index.getAll(range).onsuccess = function (event) {
        let results = event.target.result;
        console.log("Number of pomodoros for this week: " + results.length);
        callback(results);
    }
}

function getAllPomodoroForPast7Days(callback) {
    let objectStore = db.transaction(["pomodoroList"], "readonly").objectStore('pomodoroList');
    let index = objectStore.index("startDate");

    let startDate = new Date(new Date().setHours(0, 0, 0, 0) - 7 * 24 * 60 * 60 * 1000);
    let endDate = new Date(new Date().setHours(24, 0, 0, 0));

    let range = IDBKeyRange.bound(startDate, endDate);

    index.getAll(range).onsuccess = function (event) {
        let results = event.target.result;
        console.log("Number of pomodoros for this week: " + results.length);
        callback(results);
    }
}

window.onload = function () {

    controlButton.innerHTML = "Start Pomodoro";
    controlButton.addEventListener("click", startPomodoro);

    document.body.style.fontFamily = "sans-serif";

    console.log(pomodoroDurationInput);
    pomodoroDurationInput.addEventListener("input", () => {
        pomodoroDurationValue = pomodoroDurationInput.value;
        pomodoroDurationLabel.innerHTML = "Pomodoro duration: " + pomodoroDurationInput.value;
    });
    pomodoroDurationInput.addEventListener("change", () => {
        pomodoroDurationValue = pomodoroDurationInput.value;
        pomodoroDurationLabel.innerHTML = "Pomodoro duration: " + pomodoroDurationValue;
    });

    pomodoroDurationLabel.innerHTML = "Pomodoro duration: " + pomodoroDurationValue;


    if (!window.indexedDB) {
        console.log("Your browser doesn't support IndexedDB");
        return;
    }

    // open the database
    const DBOpenRequest = indexedDB.open('PomodoroDB', 1);

    DBOpenRequest.onerror = (event) => {
        console.error("Database error: ${event.target.errorCode}");
    };

    DBOpenRequest.onsuccess = (event) => {
        // store the result of opening the database in the db variable
        db = DBOpenRequest.result;
        console.log("Opned Database successfully");
        // addDummyPomodoros();

        create_time_table_plot();
    };

    DBOpenRequest.onupgradeneeded = function (event) {
        let db = event.target.result;

        // // Create an objectStore for this database
        // let objectStore = db.createObjectStore("pomodoroList", { keyPath: "startDate" });

        // // define what data items the objectStore will contain
        // objectStore.createIndex("startDate", "startDate", { unique: false });

        // Create an objectStore for this database
        let objectStore = db.createObjectStore("pomodoroList", { keyPath: "startDate" });

        // define what data items the objectStore will contain
        objectStore.createIndex("startDate", "startDate", { unique: false });
    }



}
// export {startTimer, logTime, cleanData, clickCounter, create_time_table_plot, create_scatter_plot};