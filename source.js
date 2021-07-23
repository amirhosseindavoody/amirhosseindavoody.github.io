document.write('<script src="https://d3js.org/d3.v4.js"></script>');

document.write('<script src="https://cdn.jsdelivr.net/npm/vega@5.20.2"></script>');
document.write('<script src="https://cdn.jsdelivr.net/npm/vega-lite@5.1.0"></script>');
document.write('<script src="https://cdn.jsdelivr.net/npm/vega-embed@6.17.0"></script>');

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

let dummyData = [
    {"date": 1626386707201, "start": 1626386707201, "end": 1626388207681},
    {"date": 1626388283373, "start": 1626388283373, "end": 1626389787631},
    {"date": 1626389800639, "start": 1626389800639, "end": 1626391348235},
    {"date": 1626391352886, "start": 1626391352886, "end": 1626391387524},
    {"date": 1626393573708, "start": 1626393573708, "end": 1626395075130},
    {"date": 1626395081724, "start": 1626395081724, "end": 1626396627592},
    {"date": 1626452363679, "start": 1626452363679, "end": 1626453864538},
    {"date": 1626453876723, "start": 1626453876723, "end": 1626455424200},
    {"date": 1626455434140, "start": 1626455434140, "end": 1626456984211},
    {"date": 1626459681228, "start": 1626459681228, "end": 1626459777985},
    {"date": 1626464311355, "start": 1626464311355, "end": 1626464835211},
    {"date": 1626472277805, "start": 1626472277805, "end": 1626473784334},
    {"date": 1626473889612, "start": 1626473889612, "end": 1626473891602},
    {"date": 1626474307517, "start": 1626474307517, "end": 1626475807899},
    {"date": 1626475815029, "start": 1626475815029, "end": 1626477324562},
    {"date": 1626477330960, "start": 1626477330960, "end": 1626478832043},
    {"date": 1626478869635, "start": 1626478869635, "end": 1626480384557},
    {"date": 1626480390265, "start": 1626480390265, "end": 1626481944547},
    {"date": 1626482169993, "start": 1626482169993, "end": 1626483684587},
    {"date": 1626717723861, "start": 1626717723861, "end": 1626717730462},
    {"date": 1626717731390, "start": 1626717731390, "end": 1626718106079},
    {"date": 1626719214583, "start": 1626719214583, "end": 1626719218091},
    {"date": 1626719220433, "start": 1626719220433, "end": 1626719464339},
    {"date": 1626719571236, "start": 1626719571236, "end": 1626721110053},
    {"date": 1626721542828, "start": 1626721542828, "end": 1626723042932},
    {"date": 1626723097459, "start": 1626723097459, "end": 1626724650008},
    {"date": 1626726450605, "start": 1626726450605, "end": 1626728010082},
    {"date": 1626728258876, "start": 1626728258876, "end": 1626728350756},
    {"date": 1626728361242, "start": 1626728361242, "end": 1626729861472},
    {"date": 1626731085159, "start": 1626731085159, "end": 1626732630273},
    {"date": 1626732640420, "start": 1626732640420, "end": 1626734190426},
    {"date": 1626735762116, "start": 1626735762116, "end": 1626737310436},
    {"date": 1626737521848, "start": 1626737521848, "end": 1626739050355},
    {"date": 1626739095922, "start": 1626739095922, "end": 1626740610355},
    {"date": 1626740882219, "start": 1626740882219, "end": 1626742410425},
    {"date": 1626799456729, "start": 1626799456729, "end": 1626800961250},
    {"date": 1626805756948, "start": 1626805756948, "end": 1626807261400},
    {"date": 1626807340344, "start": 1626807340344, "end": 1626808536951},
    {"date": 1626809218769, "start": 1626809218769, "end": 1626810741603},
    {"date": 1626810817104, "start": 1626810817104, "end": 1626811063857},
    {"date": 1626812459724, "start": 1626812459724, "end": 1626813981661},
    {"date": 1626813987053, "start": 1626813987053, "end": 1626815541784},
    {"date": 1626815573101, "start": 1626815573101, "end": 1626817101445},
    {"date": 1626819647131, "start": 1626819647131, "end": 1626821181745},
    {"date": 1626821286267, "start": 1626821286267, "end": 1626822801774},
    {"date": 1626822873202, "start": 1626822873202, "end": 1626824421776},
    {"date": 1626824426857, "start": 1626824426857, "end": 1626825930413},
    {"date": 1626886360364, "start": 1626886360364, "end": 1626887861088},
    {"date": 1626887864671, "start": 1626887864671, "end": 1626889399940},
    {"date": 1626890126961, "start": 1626890126961, "end": 1626891679847},
    {"date": 1626891758226, "start": 1626891758226, "end": 1626893299876},
    {"date": 1626893303650, "start": 1626893303650, "end": 1626894859971},
    {"date": 1626895177283, "start": 1626895177283, "end": 1626896720010},
    {"date": 1626896724292, "start": 1626896724292, "end": 1626898280034},
    {"date": 1626898647663, "start": 1626898647663, "end": 1626900199881},
    {"date": 1626900343191, "start": 1626900343191, "end": 1626901451821},
    {"date": 1626902724177, "start": 1626902724177, "end": 1626904280002},
    {"date": 1626904283867, "start": 1626904283867, "end": 1626905840048},
    {"date": 1626905921399, "start": 1626905921399, "end": 1626905922343},
    {"date": 1626912217959, "start": 1626912217959, "end": 1626913760101},
    {"date": 1626913765061, "start": 1626913765061, "end": 1626915320200},
    {"date": 1626936871355, "start": 1626936871355, "end": 1626937172248},
    {"date": 1626970996727, "start": 1626970996727, "end": 1626972544897},
    {"date": 1626972552288, "start": 1626972552288, "end": 1626974104924},
    {"date": 1626974131247, "start": 1626974131247, "end": 1626975664942},
    {"date": 1626975670104, "start": 1626975670104, "end": 1626977225052},
    {"date": 1626984902918, "start": 1626984902918, "end": 1626986405090},
    {"date": 1626986411877, "start": 1626986411877, "end": 1626987965243},
    {"date": 1626987980920, "start": 1626987980920, "end": 1626989481278},
    {"date": 1626989487943, "start": 1626989487943, "end": 1626991025166}
  ];

