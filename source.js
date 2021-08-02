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
    { "date": 1627317492328, "start": 1627317522328, "end": 1627318992278 },
    { "date": 1627319041399, "start": 1627319071399, "end": 1627320552295 },
    { "date": 1627320591602, "start": 1627320621602, "end": 1627322112484 },
    { "date": 1627326825991, "start": 1627326855991, "end": 1627328352603 },
    { "date": 1627328423522, "start": 1627328453522, "end": 1627329893966 },
    { "date": 1627332595772, "start": 1627332625772, "end": 1627334113024 },
    { "date": 1627334150103, "start": 1627334180103, "end": 1627335672698 },
    { "date": 1627336942455, "start": 1627336972455, "end": 1627338432756 },
    { "date": 1627338467827, "start": 1627338497827, "end": 1627339938081 },
    { "date": 1627342512643, "start": 1627342542643, "end": 1627344012775 },
    { "date": 1627344216699, "start": 1627344246699, "end": 1627345693993 },
    { "date": 1627345730008, "start": 1627345760008, "end": 1627347200271 },
    { "date": 1627404156260, "start": 1627404186260, "end": 1627404517435 },
    { "date": 1627405032456, "start": 1627405062456, "end": 1627406502977 },
    { "date": 1627406549879, "start": 1627406579879, "end": 1627408058681 },
    { "date": 1627408102220, "start": 1627408132220, "end": 1627409618706 },
    { "date": 1627409653790, "start": 1627409683790, "end": 1627411178824 },
    { "date": 1627411213609, "start": 1627411243609, "end": 1627412460434 },
    { "date": 1627418313167, "start": 1627418343167, "end": 1627419818974 },
    { "date": 1627419854074, "start": 1627419884074, "end": 1627421324352 },
    { "date": 1627426195932, "start": 1627426225932, "end": 1627427679197 },
    { "date": 1627427715912, "start": 1627427745912, "end": 1627429186779 },
    { "date": 1627429653305, "start": 1627429683305, "end": 1627431126871 },
    { "date": 1627431204400, "start": 1627431234400, "end": 1627432674586 },
    { "date": 1627432974318, "start": 1627433004318, "end": 1627434459265 },
    { "date": 1627434740105, "start": 1627434770105, "end": 1627436259280 },
    { "date": 1627436293648, "start": 1627436323648, "end": 1627437819321 },
    { "date": 1627491684669, "start": 1627491714669, "end": 1627493154878 },
    { "date": 1627493951177, "start": 1627493981177, "end": 1627495421225 },
    { "date": 1627496185078, "start": 1627496215078, "end": 1627497686681 },
    { "date": 1627500495873, "start": 1627500525873, "end": 1627502005495 },
    { "date": 1627502187864, "start": 1627502217864, "end": 1627503685468 },
    { "date": 1627503719840, "start": 1627503749840, "end": 1627505243101 },
    { "date": 1627505274788, "start": 1627505304788, "end": 1627506745499 },
    { "date": 1627506781200, "start": 1627506811200, "end": 1627508305540 },
    { "date": 1627509429260, "start": 1627509459260, "end": 1627510945634 },
    { "date": 1627510982796, "start": 1627511012796, "end": 1627512505750 },
    { "date": 1627512743491, "start": 1627512773491, "end": 1627514245773 },
    { "date": 1627514298961, "start": 1627514328961, "end": 1627515769790 },
    { "date": 1627515808461, "start": 1627515838461, "end": 1627517305777 },
    { "date": 1627517443523, "start": 1627517473523, "end": 1627518925781 },
    { "date": 1627521733326, "start": 1627521763326, "end": 1627523247530 },
    { "date": 1627523303091, "start": 1627523333091, "end": 1627524201766 },
    { "date": 1627524238026, "start": 1627524268026, "end": 1627525599129 },
    { "date": 1627541368677, "start": 1627541398677, "end": 1627542887718 },
    { "date": 1627575613946, "start": 1627575643946, "end": 1627577116284 },
    { "date": 1627577157798, "start": 1627577187798, "end": 1627578676293 },
    { "date": 1627579176205, "start": 1627579206205, "end": 1627580656314 },
    { "date": 1627580702452, "start": 1627580732452, "end": 1627582216321 },
    { "date": 1627582301316, "start": 1627582331316, "end": 1627583776340 },
    { "date": 1627583938137, "start": 1627583968137, "end": 1627585456508 },
    { "date": 1627586292321, "start": 1627586322321, "end": 1627587762737 },
    { "date": 1627587797530, "start": 1627587827530, "end": 1627588221213 },
    { "date": 1627590926148, "start": 1627590956148, "end": 1627592435027 },
    { "date": 1627592469962, "start": 1627592499962, "end": 1627593995019 },
    { "date": 1627594029583, "start": 1627594059583, "end": 1627595555163 },
    { "date": 1627596796151, "start": 1627596826151, "end": 1627598266521 },
    { "date": 1627598300610, "start": 1627598330610, "end": 1627599771564 },
    { "date": 1627599805721, "start": 1627599835721, "end": 1627600396367 },
    { "date": 1627601987512, "start": 1627602017512, "end": 1627603458340 },
    { "date": 1627603495087, "start": 1627603525087, "end": 1627604664474 },
    { "date": 1627609638262, "start": 1627609668262, "end": 1627611129331 },
    { "date": 1627667791777, "start": 1627667821777, "end": 1627669273538 },
    { "date": 1627672495672, "start": 1627672525672, "end": 1627674013633 },
    { "date": 1627677283799, "start": 1627677313799, "end": 1627678789674 },
    { "date": 1627678883181, "start": 1627678913181, "end": 1627680354120 },
    { "date": 1627680389601, "start": 1627680419601, "end": 1627681860199 },
    { "date": 1627681916739, "start": 1627681946739, "end": 1627682851689 },
    { "date": 1627686768243, "start": 1627686798243, "end": 1627688270011 },
    { "date": 1627688806401, "start": 1627688836401, "end": 1627690310032 },
    { "date": 1627690417821, "start": 1627690447821, "end": 1627691888059 },
    { "date": 1627691929268, "start": 1627691959268, "end": 1627693430095 },
    { "date": 1627924791983, "start": 1627924821983, "end": 1627926317826 },
    { "date": 1627926351234, "start": 1627926381234, "end": 1627927878120 },
    { "date": 1627928074914, "start": 1627928104914, "end": 1627929557856 }
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
    getAllPomodoroLastNDays(7, (results) => {
        let res = results.map(function(r) {
            let date = r.startDate.getTime();
            let start = r.startDate.getTime()+30*1000;
            let end = r.endDate.getTime()-30*1000;
            if (r.endDate.getDate()!=r.startDate.getDate()) {
                end = new Date(r.startDate).setHours(24,0,0,0);
            }
            return {
                "date":r.startDate.getTime(),
                "start" : r.startDate.getTime()+30*1000,
                "end" : r.endDate.getTime()-30*1000,
                // "duration": (r.endDate.getTime() - r.startDate.getTime()) / (60 * 60 * 1000)
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
                        values: res
                    },
                    mark: { type: "bar", cornerRadius: 5, clip: true, tooltip: true },
                    encoding: {
                        y: { timeUnit: "yearmonthdate", field: 'date', type: 'temporal', title:"Date",  axis: {grid: true, format: "%m/%d"}  },
                        x: { timeUnit: "hoursminutes", field: 'start', type: 'temporal', title: "Start time", axis: { grid: true }, "scale": { "domain": [{ "hours": gantt_properties.xmin_hours }, { "hours": gantt_properties.xmax_hours }] } },
                        x2: { timeUnit: "hoursminutes", field: 'end', type: 'temporal', title: "End time"},

                    }
                },
                {
                    // Second layer: spec of the vertical rulers to show the current time.
                    data: {
                        values: [
                            { date: Date.now() },
                        ],
                    },
                    mark: { type: "rule", color: "red", size: 2, clip: true },
                    encoding: {
                        x: { timeUnit: "hoursminutes", field: "date", type: "temporal", },
                    },
                },
            ],
        }

        vegaEmbed("#vega-gantt", vlSpec, {renderer: "svg"});
    });

    getAllPomodoroLastNDays(20, (results) => {
        let res = results.map(function(r) {
            return {
                "date":r.startDate.getTime(),
                "duration": (r.endDate.getTime() - r.startDate.getTime()) / (60 * 60 * 1000)
            }
        })

        let vlSpec = {
            $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
            description: 'Histogram of active time',
            width: 900,
            height: 200,
            padding: 5,
            autosize: "pad",
            layer: [
                {
                    data: {
                        values: res
                    },
                    mark: { type: "bar", cornerRadius: 5, clip: true, tooltip: true },
                    encoding: {
                        x: { timeUnit: "yearmonthdate", field: 'date', type: 'temporal', title: "Day", axis: {grid: true, format: "%m/%d"}},
                        y: {
                            aggregate: "sum", field: 'duration', type: 'quantitative', title: "Work hours", format: ".2f"
                        },

                    }
                },
                // {
                //     // Second layer: spec of the vertical rulers to show the current time.
                //     data: {
                //         values: res,
                //     },
                //     mark: { type: "rule", color: "red", size: 2, clip: true },
                //     encoding: {
                //         y: {
                //             aggregate: "median", field: 'duration', type: 'quantitative', title: "Work hours",
                //         },
                //     },
                // },
            ],
        }

        vegaEmbed("#vega-histogram", vlSpec, {renderer: "svg"});
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

        getAllPomodoroLastNDays(7, (results) => {
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

function getAllPomodoroLastNDays(n_days, callback) {
    let objectStore = db.transaction(["pomodoroList"], "readonly").objectStore('pomodoroList');
    let index = objectStore.index("startDate");

    let startDate = new Date(new Date().setHours(0, 0, 0, 0) - n_days * 24 * 60 * 60 * 1000);
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
        setInterval(create_gantt_chart, 60 * 1000, gantt_properties);
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