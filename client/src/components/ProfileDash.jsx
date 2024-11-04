import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { isSameDay } from "date-fns";

import p5 from 'p5';

import { Label, Button, Modal, Alert, Dropdown, Popover} from "flowbite-react";
import { BsYinYang } from "react-icons/bs";
import { FaBrain, FaDumbbell } from 'react-icons/fa';

import { HiArrowNarrowUp, HiArrowNarrowDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';


import { summary } from 'date-streaks';
import Calendar from 'react-calendar'

import Timeline from './Timeline';


export default function ProfileDash() {

  const { currentUser } = useSelector((state) => state.user);
  const [publishError, setPublishError] = useState(null);

  const [timelineHabits, setTimelineHabits] = useState([]);

  const [latestSubgoals, setLatestSubgoals] = useState([]);
  const [oldestSubgoals, setOldestSubgoals] = useState([]);


  const [totalMindSubgoals, setTotalMindSubgoals] = useState(0);
  const [completedMindSubgoals, setCompletedMindSubgoals] = useState(0);

  const [totalBodySubgoals, setTotalBodySubgoals] = useState(0);
  const [completedBodySubgoals, setCompletedBodySubgoals] = useState(0);

  const [totalSpiritSubgoals, setTotalSpiritSubgoals] = useState(0);
  const [completedSpiritSubgoals, setCompletedSpiritSubgoals] = useState(0);

  const [completedMindHabits, setCompletedMindHabits] = useState(0);
  const [completedBodyHabits, setCompletedBodyHabits] = useState(0);
  const [completedSpiritHabits, setCompletedSpiritHabits] = useState(0);

  const [totalmindHabits, settotalMindHabits] = useState(0);
  const [totalbodyHabits, settotalBodyHabits] = useState(0);
  const [totalspiritHabits, settotalSpiritHabits] = useState(0);

  const [mindHabitsLastWeek, setMindHabitsLastWeek] = useState(0);
  const [bodyHabitsLastWeek, setBodyHabitsLastWeek] = useState(0);
  const [spiritHabitsLastWeek, setSpiritHabitsLastWeek] = useState(0);

  const [mindSubgoalsLastMonth, setMindSubgoalsLastMonth] = useState(0);
  const [bodySubgoalsLastMonth, setBodySubgoalsLastMonth] = useState(0);
  const [spiritSubgoalsLastMonth, setSpiritSubgoalsLastMonth] = useState(0);

  const [totalMindScore, setTotalMindScore] = useState('');
  const [totalBodyScore, setTotalBodyScore] = useState('');
  const [totalSpiritScore, setTotalSpiritScore] = useState('');
  const [renderConstellations, setRenderConstellations] = useState('');
  const [regrow, setRegrow] = useState(false);


  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const date = new Date();
  const [todaysDay, setTodaysDay] = useState(weekday[date.getDay()]);
  const [todaysDateFull, setTodaysDateFull] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));


  const [showModalOverview, setShowModalOverview] = useState(false);
  const [formDataOverview, setFormDataOverview] = useState({});
  const [formDataDays, setFormDataDays] = useState([]);
  const [formDataCompleted, setFormDataCompleted] = useState([]);

  const [summaryData, setSummaryData] = useState({});

  //Calendar use
  const [value, setValue] = useState(date);
  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to
      if (formDataCompleted.find(dDate => isSameDay(dDate, date))) {
        return 'myClassName';
      }
    }
  }

  const categoryGradient = {
    'mind': ' bg-gradient-to-b from-teal-500 to-cyan-800',
    'body': ' bg-gradient-to-b from-amber-400 to-pink-400',
    'spirit': ' bg-gradient-to-b from-sky-500 to-teal-500',
  };

  const categoryBorder = {
    'mind': 'border-teal-500',
    'body': 'border-orange-300',
    'spirit': 'border-sky-500',
  };

  const categoryIcon = {
    'mind': <FaBrain />,
    'body': <FaDumbbell />,
    'spirit': <BsYinYang />,
  };

  const categoryColor = {
    'mind': 'bg-teal-500',
    'body': 'bg-orange-300',
    'spirit': 'bg-sky-500',
  };

  const categoryText = {
    'mind': 'text-teal-500',
    'body': 'text-orange-300',
    'spirit': 'text-sky-500',
  };

  //Refresh the time every second
  useEffect(() => {
    const timer = setInterval(() => { 
      setTodaysDateFull(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }, 1000);
    return () => {
      clearInterval(timer); 
    }

  }, []);

  useEffect(() => {

    const fetchStatistics = async () => {
      try {
        const res = await fetch(`/api/dashboard/getstatistics/${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {

          setTimelineHabits(data.timelineHabits);

          setLatestSubgoals(data.latestSubgoals);
          setOldestSubgoals(data.oldestSubgoals);

          setTotalMindSubgoals(data.totalMindSubgoals);
          setTotalBodySubgoals(data.totalBodySubgoals);
          setTotalSpiritSubgoals(data.totalSpiritSubgoals);

          settotalMindHabits(data.totalMindHabits);
          settotalBodyHabits(data.totalBodyHabits);
          settotalSpiritHabits(data.totalSpiritHabits);

          setCompletedMindSubgoals(data.completedMindSubgoals);
          setCompletedBodySubgoals(data.completedBodySubgoals);
          setCompletedSpiritSubgoals(data.completedSpiritSubgoals);

          if (data.mindHabitScore.length > 0) {
            setCompletedMindHabits(data.mindHabitScore[0].total);
          }

          if (data.bodyHabitScore.length > 0){
            setCompletedBodyHabits(data.bodyHabitScore[0].total);
          }

          if (data.spiritHabitScore.length > 0) {
            setCompletedSpiritHabits(data.spiritHabitScore[0].total);
          }

          if (data.mindHabitsLastWeek.length > 0) {
            setMindHabitsLastWeek(data.mindHabitsLastWeek[0].total);
          }

          if (data.bodyHabitsLastWeek.length > 0) {
            setBodyHabitsLastWeek(data.bodyHabitsLastWeek[0].total);
          }

          if (data.spiritHabitsLastWeek.length > 0) {
            setSpiritHabitsLastWeek(data.spiritHabitsLastWeek[0].total);
          }

          setMindSubgoalsLastMonth(data.mindSubgoalsLastMonth);
          setBodySubgoalsLastMonth(data.bodySubgoalsLastMonth);
          setSpiritSubgoalsLastMonth(data.spiritSubgoalsLastMonth);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {

      fetchStatistics();

    }
  }, [currentUser._id]); 

  useEffect(() => {
    setSummaryData(summary(formDataCompleted));

  }, [formDataCompleted]);

  useEffect(() => {

    setTotalMindScore(completedMindSubgoals + completedMindHabits);
    setTotalBodyScore(completedBodySubgoals + completedBodyHabits);
    setTotalSpiritScore(completedSpiritSubgoals + completedSpiritHabits);

    if (totalMindScore !== '' && totalBodyScore !== '' && totalSpiritScore !== '') {
      setRenderConstellations('true');
    }


  }, [completedMindSubgoals, completedMindHabits, completedBodySubgoals, completedBodyHabits, completedSpiritSubgoals, completedSpiritHabits]);


  //Spirit Sketch
  const SketchPoints = (p) => {

    let backgroundImage1;


    let cordsArray = [
      [
        185,
        305
      ],
      [
        176,
        304
      ],
      [
        168,
        300
      ],
      [
        160,
        300
      ],
      [
        153,
        302
      ],
      [
        144,
        307
      ],
      [
        139,
        310
      ],
      [
        127,
        307
      ],
      [
        116,
        306
      ],
      [
        109,
        308
      ],
      [
        102,
        303
      ],
      [
        98,
        305
      ],
      [
        90,
        304
      ],
      [
        84,
        305
      ],
      [
        77,
        300
      ],
      [
        67,
        288
      ],
      [
        68,
        279
      ],
      [
        71,
        271
      ],
      [
        75,
        267
      ],
      [
        66,
        267
      ],
      [
        61,
        262
      ],
      [
        58,
        255
      ],
      [
        58,
        250
      ],
      [
        63,
        256
      ],
      [
        68,
        260
      ],
      [
        71,
        252
      ],
      [
        71,
        247
      ],
      [
        65,
        247
      ],
      [
        61,
        246
      ],
      [
        64,
        241
      ],
      [
        67,
        241
      ],
      [
        72,
        243
      ],
      [
        79,
        243
      ],
      [
        86,
        243
      ],
      [
        89,
        244
      ],
      [
        99,
        237
      ],
      [
        99,
        232
      ],
      [
        103,
        228
      ],
      [
        110,
        223
      ],
      [
        108,
        218
      ],
      [
        113,
        215
      ],
      [
        113,
        204
      ],
      [
        119,
        186
      ],
      [
        123,
        176
      ],
      [
        126,
        155
      ],
      [
        130,
        141
      ],
      [
        139,
        132
      ],
      [
        152,
        126
      ],
      [
        164,
        120
      ],
      [
        169,
        116
      ],
      [
        171,
        100
      ],
      [
        166,
        93
      ],
      [
        165,
        83
      ],
      [
        167,
        81
      ],
      [
        165,
        76
      ],
      [
        166,
        67
      ],
      [
        171,
        58
      ],
      [
        179,
        51
      ],
      [
        183,
        49
      ],
      [
        179,
        41
      ],
      [
        181,
        37
      ],
      [
        186,
        31
      ],
      [
        187,
        31
      ]
    ];
    let cordsArray1 = [
      [
        187,
        302
      ],
      [
        190,
        302
      ],
      [
        197,
        301
      ],
      [
        205,
        303
      ],
      [
        211,
        302
      ],
      [
        221,
        306
      ],
      [
        233,
        305
      ],
      [
        243,
        304
      ],
      [
        249,
        308
      ],
      [
        261,
        305
      ],
      [
        275,
        305
      ],
      [
        287,
        306
      ],
      [
        300,
        299
      ],
      [
        305,
        285
      ],
      [
        305,
        273
      ],
      [
        298,
        265
      ],
      [
        294,
        260
      ],
      [
        302,
        258
      ],
      [
        305,
        259
      ],
      [
        315,
        253
      ],
      [
        316,
        239
      ],
      [
        312,
        244
      ],
      [
        310,
        250
      ],
      [
        307,
        246
      ],
      [
        305,
        241
      ],
      [
        307,
        237
      ],
      [
        313,
        237
      ],
      [
        310,
        233
      ],
      [
        304,
        233
      ],
      [
        302,
        235
      ],
      [
        295,
        236
      ],
      [
        290,
        236
      ],
      [
        287,
        238
      ],
      [
        279,
        237
      ],
      [
        272,
        229
      ],
      [
        269,
        222
      ],
      [
        263,
        217
      ],
      [
        263,
        211
      ],
      [
        263,
        202
      ],
      [
        256,
        192
      ],
      [
        254,
        179
      ],
      [
        255,
        166
      ],
      [
        246,
        143
      ],
      [
        242,
        135
      ],
      [
        226,
        127
      ],
      [
        208,
        117
      ],
      [
        207,
        101
      ],
      [
        210,
        92
      ],
      [
        213,
        85
      ],
      [
        209,
        83
      ],
      [
        211,
        72
      ],
      [
        208,
        61
      ],
      [
        201,
        51
      ],
      [
        196,
        47
      ],
      [
        197,
        40
      ],
      [
        195,
        34
      ],
      [
        188,
        30
      ]
    ]
      ;
    let cordsArray2 = [
      [
        169,
        115
      ],
      [
        171,
        136
      ],
      [
        177,
        157
      ],
      [
        189,
        183
      ],
      [
        199,
        158
      ],
      [
        204,
        131
      ],
      [
        207,
        117
      ]
    ]
      ;
    let cordsArray3 = [
      [
        151,
        162
      ],
      [
        151,
        175
      ],
      [
        149,
        195
      ],
      [
        149,
        213
      ],
      [
        152,
        229
      ],
      [
        155,
        233
      ],
      [
        155,
        233
      ],
      [
        149,
        243
      ],
      [
        142,
        251
      ],
      [
        135,
        254
      ],
      [
        125,
        253
      ],
      [
        147,
        254
      ],
      [
        163,
        257
      ],
      [
        173,
        259
      ],
      [
        181,
        262
      ],
      [
        195,
        253
      ],
      [
        205,
        248
      ],
      [
        215,
        250
      ],
      [
        229,
        248
      ],
      [
        239,
        248
      ],

    ]
      ;
    let cordsArray4 = [
      [
        170,
        83
      ],
      [
        174,
        104
      ],
      [
        184,
        117
      ],
      [
        191,
        117
      ],
      [
        201,
        106
      ],
      [
        205,
        82
      ]
    ]
      ;
    let cordsArray5 = [
      [
        184,
        282
      ],
      [
        193,
        274
      ],
      [
        194,
        268
      ],
      [
        205,
        264
      ],
      [
        222,
        259
      ],
      [
        245,
        257
      ],
      [
        253,
        255
      ],
      [
        260,
        253
      ]
    ]
      ;

    let cordsArray6 = [];
    let cordsArray7 = [];
    let cordsArray8 = [];
    let cordsArray9 = [];
    let cordsArray10 = [];


    let arrayOfArrays = [cordsArray, cordsArray1, cordsArray2, cordsArray3, cordsArray4, cordsArray5, cordsArray6, cordsArray7, cordsArray8, cordsArray9, cordsArray10];

    let prog = 1,
      maxLevel = totalSpiritScore,
      growing = false;

    //get width of parent div
    let b = document.getElementById("constellationSpirit");
    let w = 0;
    b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
    let h = 0;

    p.getHeight = (w) => {
      if (w < 375) {
        h = w - 25;
      }
      if (w >= 375) {
        h = 350;
      }
    }

    p.getHeight(w);

    let heightScale = 1;
    let widthScale = 1;

    p.getScale = (h, w) => {
      if (h < 350) {
        heightScale = (h / 350);
      }
      if (w < 400) {
        widthScale = (w / 400);
      }
    }


    p.preload = () => {
      backgroundImage1 = p.loadImage('meditationBG.png');
    }

    p.setup = () => {
      //create a canvas instance
      p.createCanvas(w, h).parent("constellationSpirit");

      p.getScale(h, w);

      //setTimeout(p.startGrow, 1000);


      // Intersection Observer Options
      const options = {
        root: null,
        rootMargin: "0px 0px 20% 0px",
        threshold: 1.0,
      };

      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Canvas is visible
              onCanvasVisible();
            }
          });
        });
      };

      // Create an Intersection Observer
      const observer = new IntersectionObserver(callback, options);

      // Observe the canvas element
      observer.observe(document.getElementById('constellationSpirit'));

    }

    function onCanvasVisible() {
      console.log("Spirit Canvas is visible!");
      p.startGrow();
      // Perform actions when the canvas becomes visible
    }

    p.readInputs = (updateTree) => {

      if (updateTree && !growing) {
        prog = maxLevel + 1;
        p.loop();
      }
    }


    p.windowResized = () => {
      b = document.getElementById("constellationSpirit");
      b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
      p.getHeight(w);

      p.resizeCanvas(w, h);
      p.getScale(h, w);
    }


    p.draw = () => {

      p.clear();

      p.drawingContext.shadowBlur = 0;
      p.background(backgroundImage1);

      p.textSize(12);
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(0);
      p.textAlign(p.CENTER, p.BOTTOM);
      p.text("Spirit Score: " + totalSpiritScore, w / 2, 265);


      if (w < 375) {
        p.scale(widthScale + 0.05, heightScale);
      }


      p.drawPoints(0, 0);
      p.drawPoints(0, 1);

      p.noLoop();
    }


    p.drawPoints = (level, array) => {



      if (prog < level)
        return;

      if (level < maxLevel) {

        p.stroke('white');
        p.strokeWeight(3);

        p.glow(p.color(130, 184, 255, 255), 10);

        if (level < arrayOfArrays[array].length) {
          var dot = p.createVector(arrayOfArrays[array][level][0], arrayOfArrays[array][level][1]);
          p.point(dot);
          p.point(dot);
        }


        p.strokeWeight(1);
        p.stroke(p.color(255, 255, 255, 150));

        if (level >= 1 && level < arrayOfArrays[array].length) {
          p.line(arrayOfArrays[array][level - 1][0], arrayOfArrays[array][level - 1][1], arrayOfArrays[array][level][0], arrayOfArrays[array][level][1]);
        }

        p.push();
        p.drawPoints(level + 1, array);
        p.pop();

      }

      if (array == 1 && level == arrayOfArrays[1].length) {
        p.drawPoints(0, 2);
      }

      if (array == 2 && level == arrayOfArrays[2].length) {
        p.drawPoints(0, 3);
      }

      if (array == 3 && level == arrayOfArrays[3].length) {
        p.drawPoints(0, 4);
        4
      }

      if (array == 4 && level == arrayOfArrays[4].length) {
        for (var i = 5; i <= 10; i++) {
          p.drawPoints(0, i);
        }
      }

    }

    p.glow = (glowColor, blurriness) => {
      p.drawingContext.shadowColor = glowColor;
      p.drawingContext.shadowBlur = blurriness;
    }

    p.startGrow = () => {
      growing = true;
      prog = 1;
      p.grow();
    }

    p.grow = () => {
      if (prog > (maxLevel)) {
        prog = maxLevel;

        p.loop();
        growing = false;
        return;
      }

      var startTime = p.millis();
      p.loop();
      var diff = p.millis() - startTime;

      prog += 130 / 2 * Math.max(diff, 20) / 1500;
      setTimeout(p.grow, Math.max(1, 20 - diff));
    }

    p.rand2 = () => {
      return p.random(2000) / 1000 - 1;
    }

  }

  //Body Sketch
  const SketchPoints2 = (p) => {

    let backgroundImage1;


    let cordsArray = [
      [
        157,
        341
      ],
      [
        160,
        328
      ],
      [
        158,
        314
      ],
      [
        157,
        303
      ],
      [
        149,
        284
      ],
      [
        146,
        264
      ],
      [
        149,
        243
      ],
      [
        153,
        225
      ],
      [
        152,
        217
      ],
      [
        153,
        207
      ],
      [
        157,
        195
      ],
      [
        156,
        186
      ],
      [
        157,
        174
      ],
      [
        154,
        165
      ],
      [
        148,
        155
      ],
      [
        139,
        165
      ],
      [
        132,
        175
      ],
      [
        126,
        185
      ],
      [
        110,
        192
      ],
      [
        90,
        199
      ],
      [
        85,
        202
      ],
      [
        82,
        207
      ],
      [
        74,
        206
      ],
      [
        67,
        210
      ],
      [
        59,
        208
      ],
      [
        51,
        211
      ],
      [
        47,
        209
      ],
      [
        44,
        207
      ],
      [
        42,
        206
      ],
      [
        46,
        202
      ],
      [
        53,
        198
      ],
      [
        59,
        193
      ],
      [
        62,
        188
      ],
      [
        64,
        186
      ],
      [
        60,
        182
      ],
      [
        57,
        181
      ],
      [
        55,
        176
      ],
      [
        58,
        176
      ],
      [
        68,
        179
      ],
      [
        73,
        183
      ],
      [
        79,
        187
      ],
      [
        93,
        180
      ],
      [
        102,
        168
      ],
      [
        108,
        162
      ],
      [
        118,
        158
      ],
      [
        123,
        146
      ],
      [
        130,
        136
      ],
      [
        129,
        125
      ],
      [
        131,
        113
      ],
      [
        138,
        106
      ],
      [
        153,
        99
      ],
      [
        161,
        94
      ],
      [
        173,
        86
      ],
      [
        176,
        76
      ],
      [
        172,
        71
      ],
      [
        173,
        64
      ],
      [
        175,
        59
      ],
      [
        176,
        52
      ],
      [
        178,
        43
      ],
      [
        182,
        39
      ],
      [
        187,
        34
      ]

    ];
    let cordsArray1 = [
      [
        221,
        340
      ],
      [
        219,
        326
      ],
      [
        220,
        312
      ],
      [
        220,
        303
      ],
      [
        229,
        282
      ],
      [
        229,
        260
      ],
      [
        226,
        236
      ],
      [
        223,
        220
      ],
      [
        224,
        212
      ],
      [
        222,
        204
      ],
      [
        222,
        194
      ],
      [
        223,
        186
      ],
      [
        222,
        176
      ],
      [
        222,
        168
      ],
      [
        229,
        161
      ],
      [
        233,
        152
      ],
      [
        239,
        162
      ],
      [
        247,
        167
      ],
      [
        253,
        180
      ],
      [
        265,
        189
      ],
      [
        286,
        198
      ],
      [
        291,
        205
      ],
      [
        297,
        210
      ],
      [
        302,
        213
      ],
      [
        307,
        213
      ],
      [
        312,
        215
      ],
      [
        318,
        213
      ],
      [
        323,
        215
      ],
      [
        326,
        215
      ],
      [
        330,
        214
      ],
      [
        334,
        212
      ],
      [
        328,
        206
      ],
      [
        322,
        202
      ],
      [
        315,
        192
      ],
      [
        320,
        189
      ],
      [
        325,
        187
      ],
      [
        327,
        182
      ],
      [
        316,
        183
      ],
      [
        310,
        186
      ],
      [
        299,
        190
      ],
      [
        285,
        179
      ],
      [
        279,
        167
      ],
      [
        264,
        158
      ],
      [
        258,
        146
      ],
      [
        251,
        135
      ],
      [
        251,
        121
      ],
      [
        245,
        109
      ],
      [
        235,
        102
      ],
      [
        226,
        99
      ],
      [
        207,
        86
      ],
      [
        207,
        76
      ],
      [
        211,
        73
      ],
      [
        210,
        67
      ],
      [
        209,
        61
      ],
      [
        209,
        51
      ],
      [
        205,
        41
      ],
      [
        199,
        35
      ],
      [
        188,
        33
      ]

    ];
    let cordsArray2 = [
      [
        147,
        133
      ],
      [
        161,
        141
      ],
      [
        177,
        141
      ],
      [
        189,
        135
      ],
      [
        190,
        114
      ],
      [
        190,
        135
      ],
      [
        205,
        140
      ],
      [
        219,
        139
      ],
      [
        234,
        130
      ]];
    let cordsArray3 = [
      [
        188,
        154
      ],
      [
        186,
        164
      ],
      [
        179,
        168
      ],
      [
        170,
        167
      ]
    ];
    let cordsArray4 = [
      [
        187,
        174
      ],
      [
        187,
        180
      ],
      [
        181,
        185
      ],
      [
        173,
        185
      ]
    ];
    let cordsArray5 = [
      [
        193,
        164
      ],
      [
        203,
        166
      ]];

    let cordsArray6 = [
      [
        194,
        180
      ],
      [
        201,
        183
      ]
    ];
    let cordsArray7 = [
      [
        166,
        201
      ],
      [
        180,
        222
      ]
    ];
    let cordsArray8 = [
      [
        210,
        202
      ],
      [
        198,
        221
      ]
    ];
    let cordsArray9 = [
      [
        180,
        71
      ],
      [
        190,
        67
      ],
      [
        197,
        68
      ],
      [
        203,
        71
      ]
    ];
    let cordsArray10 = [
      [
        181,
        339
      ],
      [
        181,
        326
      ],
      [
        183,
        317
      ],
      [
        184,
        300
      ],
      [
        182,
        287
      ],
      [
        186,
        271
      ],
      [
        189,
        264
      ],
      [
        194,
        275
      ],
      [
        194,
        293
      ],
      [
        195,
        301
      ],
      [
        197,
        310
      ],
      [
        198,
        324
      ],
      [
        200,
        333
      ],
      [
        199,
        340
      ]
    ];


    let arrayOfArrays = [cordsArray, cordsArray1, cordsArray2, cordsArray3, cordsArray4, cordsArray5, cordsArray6, cordsArray7, cordsArray8, cordsArray9, cordsArray10];
  
    let prog = 1,
      maxLevel = totalBodyScore,
      growing = false;

    //get width of parent div
    let b = document.getElementById("constellationBody");
    let w = 0;
    b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
    let h = 0;

    p.getHeight = (w) => {
      if (w < 375) {
        h = w - 25;
      }
      if (w >= 375) {
        h = 350;
      }
    }

    p.getHeight(w);

    let heightScale = 1;
    let widthScale = 1;

    p.getScale = (h, w) => {
      if (h < 350) {
        heightScale = (h / 350);
      }
      if (w < 400) {
        widthScale = (w / 400);
      }
    }


    p.preload = () => {
      backgroundImage1 = p.loadImage('strengthBG.png');
    }

    p.setup = () => {
      //create a canvas instance
      p.createCanvas(w, h).parent("constellationBody");

      p.getScale(h, w);

      //setTimeout(p.startGrow, 1000);

      // Intersection Observer Options
      const options = {
        root: null,
        rootMargin: "0px 0px 20% 0px",
        threshold: 1.0,
      };

      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Canvas is visible
              onCanvasVisible();
            }
          });
        });
      };

      // Create an Intersection Observer
      const observer = new IntersectionObserver(callback, options);

      // Observe the canvas element
      observer.observe(document.getElementById('constellationBody'));


    }

    function onCanvasVisible() {
      console.log("Body Canvas is visible!");
      p.startGrow();
      // Perform actions when the canvas becomes visible
    }

    p.readInputs = (updateTree) => {

      if (updateTree && !growing) {
        prog = maxLevel + 1;
        p.loop();
      }
    }


    p.windowResized = () => {
      b = document.getElementById("constellationBody");
      b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
      p.getHeight(w);

      p.resizeCanvas(w, h);
      p.getScale(h, w);
    }


    p.draw = () => {
      //console.log('draw called');
      p.clear();
      p.drawingContext.shadowBlur = 0;
      p.background(backgroundImage1);

      p.textSize(12);
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(0);
      p.textAlign(p.CENTER, p.BOTTOM);
      p.text("Body Score: " + totalBodyScore, w / 2, 265);

      if (w < 375) {
        p.scale(widthScale + 0.05, heightScale);
      }


      p.drawPoints(0, 0);
      p.drawPoints(0, 1);



      p.noLoop();
    }


    p.drawPoints = (level, array) => {



      if (prog < level)
        return;

      if (level < maxLevel) {

        p.stroke('white');
        p.strokeWeight(3);

        p.glow(p.color(130, 184, 255, 255), 10);

        if (level < arrayOfArrays[array].length) {
          var dot = p.createVector(arrayOfArrays[array][level][0], arrayOfArrays[array][level][1]);
          p.point(dot);
          p.point(dot);
        }


        p.strokeWeight(1);
        p.stroke(p.color(255, 255, 255, 150));

        if (level >= 1 && level < arrayOfArrays[array].length) {
          p.line(arrayOfArrays[array][level - 1][0], arrayOfArrays[array][level - 1][1], arrayOfArrays[array][level][0], arrayOfArrays[array][level][1]);
        }

        p.push();
        p.drawPoints(level + 1, array);
        p.pop();

      }

      if (array == 1 && level == arrayOfArrays[1].length) {
        p.drawPoints(0, 2);
      }

      if (array == 2 && level == arrayOfArrays[2].length) {
        p.drawPoints(0, 3);
      }

      if (array == 3 && level == arrayOfArrays[3].length) {
        p.drawPoints(0, 4);
        4
      }

      if (array == 4 && level == arrayOfArrays[4].length) {
        for (var i = 5; i <= 10; i++) {
          p.drawPoints(0, i);
        }
      }

    }

    p.glow = (glowColor, blurriness) => {
      p.drawingContext.shadowColor = glowColor;
      p.drawingContext.shadowBlur = blurriness;
    }

    p.startGrow = () => {
      growing = true;
      prog = 1;
      p.grow();
    }

    p.grow = () => {
      if (prog > (maxLevel)) {
        prog = maxLevel;

        p.loop();
        growing = false;
        return;
      }

      var startTime = p.millis();
      p.loop();
      var diff = p.millis() - startTime;

      prog += 130 / 2 * Math.max(diff, 20) / 1500;
      setTimeout(p.grow, Math.max(1, 20 - diff));
    }

    p.rand2 = () => {
      return p.random(2000) / 1000 - 1;
    }

  }
 
  //Mind Sketch
  const SketchPoints3 = (p) => {

    let backgroundImage1;


    let cordsArray = [[
      187,
      306
    ],
    [
      173,
      305
    ],
    [
      167,
      301
    ],
    [
      156,
      296
    ],
    [
      132,
      297
    ],
    [
      105,
      302
    ],
    [
      78,
      304
    ],
    [
      45,
      303
    ],
    [
      81,
      274
    ],
    [
      109,
      244
    ],
    [
      132,
      241
    ],
    [
      151,
      235
    ],
    [
      170,
      236
    ],
    [
      181,
      244
    ],
    [
      186,
      252
    ],
    [
      192,
      241
    ],
    [
      213,
      233
    ],
    [
      229,
      238
    ],
    [
      257,
      244
    ],
    [
      296,
      280
    ],
    [
      323,
      306
    ],
    [
      281,
      304
    ],
    [
      250,
      298
    ],
    [
      223,
      295
    ],
    [
      204,
      298
    ],
    [
      198,
      304
    ],
    [
      187,
      305
    ]];
    let cordsArray1 = [[
      185,
      202
    ],
    [
      181,
      200
    ],
    [
      178,
      196
    ],
    [
      174,
      194
    ],
    [
      171,
      189
    ],
    [
      173,
      186
    ],
    [
      171,
      183
    ],
    [
      173,
      179
    ],
    [
      171,
      174
    ],
    [
      172,
      171
    ],
    [
      168,
      166
    ],
    [
      169,
      154
    ],
    [
      164,
      145
    ],
    [
      158,
      137
    ],
    [
      154,
      127
    ],
    [
      153,
      116
    ],
    [
      155,
      108
    ],
    [
      160,
      100
    ],
    [
      168,
      91
    ],
    [
      178,
      86
    ],
    [
      188,
      86
    ],
    [
      199,
      90
    ],
    [
      207,
      97
    ],
    [
      213,
      105
    ],
    [
      215,
      116
    ],
    [
      215,
      127
    ],
    [
      212,
      134
    ],
    [
      205,
      144
    ],
    [
      201,
      154
    ],
    [
      201,
      167
    ],
    [
      197,
      171
    ],
    [
      198,
      175
    ],
    [
      196,
      178
    ],
    [
      198,
      181
    ],
    [
      196,
      184
    ],
    [
      198,
      188
    ],
    [
      196,
      191
    ],
    [
      196,
      194
    ],
    [
      192,
      195
    ],
    [
      191,
      198
    ],
    [
      186,
      201
    ]];
    let cordsArray2 = [[
      216,
      83
    ],
    [
      230,
      65
    ]];
    let cordsArray3 = [[
      45,
      302
    ],
    [
      79,
      282
    ],
    [
      105,
      277
    ],
    [
      131,
      271
    ],
    [
      155,
      269
    ],
    [
      173,
      275
    ],
    [
      185,
      291
    ],
    [
      201,
      271
    ],
    [
      219,
      268
    ],
    [
      245,
      275
    ],
    [
      270,
      282
    ],
    [
      294,
      286
    ],
    [
      320,
      305
    ]];
    let cordsArray4 = [[
      151,
      84
    ],
    [
      133,
      67
    ]];
    let cordsArray5 = [[
      231,
      105
    ],
    [
      267,
      91
    ]];
    let cordsArray6 = [[
      141,
      104
    ],
    [
      101,
      87
    ]];
    let cordsArray7 = [[
      137,
      133
    ],
    [
      97,
      152
    ]];
    let cordsArray8 = [[
      228,
      133
    ],
    [
      271,
      148
    ]];
    let cordsArray9 = [];
    let cordsArray10 = [[
      184,
      69
    ],
    [
      185,
      39
    ]];


    let arrayOfArrays = [cordsArray, cordsArray1, cordsArray2, cordsArray3, cordsArray4, cordsArray5, cordsArray6, cordsArray7, cordsArray8, cordsArray9, cordsArray10];

    let prog = 1,
      maxLevel = totalMindScore,
      growing = false;


    //get width of parent div
    let b = document.getElementById("constellationMind");
    let w = 0;
    b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
    let h = 0;

    p.getHeight = (w) => {
      if (w < 375) {
        h = w - 25;
      }
      if (w >= 375) {
        h = 350;
      }
    }

    p.getHeight(w);

    let heightScale = 1;
    let widthScale = 1;

    p.getScale = (h, w) => {
      if (h < 350) {
        heightScale = (h / 350);
      }
      if (w < 400) {
        widthScale = (w / 400);
      }
    }


    p.preload = () => {
      backgroundImage1 = p.loadImage('knowledgeBG.png');
    }

    p.setup = () => {
      //create a canvas instance
      p.createCanvas(w, h).parent("constellationMind");

      p.getScale(h, w);


      // Intersection Observer Options
      const options = {
        root: null,
        rootMargin: "0px 0px 20% 0px",
        threshold: 1.0,
      };

      

      const callback = (entries, observer) => {
        entries.forEach((entry) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Canvas is visible
              onCanvasVisible();
            }
          });
        });
      };

      // Create an Intersection Observer
      const observer = new IntersectionObserver(callback, options);

      // Observe the canvas element

      observer.observe(document.getElementById('constellationMind'));

    }

    function onCanvasVisible() {
      console.log("Mind Canvas is visible!");
      p.startGrow();
      // Perform actions when the canvas becomes visible
    }

    p.readInputs = (updateTree) => {

      if (updateTree && !growing) {
        prog = maxLevel + 1;
        p.loop();
      }
    }


    p.windowResized = () => {
      b = document.getElementById("constellationMind");
      b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
      p.getHeight(w);

      p.resizeCanvas(w, h);
      p.getScale(h, w);
    }


    p.draw = () => {
      //console.log('draw called');
      p.clear();
      p.drawingContext.shadowBlur = 0;
      p.background(backgroundImage1);

      p.textSize(12);
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(0);
      p.textAlign(p.CENTER, p.BOTTOM);
      p.text("Mind Score: " + totalMindScore, w / 2, 265);

      if (w < 375) {
        p.scale(widthScale + 0.05, heightScale );
      }

      p.drawPoints(0, 0);
      p.drawPoints(0, 1);
      

      p.noLoop();
    }


    p.drawPoints = (level, array) => {

      if (prog < level)
        return;

      if (level < maxLevel) {

        p.stroke('white');
        p.strokeWeight(3);

        p.glow(p.color(130, 184, 255, 255), 10);

        if (level < arrayOfArrays[array].length) {
          var dot = p.createVector(arrayOfArrays[array][level][0], arrayOfArrays[array][level][1]);
          p.point(dot);
          p.point(dot);
        }


        p.strokeWeight(1);
        p.stroke(p.color(255, 255, 255, 150));

        if (level >= 1 && level < arrayOfArrays[array].length) {
          p.line(arrayOfArrays[array][level - 1][0], arrayOfArrays[array][level - 1][1], arrayOfArrays[array][level][0], arrayOfArrays[array][level][1]);
        }

        p.push();
        p.drawPoints(level + 1, array);
        p.pop();

      }

      if (array == 1 && level == arrayOfArrays[1].length) {
        p.drawPoints(0, 2);
      }

      if (array == 2 && level == arrayOfArrays[2].length) {
        p.drawPoints(0, 3);
      }

      if (array == 3 && level == arrayOfArrays[3].length) {
        p.drawPoints(0, 4);
        4
      }

      if (array == 4 && level == arrayOfArrays[4].length) {
        for (var i = 5; i <= 10; i++) {
          p.drawPoints(0, i);
        }
      }

    }

    p.glow = (glowColor, blurriness) => {
      p.drawingContext.shadowColor = glowColor;
      p.drawingContext.shadowBlur = blurriness;
    }


    p.startGrow = () => {
      growing = true;
      prog = 1;
      p.grow();
    }

    p.grow = () => {
      if (prog > (maxLevel)) {
        prog = maxLevel;

        p.loop();
        growing = false;
        return;
      }

      var startTime = p.millis();
      p.loop();
      var diff = p.millis() - startTime;

      prog += 130 / 2 * Math.max(diff, 20) / 1500;
      setTimeout(p.grow, Math.max(1, 20 - diff));
    }

    p.rand2 = () => {
      return p.random(2000) / 1000 - 1;
    }

  }


  useEffect(() => {

    if (renderConstellations !== '') {

      const pointsP5 = new p5(SketchPoints);
      const pointsP52 = new p5(SketchPoints2);
      const pointsP53 = new p5(SketchPoints3);

      return () => { pointsP5.remove(), pointsP52.remove(), pointsP53.remove(); }
    }

  }, [renderConstellations]);


  return (
    <div className='w-full min-h-screen pb-20 bg-gradient-to-b from-white via-blue-200 to-[#ceecfa] flex flex-col items-center'>
      
      {/* Welcome text */}
      <div className='px-5 pt-10 pb-2 sm:px-10 flex flex-col justify-center items-center'>
        <h1 className='font-BrushFont text-7xl sm:text-8xl'><span className=''>{todaysDay}</span></h1>
        <p className='text-wrap text-gray-500 break-words italic text-lg font-medium max-w-4xl'>{todaysDateFull}</p>
      </div>


      {/* Main Container */}
      <div className='min-h-screen flex flex-col items-center mx-2 sm:mx-5 mb-10'>

        {/* Stats Container */}
        <div className='p-2 mt-2 flex flex-col gap-10 max-w-5xl'>

          {/* Habits Timeline */ }
          <Timeline tasks={timelineHabits} />

                    {/* Constellation and Task/Habit Statistics container */}
          <div id="constellationHolder" className='w-full flex justify-center sm:justify-around flex-wrap'>

            <div id="constellationSpirit" className='my-5 min-w-[300px] flex flex-col-reverse items-center gap-5'>

              {/* Spirit Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between'>
                  <div className=''>
                    <h3 className='text-lg'><span className='text-2xl font-semibold'>{completedSpiritHabits}</span> habits</h3>
                  </div>
                  <BsYinYang className='bg-sky-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {spiritHabitsLastWeek} / {totalspiritHabits}
                  </span>
                  <div className='text-gray-500'>Updated within past 7 days</div>
                </div>
              </div>

              {/* Spirit SubGoals Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between items-center'>
                  <div className='w-8/12'>
                    <h3 className='text-lg'><span className='text-green-500 font-bold'>{completedSpiritSubgoals}</span> / <span className='text-gray-600 font-bold'>{totalSpiritSubgoals}</span> tasks</h3>
                    {/* Spirit Goals Loading Bar */}
                    <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-400`}>
                      <div className='mx-1 my-[2px] w-full bg-indigo-50'>
                        <div style={totalSpiritSubgoals !== 0 ? { width: `${Math.trunc((completedSpiritSubgoals / totalSpiritSubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                        </div>
                      </div>
                    </div>
                  </div>
                  <BsYinYang className='bg-sky-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {spiritSubgoalsLastMonth}
                  </span>
                  <div className='text-gray-500'>Last month</div>
                </div>
              </div>

            </div>

            <div id="constellationBody" className='my-5 min-w-[300px] flex flex-col-reverse items-center gap-5'>
              
              {/* Body Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between'>
                  <div className=''>
                    <h3 className='text-lg'><span className='text-2xl font-semibold'>{completedBodyHabits}</span> habits</h3>
                  </div>
                  <FaDumbbell className='bg-orange-300 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {bodyHabitsLastWeek} / {totalbodyHabits}
                  </span>
                  <div className='text-gray-500'>Updated within past 7 days</div>
                </div>
              </div>

              {/* Body SubGoals Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between items-center'>
                  <div className='w-8/12'>
                    <h3 className='text-lg'><span className='text-green-500 font-bold'>{completedBodySubgoals}</span> / <span className='text-gray-600 font-bold'>{totalBodySubgoals}</span> tasks</h3>
                    {/* Body Goals Loading Bar */}
                    <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-400`}>
                      <div className='mx-1 my-[2px] w-full bg-indigo-50'>
                        <div style={totalBodySubgoals !== 0 ? { width: `${Math.trunc((completedBodySubgoals / totalBodySubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FaDumbbell className='bg-orange-300 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {bodySubgoalsLastMonth}
                  </span>
                  <div className='text-gray-500'>Last month</div>
                </div>
              </div>




            </div>

            <div id="constellationMind" className='my-5 min-w-[300px] flex flex-col-reverse items-center gap-5'>

              {/* Mind Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between'>
                  <div className=''>
                    <h3 className='text-lg'><span className='text-2xl font-semibold'>{completedMindHabits}</span> habits</h3>
                  </div>
                  <FaBrain className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {mindHabitsLastWeek} / {totalmindHabits}
                  </span>
                  <div className='text-gray-500'>Updated within past 7 days</div>
                </div>
              </div>


              {/* Mind SubGoals Card */}
              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md bg-white border-2 border-gray-100'>
                <div className='flex justify-between items-center'>
                  <div className='w-8/12'>
                    <h3 className=' text-lg'><span className='text-green-500 font-bold'>{completedMindSubgoals}</span> / <span className='text-gray-600 font-bold'>{totalMindSubgoals}</span> tasks</h3>
                    {/* Mind Goals Loading Bar */}
                    <div className={`w-full mb-2 flex justify-center items-center rounded-md shadow-md bg-gradient-to-r from-green-500 to-blue-400`}>
                      <div className='mx-1 my-[2px] w-full bg-indigo-50'>
                        <div style={totalMindSubgoals !== 0 ? { width: `${Math.trunc((completedMindSubgoals / totalMindSubgoals) * 100)}%` } : { width: `0%` }} className={` h-5 bg-green-300 transition-all duration-500 ease-in`}>
                        </div>
                      </div>
                    </div>
                  </div>
                  <FaBrain className='bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg' />
                </div>
                <div className='flex gap-2 text-sm'>
                  <span className='text-green-500 flex items-center'>
                    <HiArrowNarrowUp />
                    {mindSubgoalsLastMonth}
                  </span>
                  <div className='text-gray-500'>Last month</div>
                </div>
              </div>


            </div>
            
          </div>

          {/* Habits Table Container */}
          <div className='min-h-16 pb-8 flex flex-col bg-white rounded-md gap-1'>

            {/* Description */}

            <div className='flex justify-between p-3 font-semibold'>
              <h1 className='text-center text-md p-2 text-gray-500'>Todays Habit Tasks</h1>
              
              <Link to={"/profile?tab=habits"}><Button outline gradientDuoTone='cyanToBlue'>See all</Button></Link>
              
            </div>

            <div className='grid grid-cols-[15%_auto] md:grid-cols-[7%_auto] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
              <span>Time</span>
              <span className='justify-self-center'>Task</span>
            </div>

            {/* Map of Habits */}
            {timelineHabits.map((habit) => (
              <>
                <div className='group/item' key={habit._id}>

                  <div className='grid grid-cols-[25%_10%_auto] sm:grid-cols-[20%_5%_auto] items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                    {/* Time - Icon - Task */}

                    <div className={``}> {habit.timeofday}</div>

                    <div className={``}>{habit.icon}</div>

                    <div className='font-semibold my-2 text-wrap break-words pr-2 sm:pr-0' onClick={() => {
                      setShowModalOverview(true);
                      setFormDataDays(habit.daysofweek);
                      setFormDataCompleted(habit.datescompleted);
                      setFormDataOverview({ title: habit.title, category: habit.category, icon: habit.icon, timeofday: habit.timeofday, daysofweek: habit.daysofweek, datescompleted: habit.datescompleted });
                    }}>
                      {habit.title}
                    </div>

                    <div className='flex justify-self-end items-center justify-center'>

                    </div>

                  </div>

                </div>
              </>
            ))}

          </div>

          
          {/* Newest/Oldest Tasks Container */}
          <div>

              {/* Latest Subgoals Table Container */}
              <div className='min-h-16 pb-8 flex flex-col bg-white rounded-t-md gap-1'>

                {/* Description */}

                <div className='flex justify-between p-3 font-semibold'>
                  <h1 className='text-center text-md p-2 text-gray-500'>Tasks</h1>

                    <Dropdown label="" renderTrigger={() => <Button outline gradientDuoTone='cyanToBlue' >See all</Button>} center>
                    <Link to={'/profile?tab=mind&view=goals'}>
                    <Dropdown.Item icon={FaBrain}>Mind</Dropdown.Item>
                    </Link>
                    <Link to={'/profile?tab=body&view=goals'}>
                    <Dropdown.Item icon={FaDumbbell}>Body</Dropdown.Item>
                    </Link>
                    <Link to={'/profile?tab=spirit&view=goals'}>
                    <Dropdown.Item icon={BsYinYang}>Spirit</Dropdown.Item>
                    </Link>
                  </Dropdown>

                </div>

                <div className='flex justify-start mx-2 sm:mx-4 font-semibold'>
                  <h1 className='flex items-center text-md p-2 text-green-500'>Most recent tasks <HiArrowNarrowUp className='' /></h1>
                </div>

                <div className='grid grid-cols-[auto_auto_auto] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
                  <span className='justify-self-start'>Category</span>
                  <span className='justify-self-center'>Task Title</span>
                  <span className='justify-self-end'>Created On</span>

                </div>

              {/* Map of Latest Subgoals */}
              {latestSubgoals.map((subgoal) => (
                <>
                  <div className='group/item' key={subgoal._id}>

                    <div className='grid grid-cols-[12%_auto_24%] sm:grid-cols-[20%_auto_20%] items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                      {/* Category - Subgoal Name */}

                      <div className={`text-sm sm:text-base ${categoryText[subgoal.category]}`}>
                        {categoryIcon[subgoal.category]}
                      </div>

                      <div className='font-semibold my-2 text-wrap break-words pr-2 sm:pr-0 justify-self-start lg:justify-self-center'>
                        {subgoal.title}
                      </div>

                      <div className='justify-self-end text-sm sm:text-base text-end'>
                        {moment(subgoal.createdAt).format('MMM DD YYYY')}
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>
            {/* End of Latest Subgoals Table Container */}


            {/* Oldest Subgoals Table Container */}
            <div className='min-h-16 pb-8 flex flex-col bg-white rounded-b-md gap-1'>

              {/* Description */}

                <div className='flex justify-start mx-2 sm:mx-4 font-semibold'>
                  <h1 className='flex items-center text-md p-2 text-red-500'>Oldest tasks <HiArrowNarrowDown className=''/></h1>
              </div>

              <div className='grid grid-cols-[auto_auto_auto] font-bold items-center rounded-t-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-200'>
                <span className='justify-self-start'>Category</span>
                <span className='justify-self-center'>Task Title</span>
                <span className='justify-self-end'>Created On</span>
              </div>

              {/* Map of Oldest Subgoals */}
              {oldestSubgoals.map((subgoal) => (
                <>
                  <div className='group/item' key={subgoal._id}>

                    <div className='grid grid-cols-[12%_auto_24%] sm:grid-cols-[20%_auto_20%] items-center rounded-md mx-2 px-2 py-1 sm:mx-4 bg-indigo-50'>

                      {/* Category - Subgoal Name - Date */}

                      <div className={`text-sm sm:text-base ${categoryText[subgoal.category]}`}>
                        {categoryIcon[subgoal.category]}
                      </div>

                      <div className='font-semibold my-2 text-wrap break-words pr-2 sm:pr-0 justify-self-start lg:justify-self-center'>
                        {subgoal.title}
                      </div>

                      <div className='justify-self-end text-sm sm:text-base text-end'>
                        {moment(subgoal.createdAt).format('MMM DD YYYY')}
                      </div>

                    </div>

                  </div>
                </>
              ))}

            </div>
            {/* End of Oldest Subgoals Table Container */}
          </div>





        </div>
        {/* End of Stats Container */}

      </div>    
      {/* End of Main Container */}

      {/* OVERVIEW Habit Modal */}
      <Modal
        show={showModalOverview}
        onClose={() => setShowModalOverview(false)}
        popup
        size='lg'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>

            <h3 className='text-xl text-gray-700'>
              {formDataOverview.icon} {formDataOverview.title}
            </h3>
            <span className='font-semibold text-gray-600'>
              Time <span className='font-normal'>{formDataOverview.timeofday}</span>
            </span>

            <div className='flex flex-col items-center'>

              <span className={`${categoryText[formDataOverview.category]} my-5 text-4xl`}>{categoryIcon[formDataOverview.category]}</span>

              <span className='font-semibold'>Streaks: </span>
              <div className='flex flex-wrap gap-2 mt-1 mb-4'>
                <span>Current Streak: <span className='font-bold'>{summaryData.currentStreak}</span></span>
                <span>Longest Streak: <span className='font-bold'>{summaryData.longestStreak}</span></span>
              </div>


              <div className='mb-4'>
                <Calendar value={value} tileClassName={tileClassName} />
              </div>

              <span className='font-semibold'>Days To Complete On: </span>
              <div className='flex flex-wrap justify-center gap-2 mt-1 mb-4'>
                {formDataDays.length == 7 ?
                  <span>
                    Everyday
                  </span>
                  :
                  <>
                    {formDataDays.map((day, index) => (
                      <div key={index}>
                        {day}
                      </div>
                    ))}
                  </>
                }
              </div>

              <Popover
                aria-labelledby="default-popover"
                content={
                  <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
                    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                      <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">Completed On:</h3>
                    </div>
                    <div className='flex flex-wrap justify-center gap-2 mx-2 my-4'>
                      {formDataCompleted.map((dateCompleted, index) => (
                        <div key={index} >
                          {dateCompleted}
                        </div>
                      ))}
                    </div>
                  </div>
                }
                placement="top"
              >
                <span className='font-semibold py-1 px-2 border rounded-md cursor-pointer text-gray-500'>See all dates completed </span>
              </Popover>

            </div>

            <div className='my-5 flex justify-center gap-4'>
              <Button color='gray' onClick={() => {
                setShowModalOverview(false);
                setFormDataOverview({});
                setFormDataDays([]);
              }}>
                Close Overview
              </Button>
            </div>




            {publishError && (
              <Alert className='mt-5' color='failure'>
                {publishError}
              </Alert>
            )}

          </div>
        </Modal.Body>
      </Modal>

    </div>

  )
}