const update_gantt_chart = {
    set: function(obj, prop, value) {
        obj[prop] = value;
        create_gantt_chart(obj);
    }
}

const gantt_properties = new Proxy({
    xmin_hours: 9,
    xmax_hours: 19,
}, update_gantt_chart)

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

function create_gantt_chart(gantt_properties) {
    getAllPomodoroForPast7Days((results) => {
        let res = results.map(function(r) {
            // let durationInHours = (timerEndDate.getTime() - timerStartDate.getTime()) / (1000 * 60 * 60);
            // let startHourOfDay = (r.startDate.getTime() - new Date(r.startDate).setHours(0, 0, 0, 0)) / (1000 * 60 * 60);
            return {
                "date":r.startDate.getTime(),
                "start" : r.startDate.getTime(),
                "end" : r.endDate.getTime(),
                
            }
        })
        let vlSpec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            description: 'A Gantt chart showing pomodoros',
            width: 900,
            height: 200,
            padding: 5,
            autosize: "pad",
            layer: [
                {
                    data: {
                        values: dummyData
                    },
                    mark: { type: "bar", cornerRadius: 5, clip: true },
                    encoding: {
                        y: { timeUnit: "date", field: 'date', type: 'temporal', title:"Date",  axis: {grid: true, format: "%m/%d"}  },
                        x: { timeUnit: "hoursminutes", field: 'start', type: 'temporal', title: "Time", axis: { grid: true }, "scale": { "domain": [{ "hours": gantt_properties.xmin_hours }, { "hours": gantt_properties.xmax_hours }] } },
                        x2: { timeUnit: "hoursminutes", field: 'end', type: 'temporal' },

                    }
                },
                {
                    // Second layer: spec of the vertical rulers to show the current time.
                    data: {
                        values: [
                            { date: Date.now() },
                        ],
                    },
                    mark: { type: "rule", color: "red", size: 2, clip: true},
                    encoding: {
                      x: {timeUnit: "hoursminutes", field: "date", type: "temporal", },
                    },
                  },
            ],
        }

        vegaEmbed("#vega-gantt", vlSpec, {renderer: "svg"});
    });
}

