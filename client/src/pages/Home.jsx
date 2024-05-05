import React, { useEffect } from 'react';
import p5 from 'p5';

export default function Home() {


  const myRef = React.createRef();

  const Sketch = (p) => {

    const PI = 3.1416;

    var slider_size,
      slider_level,
      slider_rot,
      slider_lenRand,
      slider_branchProb,
      slider_rotRand,
      slider_Count,
      slider_leafProb;

    var button_seed,
    button_hide,
      button_newSeed,
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
      label_source,
      label_source2,
      label_Count;

    var div_inputs;

    var input_seed,
      size,
      maxLevel,
      rot,
      lenRand,
      branchProb,
      rotRand,
      leafProb;

    var hide = true,
      prog = 1,
      growing = false,
      //mutating = false,
      randSeed = 80,
      //paramSeed = Math.floor(Math.random() * 1000),
      randBias = 0;


    //get width of parent div
    let b = document.getElementById("treeHolder");
    let w = b.clientWidth;
    let h = 0;
    
    p.getHeight = (w) => {
      if (w <= 400) {
        h = 330;
      }
      
      else if (w / 2 <= 650) {
        h = w / 1.2;
        
      }

      if (w > 650) {
        h = 650;
      }
    }

    p.getHeight(w);

    let treeScale = 1;

    p.getScale = (h) => { 
      if (h < 580) {
        treeScale = (h / 580);
      }
  
    }

    p.getScale(h);

    var bg = p.loadImage('treeBG.png');

    const Y_AXIS = 1;
    //var b1, b2;

    p.setup = () => {

      console.log('width: ' + w);
      console.log('height: ' + h);
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


      //Read inputs of sliders initial values ? 
      slider_size.input(p.getInputs = () => { p.readInputs(true) });
      slider_level.input(p.getInputs = () => { p.readInputs(true) });
      slider_lenRand.input(p.getInputs = () => { p.readInputs(true) });
      slider_branchProb.input(p.getInputs = () => { p.readInputs(true) });
      slider_Count.input(p.getInputs = () => { p.readInputs(true) });
      slider_leafProb.input(p.getInputs = () => { p.readInputs(true) });


      button_seed = p.createButton('MAKE IT BLOOM!');
      button_seed.position();
      button_seed.parent("buttonHolder");
      button_seed.id('growButton');
      button_seed.mousePressed(p.buttonGrow = () => {p.startGrow()});

      button_hide = p.createButton('CREATE A SEED');
      button_hide.position();
      button_hide.parent("buttonHolder");
      button_hide.id('hideButton');
      button_hide.mousePressed(p.buttonHide = () => {p.showHide()});




      // button_randomParams = createButton('Set level to 0.72');
      // button_randomParams.position(10, 1200);
      // button_randomParams.mousePressed(function () {



      //     slider_level.value(13);

      //     readInputs(true);
      // });

      //Darker Color
      //b1 = p.color(39, 40, 39);
      // b2 = color(125, 169, 154);

      //Lighter Color
      //b2 = p.color(56, 134, 151);

      //div_inputs = createDiv('ooga');

      //mX = mouseX;
      //mY = mouseY;
      //panX = 0;
      //panY = 0;


      
      
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


      //Dynamic Values
      //completedCount = slider_Count.value();
      size = slider_size.value();
      maxLevel = slider_level.value();
      lenRand = slider_lenRand.value();
      branchProb = slider_branchProb.value();
      leafProb = slider_leafProb.value();

      if (updateTree && !growing) {
        prog = maxLevel + 1;
        p.loop();
      }
    }



    p.windowResized = () => {
      b = document.getElementById("treeHolder");
      w = b.clientWidth;

      p.getHeight(w);

      p.resizeCanvas(w, h);

      p.getScale(h);

      console.log('width: ' + w);
      console.log('height: ' + h);
    }

    p.draw = () => {

      // stroke(255, 255, 255);
      p.background(bg);
      //setGradient(0, 0, width, height, b2, b1, Y_AXIS);
      p.stroke('#2b4e46');

      // background(33, 66, 62);
      p.translate(w / 2, h);



      p.scale(treeScale, -treeScale);

      console.log('Tree Scale: ' + treeScale);

      p.translate(0, 0);

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

      p.strokeWeight(15 * Math.pow((maxLevel - level + 1) / maxLevel, 2));

      var len = growthLevel * size * (1 + p.rand2() * lenRand);

      p.line(0, 0, 0, len / level);
      p.translate(0, len / level);


      var doBranch1 = p.rand() < branchProb;
      var doBranch2 = p.rand() < branchProb;

      var doLeaves = p.rand() < leafProb;

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
        p.stroke(240 + 15 * p.rand2(), 140 + 15 * p.rand2(), 140 + 15 * p.rand2());

        p.rotate(-PI);
        for (var i = 0; i <= 8; i++) {
          p.line(0, 0, 0, flowerSize * (1 + 0.5 * p.rand2()));
          p.rotate(2 * PI / 8);
        }
      }
    }

    p.startGrow = () => {
      growing = true;
      prog = 1;
      p.grow();
    }

    p.grow = () => {
      if (prog > (maxLevel + 3)) {
        prog = maxLevel + 3;
        p.loop();
        growing = false;
        return;
      }

      var startTime = p.millis();
      p.loop();
      var diff = p.millis() - startTime;

      prog += maxLevel / 8 * Math.max(diff, 20) / 200;
      setTimeout(p.grow, Math.max(1, 20 - diff));
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

  useEffect(() => {
    const myP5 = new p5(Sketch)
  }, []);

  return (
    <div className='w-full min-h-screen dark:bg-white'>


      {/* Intro Container */}
      <div className='dark:bg-white dark:bg-opacity-100 mx-auto pb-10 px-5 flex flex-col justify-center'>

        <div id="treeHolder" className='mobile sm:small md:medium lg:large'></div>
        <div id="underTree">
          <img src="/underTree.png" alt='under tree picture' />
        </div>

        <div id="buttonHolder" className='mb-20'> 
          <div id="sliderHolder"></div>
        </div>

        <div className='flex justify-center mb-10'>
 
          <div className='text-md text-center max-w-4xl flex flex-col gap-4 text-gray-800 dark:text-gray-400'>

              <h1 className='text-3xl dark:text-white font font-semibold text-center mt-7 '>
                Welcome to Bloom!
              </h1>

              <h1 className='text-2xl dark:text-white font font-semibold text-center '>
                A goal tracking website meant to help you visualize and see your progress!
              </h1>
              <p className='text-left px-5 sm:px-10'>
                The purpose of Bloom is to provide a way to visualy track your progress within three separate life categories: Mental, Physical and Spiritual,
                since we often cannot see our individual progress until we step back and take a look at the bigger picture. The reason for the three categories
                is to provide us a way to compare our progress between them in order to help us become a well-rounded person. Our method of visualization is a little
                tree that grows with you as you accomplish your goals and habits
              </p>

            <h1 className='text-2xl dark:text-white font font-semibold text-center mt-10 px-5 sm:px-10 '>
                Click the "Create a Seed" button for a preview of the tree creation process. 
                Watch it grow in real time with the Bloom button.
              </h1>
              <p className='text-left px-5 sm:px-10'>
              Bloom's Trees are created using P5.JS canvas. The shape is made up of many variables such as: <br /> <br />
              <b>Size</b> - the general scale of tree while keeping proportions, <br />
              <b>Recursion Level</b> - the number of branch levels, <br />
              <b>Length Variation</b> - the variation in length of branches, <br />
              <b>Split Probability</b> - probability that a branch will split into multiple branches, <br />
              <b>Flower Probabilty</b> - probability that a flower will appear at a branch level.<br /> <br />
              And hidden variables such as the <b>Seed</b> of the random functions which control how the tree will shape up in the end. 
              Not all Seeds produce a pretty tree so I've preselected certain Seeds that produce better visuals.
              </p>

            </div>

        </div>


      </div>
    </div>
  )
}
