import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import p5 from 'p5';

export default function About() {

  const { currentUser, error, loading } = useSelector(state => state.user);

  const Sketch = (p) => {

    const PI = 3.1416;

    var slider_size,
      slider_level,
      slider_rot,
      slider_lenRand,
      slider_branchProb,
      slider_rotRand,
      slider_Count,
      slider_leafProb,
      slider_seed,
      slider_glow,
      slider_left,
      slider_middle,
      slider_right,
      slider_BG;

    var button_seed,
      button_hide,
      button_nextSeed,
      button_randomParams,
      button_change;

    var label_size,
      label_level,
      label_rot,
      label_lenRand,
      label_branchProb,
      label_rotRand,
      label_leafProb,
      label_perf,
      label_seed,
      label_colLeft,
      label_colRight,
      label_colMiddle,
      label_glow,
      label_BG,
      label_Count;

    var div_inputs;

    var 
      input_seed,
      size,
      maxLevel,
      rot,
      lenRand,
      branchProb,
      rotRand,
      leafProb,
      leafProb2 = 0.01,
      bgSliderValue,
      randSeed;
      
    let colLeft;
    let colMiddle;
    let colRight;
    let glow;

    let backgroundImage1,
    backgroundImage2,
    backgroundImage3;

    var hide = true,
      prog = 1,
      growing = false,
      //mutating = false,
      //paramSeed = Math.floor(Math.random() * 1000),
      //randSeed = input_seed,
      randBias = 0;




    //get width of parent div
    let b = document.getElementById("treeHolder");
    let w = 0;
    b.clientWidth < 650 ? (w = b.clientWidth) : (w = 650);
    let h = 0;

    p.getHeight = (w) => {
      if (w <= 400) {
        h = 400;
      }

      else if (w / 2 <= 650) {
        h = w / 1.1;

      }

      if (w > 650) {
        h = 720;
      }
    }

    p.getHeight(w);

    let treeScale = 1;

    p.getScale = (h) => {
      if (h < 720) {
        treeScale = (h / 720 - 0.1);
      }

    }

    p.getScale(h);

    const Y_AXIS = 1;

    p.preload = () => {
      backgroundImage1 = p.loadImage('mindBG.png');
      backgroundImage2 = p.loadImage('bodyBG.png');
      backgroundImage3 = p.loadImage('spiritBG.png');
      
    }

    p.setup = () => {

  
      //create a canvas instance
      p.createCanvas(w, h).parent("treeHolder");



      div_inputs = p.createDiv('');
      div_inputs.id('div_Settings');
      div_inputs.parent("sliderHolder");
      div_inputs.style('visibility', 'hidden');

      //size
      slider_size = p.createSlider(100, 150, 140, 1);
      slider_size.position();
      slider_size.id('slidersIndex');
      slider_size.parent("div_Settings");
      label_size = p.createSpan('Size');
      label_size.position();
      label_size.parent("div_Settings");

      //recursion level
      slider_level = p.createSlider(1, 14, 13, 1);
      slider_level.position();
      slider_level.id('slidersIndex');
      slider_level.parent("div_Settings");
      label_level = p.createSpan('Recursion level');
      label_level.position();
      label_level.parent("div_Settings");

      //length variation
      slider_lenRand = p.createSlider(0, 1.2, 1.2, 0.01);
      slider_lenRand.position();
      slider_lenRand.id('slidersIndex');
      slider_lenRand.parent("div_Settings");
      label_lenRand = p.createSpan('Length variation');
      label_lenRand.position();
      label_lenRand.parent("div_Settings");

      //split probability
      slider_branchProb = p.createSlider(0.72, 1, 0.93, 0.01);
      slider_branchProb.position();
      slider_branchProb.id('slidersIndex');
      slider_branchProb.parent("div_Settings");
      label_branchProb = p.createSpan('Split probability');
      label_branchProb.position();
      label_branchProb.parent("div_Settings");

      //Goals completed count
      slider_Count = p.createSlider(0, 100, 0, 1);
      slider_Count.position(-50, -50);

      //flower probability
      slider_leafProb = p.createSlider(0, 0.45, 0.45, 0.01);
      slider_leafProb.position();
      slider_leafProb.id('slidersIndex');
      slider_leafProb.parent("div_Settings");
      label_leafProb = p.createSpan('Flower probability');
      label_leafProb.position();
      label_leafProb.parent("div_Settings");

      //Seed slider. Usable seeds: 80, 398
      slider_seed = p.createSlider(80, 1600, 192, 1);
      slider_seed.position();
      slider_seed.id('slidersIndex');
      slider_seed.parent("div_Settings");
      label_seed = p.createSpan('Seed');
      label_seed.position();
      label_seed.parent("div_Settings");

      button_nextSeed = p.createButton('Next Seed');
      button_nextSeed.position(110);
      button_nextSeed.parent("div_Settings");
      button_nextSeed.id('nextSeedButton');
      button_nextSeed.mousePressed(p.buttonNext = () => { slider_seed.value(slider_seed.value() + 1);
        p.readInputs(true);
       });
      


      //Color sliders in RGB format. Left=R, Middle=G, Right=B
      slider_left = p.createSlider(1, 255, 235, 1);
      slider_left.position();
      slider_left.id('slidersIndex');
      slider_left.parent("div_Settings");
      label_colLeft = p.createSpan('color R');
      label_colLeft.position();
      label_colLeft.parent("div_Settings");

      slider_middle = p.createSlider(1, 255, 230, 1);
      slider_middle.position();
      slider_middle.id('slidersIndex');
      slider_middle.parent("div_Settings"); 
      label_colMiddle = p.createSpan('color G');
      label_colMiddle.position();
      label_colMiddle.parent("div_Settings");

      slider_right = p.createSlider(1, 255, 250, 1);
      slider_right.position();
      slider_right.id('slidersIndex');
      slider_right.parent("div_Settings");
      label_colRight = p.createSpan('color B');
      label_colRight.position();
      label_colRight.parent("div_Settings");

      slider_glow = p.createSlider(1, 255, 250, 1);
      slider_glow.position();
      slider_glow.id('slidersIndex');
      slider_glow.parent("div_Settings");
      label_glow = p.createSpan('glow');
      label_glow.position();
      label_glow.parent("div_Settings");

      slider_BG = p.createSlider(1, 3, 3, 1);
      slider_BG.position();
      slider_BG.id('slidersIndex');
      slider_BG.parent("div_Settings");
      label_BG = p.createSpan('Background');
      label_BG.position();
      label_BG.parent("div_Settings");

      //Read inputs of sliders initial values ? 
      slider_size.input(p.getInputs = () => { p.readInputs(true) });
      slider_level.input(p.getInputs = () => { p.readInputs(true) });
      slider_lenRand.input(p.getInputs = () => { p.readInputs(true) });
      slider_branchProb.input(p.getInputs = () => { p.readInputs(true) });
      slider_Count.input(p.getInputs = () => { p.readInputs(true) });
      slider_leafProb.input(p.getInputs = () => { p.readInputs(true) });
      slider_seed.input(p.getInputs = () => { p.readInputs(true) });
      slider_left.input(p.getInputs = () => { p.readInputs(true) });
      slider_middle.input(p.getInputs = () => { p.readInputs(true) });
      slider_right.input(p.getInputs = () => { p.readInputs(true) });
      slider_glow.input(p.getInputs = () => { p.readInputs(true) });
      slider_BG.input(p.getInputs = () => { p.readInputs(true) });


      button_seed = p.createButton('Grow');
      button_seed.position();
      button_seed.parent("buttonHolder");
      button_seed.id('growButton');
      button_seed.mousePressed(p.buttonGrow = () => { p.startGrow() });

      button_hide = p.createButton('Variables');
      button_hide.position();
      button_hide.parent("buttonHolder");
      button_hide.id('hideButton');
      button_hide.mousePressed(p.buttonHide = () => { p.showHide() });

      p.readInputs(false);
      p.startGrow();

    }


    p.showHide = () => {
      if (hide == true) {
        p.showUI();

      }
      else {
        p.hideUI();

      }
    }

    p.showUI = () => {

      div_inputs.style('visibility', 'initial');
      hide = false;
    }

    p.hideUI = () => {

      div_inputs.style('visibility', 'hidden');
      hide = true;
    }


    p.readInputs = (updateTree) => {
      //Static Values
      rot = ((PI / 2) / 4 - 0.05);
      rotRand = 0.10;

      b.clientWidth < 650 ? (w = b.clientWidth) : (w = 650);

      


      //Dynamic Values
      //completedCount = slider_Count.value();
      size = slider_size.value();
      maxLevel = slider_level.value();
      lenRand = slider_lenRand.value();
      branchProb = slider_branchProb.value();
      leafProb = slider_leafProb.value();
      randSeed = slider_seed.value();

      colLeft = slider_left.value();
      colMiddle = slider_middle.value();
      colRight = slider_right.value();

      bgSliderValue = slider_BG.value();

      console.log('randSeed:' + randSeed);

      glow = slider_glow.value();

      if (updateTree && !growing) {
        leafProb2 = leafProb;
        prog = maxLevel + 1;
        p.loop();
      }
    }



    p.windowResized = () => {
      b = document.getElementById("treeHolder");
      b.clientWidth < 650 ? (w = b.clientWidth) : (w = 650);
      p.getHeight(w);

      p.resizeCanvas(w, h);

      p.getScale(h);

      console.log('width: ' + w);
      console.log('height: ' + h);
    }

    p.draw = () => {

      p.clear();
      //p.background(220, 0);

      if (bgSliderValue === 1) {
        p.background(backgroundImage1);
      } 

      if (bgSliderValue === 2) {
        p.background(backgroundImage2);
      } 

      if (bgSliderValue === 3) {
        p.background(backgroundImage3);
      } 


      //p.background('#ffffff');
      //p.setGradient(0, 0, w, h, colorTop, colorBottom, Y_AXIS);


      //p.stroke('#2b4e46');


      p.translate(w / 2, h / 1.27);

      p.scale(treeScale, -treeScale);

      p.branch(1, randSeed);

      p.noLoop();
    }

    p.branch = (level, seed) => {
      if (prog < level)
        return;

      p.randomSeed(seed);



      var seed1 = p.random(1000),
        seed2 = p.random(1000);

      var growthLevel = (prog - level > 1) || (prog >= maxLevel + 1) ? 1 : (prog - level);



      var len = growthLevel * size * (1 + p.rand2() * lenRand);


      let col = p.map((10 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), 1, 10, colLeft, 255);

 
      p.drawingContext.shadowBlur = p.map((10 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), 1, 10, 0, 20);
      p.drawingContext.shadowColor = p.color(col, colMiddle, colRight, glow);


      p.strokeWeight(15 * Math.pow((maxLevel - level + 1) / maxLevel, 2));
      p.stroke(col, colMiddle, colRight, 255)
      p.line(0, 0, 0, len / level);

      p.drawingContext.shadowBlur = 0;

      p.translate(0, len / level);


      var doBranch1 = p.rand() < branchProb;
      var doBranch2 = p.rand() < branchProb;

      var doLeaves = p.rand() < leafProb2;
      


      if (level < maxLevel) {

        var r1 = rot * (1 + p.rrand() * rotRand);
        var r2 = -rot * (1 - p.rrand() * rotRand);

        if (doBranch1) {
          p.push();
          p.rotate(r1);
          p.branch(level + 1, seed1);
          p.pop();
        }
        if (doBranch2) {
          p.push();
          p.rotate(r2);
          p.branch(level + 1, seed2);
          p.pop();
        }
      }

      if ((level >= maxLevel || (!doBranch1 && !doBranch2)) && doLeaves) {
        var cunt = Math.min(1, Math.max(0, prog - level));

        var flowerSize = (size / 100) * cunt * (1 / 6) * (len / level);

        p.strokeWeight(4);
        p.stroke(110 + 15 * p.rand2(), 120 + 15 * p.rand2(), 220 + 15 * p.rand2());

        p.rotate(-PI);
        for (var i = 0; i <= 8; i++) {
          p.line(0, 0, 0, flowerSize * (1.2 + 0.5 * p.rand2()));
          p.rotate(2 * PI / 8);
        }
      }


    }

    p.startGrow = () => {
      growing = true;
      leafProb2 = 0.01;
      prog = 1;
      p.grow();
    }

    p.drawLeaves = () => {
      if (leafProb2 < leafProb) {
        leafProb2 = leafProb2 + 0.01;
      }
    }

    p.grow = () => {
      if (prog > (maxLevel + 16)) {
        prog = maxLevel + 16;
        
        p.loop();
        growing = false;
        return;
      }

      var startTime = p.millis();
      p.loop();
      var diff = p.millis() - startTime;

      prog += maxLevel / 16 * Math.max(diff, 20) / 100;
      setTimeout(p.grow, Math.max(1, 20 - diff));
      setTimeout(p.drawLeaves, 1700);
    }

    p.randBark = () => {
      return p.random(25, 100);
    }

    p.rand = () => {
      return p.random(1000) / 1000;
    }

    p.rand2 = () => {
      return p.random(2000) / 1000 - 1;
    }

    p.rrand = () => {
      return p.rand2() + randBias;
    }


  }

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
    let selectedArray = 0;

    let prog = 1,
    maxLevel = 100,
    growing = false;

    //get width of parent div
    let b = document.getElementById("treeHolder2");
    let w = 0;
    b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
    let h = 0;

    p.getHeight = (w) => {
      if (w < 375) {
        h = w-25;
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
      p.createCanvas(w, h).parent("treeHolder2");

      p.getScale(h, w);

      let button = p.createButton('Save Line to PC').parent("buttonHolder2");
      button.position(-20, 0, 'relative');
      button.mousePressed(p.buttonClicked);

      let button2 = p.createButton('Undo Point').parent("buttonHolder2");
      button2.position(0, 0, 'relative');
      button2.mousePressed(p.undo);

      let button4 = p.createButton('Prev Line').parent("buttonHolder2");
      button4.position(20, 0, 'relative');
      button4.mousePressed(p.prevArray);

      let button3 = p.createButton('Next Line').parent("buttonHolder2");
      button3.position(40, 0, 'relative');
      button3.mousePressed(p.nextArray);

      let button5 = p.createButton('Grow').parent("buttonHolder2");
      button5.position(0, 50, 'relative');
      button5.mousePressed(p.startGrow);

      setTimeout(p.startGrow, 1000);

    }

    p.readInputs = (updateTree) => {

      if (updateTree && !growing) {
        prog = maxLevel + 1;
        p.loop();
      }
    }

    
    p.windowResized = () => {
      b = document.getElementById("treeHolder2");
      b.clientWidth < 375 ? (w = b.clientWidth) : (w = 375);
      p.getHeight(w);

      p.resizeCanvas(w, h);
      p.getScale(h, w);
    }
    
   
    p.draw = () => {
      //console.log('draw called');
      p.clear();
      p.drawingContext.shadowBlur = 0;
      //p.scale(1);
      p.background(backgroundImage1);
      p.strokeWeight(1);
      p.stroke(p.color(255, 255, 255, 50));
      p.line(w/2,0, w/2, h);

      
      //p.fill(255, 60, 100);
      //p.text("(" + p.round(p.mouseX) + ", " + p.round(p.mouseY) + ")", p.mouseX, p.mouseY);
      //p.stroke(p.color(255,255,255,50));
      //p.strokeWeight(1);
      
      p.textSize(15);
      p.fill(255);
      p.stroke(0);
      p.strokeWeight(4);
      p.textAlign(p.CENTER, p.TOP);
      p.text("Line selected: " + selectedArray, w/2, 20);

      
      if (w < 375){
        p.scale(widthScale + 0.05, heightScale + 0.02);
      }


      p.drawPoints(0, 0);
      p.drawPoints(0, 1);

      /*var counter = 0;

      var looper = setInterval(function () {
        counter++;
        console.log("Counter is: " + counter);

        if (counter >= 5) {
          clearInterval(looper);
        }

      }, 3000);

      */

      p.noLoop();
    }
    

    p.drawPoints = (level, array) => {

     

        if (prog < level)
          return;
        
        if (level < maxLevel) {
          
          p.stroke('white');
          p.strokeWeight(3);
          
          p.glow(p.color(130, 184, 255, 255), 10);
          
          if (level < arrayOfArrays[array].length){
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
          p.drawPoints(level +1, array);
          p.pop();

        }

        if (array == 1 && level == arrayOfArrays[1].length){
          p.drawPoints(0, 2);
        }

        if (array == 2 && level == arrayOfArrays[2].length){
          p.drawPoints(0, 3);
        }

        if (array == 3 && level == arrayOfArrays[3].length) {
          p.drawPoints(0, 4);
  4     }

        if (array == 4 && level == arrayOfArrays[4].length) {
          for (var i = 5; i <= 10; i++){
            p.drawPoints(0, i);
          }
        }
          
    }
      
      p.glow = (glowColor, blurriness) => {
        p.drawingContext.shadowColor = glowColor;
        p.drawingContext.shadowBlur = blurriness;
    }

    p.mousePressed = () => {
      if (p.mouseX > 0 && p.mouseX < w && p.mouseY > 0 && p.mouseY < h) {
        var cords = [p.round(p.mouseX), p.round(p.mouseY)]; 
        arrayOfArrays[selectedArray].push(cords);
        p.readInputs(true);
      }
    }

    p.undo = () => {
        arrayOfArrays[selectedArray].pop();
        p.readInputs(true);
    }

    p.buttonClicked = () => {
      p.saveJSON(arrayOfArrays[selectedArray], `numbers${selectedArray}.json`);
    }

    p.nextArray = () => {
      if (selectedArray != 10) {
        selectedArray = selectedArray + 1;
      }
      else {
        selectedArray = 0;
      }
      p.readInputs(true);
    }

    p.prevArray = () => {
      if (selectedArray != 0) {
        selectedArray = selectedArray - 1;
      }
      else {
        selectedArray = 10;
      }
      p.readInputs(true);
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

      prog += maxLevel / 2 * Math.max(diff, 20) / 1500;
      setTimeout(p.grow, Math.max(1, 20 - diff));
    }

    p.rand2 = () => {
      return p.random(2000) / 1000 - 1;
    }



  }


  useEffect(() => {

    const myP5 = new p5(Sketch);

    const pointsP5 = new p5(SketchPoints);

    return () => {myP5.remove(), pointsP5.remove();}


  }, [currentUser]);





  return (
    <div className='w-full min-h-screen dark:bg-white pb-20'>

      <div className='text-md flex flex-col items-center justify-center mx-auto gap-2 max-w-5xl px-5 sm:px-10 text-left text-gray-900 dark:text-gray-400 dark:bg-black dark:bg-opacity-40'>

        <h1 className='text-3xl lg:text-5xl font-bold text-center mt-7'>
          Track, Achieve, Thrive:
          <h1>
            Bloom your way to success
          </h1>
        </h1>

        <h1 className='text-xl text-center text-gray-600 sm:px-10'>
          Welcome to Bloom, your personal growth companion! Watch your aspirations take root and flourish into reality
          as each goal accomplished adds a vibrant leaf
          to your thriving tree of progress. With Bloom, cultivate habits, track goals,
          and witness your journey towards success unfold in a visually captivating way.
        </h1>


        <h1 className='text-3xl dark:text-white font-semibold text-center mt-10 '>
          What is Bloom?
        </h1>

        <h2 className='text-xl dark:text-white text-center '>
          Bloom is a goal, habits and journal tracking website meant to help you visualize and see your progress!
        </h2>


        <h1 className='text-3xl dark:text-white font-semibold text-center mt-10 '>
          Behind the tech
        </h1>

        <h2 className='text-xl dark:text-white '>Bloom's Trees are created recursively using P5.JS canvas. The shape is made up of many variables such as: </h2>

        <p className='text-xl py-5 text-gray-600 text-left px-5'>
          <b>Size</b> - the general scale of tree while keeping proportions, <br />
          <b>Recursion Level</b> - the number of branch levels, <br />
          <b>Length Variation</b> - the variation in length of branches, <br />
          <b>Split Probability</b> - probability that a branch will split into multiple branches, <br />
          <b>Flower Probabilty</b> - probability that a flower will appear at a branch level.<br />
        </p>

        <h2 className='text-xl dark:text-white '>And hidden variables such as the <b>Seed</b> of the random functions which control how the tree will shape up in the end.
          Not all Seeds produce a pretty tree so I've preselected certain Seeds that produce better visuals.</h2>

        <h1 className='text-3xl dark:text-white font font-semibold text-center mt-20 '>
          Try out the Tree Creator
        </h1>
        <h2 className='text-xl dark:text-white mb-10'>
          Click on Variables to open options. Click on Grow to see the tree grow in real time.
        </h2>

      </div>

      {/* Intro Container */}
      <div className='dark:bg-white dark:bg-opacity-100 mx-auto flex flex-col justify-center'>

        <div id="treeHolder" className='bg-white flex justify-center items-center'></div>

        <div id="buttonHolder" className='mb-10'>
          <div id="sliderHolder"></div>
        </div>



      </div>  

      <div className='dark:bg-white dark:bg-opacity-100 mx-auto max-w-5xl sm:px-10 gap-2 flex flex-col justify-center mt-10'> 

        <h1 className='text-3xl dark:text-white font-semibold text-center mt-10 '>
          Constellation Coordinates Creator
        </h1>

        <h2 className='text-xl dark:text-white text-center mb-5'>Tool I've made for generating coordinates for the progressively drawn dashboard category statistics pictures.
          You can click on the picture to trace lines and save the lines' coordinates to PC as a JSON file, which can later be exported to the drawings.  </h2>

        <h2 className='text-xl dark:text-white text-center mb-10'>In the future this lineart will be progressively drawn over the picture based on users progress in its category </h2>

        <div id="treeHolder2" className='mt-5 bg-white flex justify-center flex-wrap'></div>
        <div id="buttonHolder2" className='mb-10 flex justify-center'></div>

      </div>
        

  </div>      
  );
}