function create_time_table_plot() {
    plotArea.innerHTML = "";

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 50, left: 100 },
        width = 900 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    let hour_domain = [6, 24];

    // append the svg object to the body of the page
    var svg = d3.select("#plot-area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns
    let days_scale = [new Date().setHours(0,0,0,0) - 8 * 24 * 60 * 60 * 1000, new Date().setHours(0,0,0,0)];

    const range = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    hour_format = {
        0: "12 AM", 1: "1 AM", 2: "2 AM", 3: "3 AM", 4: "4 AM", 5: "5 AM", 6: "6 AM",
        7: "7 AM", 8: "8 AM", 9: "9 AM", 10: "10 AM", 11: "11 AM", 12: "12 PM", 13: "1 PM",
        14: "2 PM", 15: "3 PM", 16: "4 PM", 17: "5 PM", 18: "6 PM", 19: "7 PM", 20: "8 PM",
        21: "9 PM", 22: "10 PM", 23: "11 PM", 24: "12 AM"
    };

    // create a tooltip
    var Tooltip = d3.select("#div_template")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    const kOpacity = 0.6;

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        Tooltip
            .style("opacity", 1);
        d3.select(this)
            .style("stroke", get_color(d))
            .style("opacity", 1);
    }
    var mousemove = function (d) {
        Tooltip
            .html("The exact value of<br>this cell is: ")
            .style("left", (d3.mouse(this)[0]+70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
        Tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", kOpacity)
    }

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
                .ticks(10)
                .tickSize(-height)
                .tickFormat("")
        )
        .selectAll("line")
        .style("stroke", "#ddd");

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
        )
        .selectAll("line")
        .style("stroke", "#ddd");

    // Add reference line for current time
    svg.append("line")
        .style("stroke-dasharray", ("10,3"))
        .style("stroke", "grey")
        .attr("x1", x((Date.now() - new Date().setHours(0,0,0,0))/(60*60*1000)))
        .attr("y1", height)
        .attr("x2", x((Date.now() - new Date().setHours(0,0,0,0))/(60*60*1000)))
        .attr("y2", 0);

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
        enter = svg
            .append("g").selectAll("rect")
            .data(results)
            .enter()
            .append("rect")
            .attr("x", (d) => { return x(d.startHourOfDay) })
            .attr("y", (d) => { return y(d.startDate.setHours(0, 0, 0, 0)) })
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("width", (d) => { return calculate_width(d, x) })
            .attr("height", 20)
            .style("fill", (d) => { return get_color(d) })
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", kOpacity)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave);
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

    // Do not record pomodoro if it is less than 5 minutes.
    if (durationInHours*60 < 5) {
        return;
    }

    let completed = true;
    if (durationInHours * 60 <= pomodoroDurationValue) {
        completed = false;
    }

    let newItem = [
        { startDate: timerStartDate, endDate: timerEndDate, project: "Work", durationInHours: durationInHours, startHourOfDay: startHourOfDay, completed: completed }
    ];
    let objectStoreRequest = objectStore.add(newItem[0]);
    objectStoreRequest.onsuccess = function () {
        create_gantt_chart(gantt_properties);
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

    pomodoroDurationInput.addEventListener("input", () => {
        pomodoroDurationValue = pomodoroDurationInput.value;
        pomodoroDurationLabel.innerHTML = "Pomodoro duration: " + pomodoroDurationInput.value;
    });
    pomodoroDurationInput.addEventListener("change", () => {
        pomodoroDurationValue = pomodoroDurationInput.value;
        pomodoroDurationLabel.innerHTML = "Pomodoro duration: " + pomodoroDurationValue;
    });

    pomodoroDurationLabel.innerHTML = "Pomodoro duration: " + pomodoroDurationValue;

    document.getElementById("gantt_chart_min_hours").value = gantt_properties.xmin_hours;
    document.getElementById("gantt_chart_max_hours").value = gantt_properties.xmax_hours;

    document.getElementById("gantt_chart_min_hours").addEventListener("change",()=>{
        gantt_properties.xmin_hours = Number(document.getElementById("gantt_chart_min_hours").value);
    });
    document.getElementById("gantt_chart_max_hours").addEventListener("change",()=>{
        gantt_properties.xmax_hours = Number(document.getElementById("gantt_chart_max_hours").value);
    });


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
        create_gantt_chart(gantt_properties);
        setInterval(create_gantt_chart(gantt_properties), 60 * 1000);
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