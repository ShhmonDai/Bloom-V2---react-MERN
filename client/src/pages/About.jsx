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
      slider_right;

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
      label_colLeft,
      label_colRight,
      label_colMiddle,
      label_glow,
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
      randSeed;
      
    let colLeft;
    let colMiddle;
    let colRight;
    let glow;

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
    b.clientWidth < 800 ? (w = b.clientWidth) : (w = 800);
    let h = 0;

    p.getHeight = (w) => {
      if (w <= 400) {
        h = 330;
      }

      else if (w / 2 <= 800) {
        h = w / 1.4;

      }

      if (w > 800) {
        h = 600;
      }
    }

    p.getHeight(w);

    let treeScale = 1;

    p.getScale = (h) => {
      if (h < 580) {
        treeScale = (h / 580 - 0.1);
      }

    }

    p.getScale(h);

    const Y_AXIS = 1;

    var backgroundImage = p.loadImage('SpiritTreeBackground.png');


    p.setup = () => {

      b = document.getElementById("treeHolder");
      b.clientWidth < 800 ? (w = b.clientWidth) : (w = 800);
      console.log('width: ' + w);
      console.log('height: ' + h);
      p.getHeight(w);
      p.getScale(h);
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
      slider_seed = p.createSlider(80, 398, 80, 1);
      slider_seed.position();
      slider_seed.id('slidersIndex');
      slider_seed.parent("div_Settings");
      label_seed = p.createSpan('Seed');
      label_seed.position();
      label_seed.parent("div_Settings");


      //Seed slider. Usable seeds: 80, 398
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

      b.clientWidth < 800 ? (w = b.clientWidth) : (w = 800);


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

      glow = slider_glow.value();

      if (updateTree && !growing) {
        prog = maxLevel + 1;
        p.loop();
      }
    }



    p.windowResized = () => {
      b = document.getElementById("treeHolder");
      b.clientWidth < 800 ? (w = b.clientWidth) : (w = 800);
      p.getHeight(w);

      p.resizeCanvas(w, h);

      p.getScale(h);

      console.log('width: ' + w);
      console.log('height: ' + h);
    }

    p.draw = () => {

      p.clear();
      //p.background(220, 0);

      p.background(backgroundImage);
      //p.background('#ffffff');
      //p.setGradient(0, 0, w, h, colorTop, colorBottom, Y_AXIS);


      //p.stroke('#2b4e46');


      p.translate(w / 2, h);



      p.scale(treeScale, -treeScale);

      //console.log('Tree Scale: ' + treeScale);

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

    p.setGradient = (x, y, w, h, c1, c2, axis) => {
      p.noFill();

      if (axis === Y_AXIS) {
        // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
          let inter = p.map(i, y, y + h, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(x, i, x + w, i);
        }
      } else if (axis === X_AXIS) {
        // Left to right gradient
        for (let i = x; i <= x + w; i++) {
          let inter = p.map(i, x, x + w, 0, 1);
          let c = p.lerpColor(c1, c2, inter);
          p.stroke(c);
          p.line(i, y, i, y + h);
        }
      }
    }

  }


  useEffect(() => {

    const myP5 = new p5(Sketch);

    return () => myP5.remove();

  }, [currentUser]);





  return (
    <div className='min-h-screen w-full flex flex-col items-center pb-40 '>
    
      <div className='text-md flex flex-col gap-6 max-w-7xl pt-10 sm:mx-5 px-10 sm:px-20 md:px-40 text-left text-gray-900 dark:text-gray-400 dark:bg-black dark:bg-opacity-40'>

          <h1 className='text-3xl dark:text-white font-semibold text-center mt-7 '>
            Welcome to Bloom!
          </h1>

          <h1 className='text-3xl dark:text-white font-semibold text-center mb-7 '>
            A goal tracking website meant to help you visualize and see your progress!
          </h1>
            <p>
              The purpose of Bloom is to provide a way to visualy track your progress within three separate life categories: Mental, Physical and Spiritual,
              since we often cannot see our individual progress until we step back and take a look at the bigger picture. The reason for the three categories
              is to provide us a way to compare our progress between them in order to help us become a well-rounded person. Our method of visualization is a little
              tree that grows with you as you accomplish your goals and habits 
            </p>

            <p className='font-bold'>Bloom's Trees are created using P5.JS canvas. The shape is made up of many variables such as: <br /> <br /></p>

            <p className='text-left px-5 sm:px-10'>
              <b>Size</b> - the general scale of tree while keeping proportions, <br />
              <b>Recursion Level</b> - the number of branch levels, <br />
              <b>Length Variation</b> - the variation in length of branches, <br />
              <b>Split Probability</b> - probability that a branch will split into multiple branches, <br />
              <b>Flower Probabilty</b> - probability that a flower will appear at a branch level.<br /> <br />
            </p>

            <p>And hidden variables such as the <b>Seed</b> of the random functions which control how the tree will shape up in the end.
            Not all Seeds produce a pretty tree so I've preselected certain Seeds that produce better visuals.</p>

      </div>


      {/* Tree Playground */}
      <div className='min-w-[360px] pt-10 flex flex-col justify-center'>

        <h1 className='text-3xl dark:text-white font font-semibold text-center mt-7 '>
          P5.js Playground:
        </h1>

        {/* Tree container */}
        <div id="treeHolder" className='min-w-[360px] bg-white flex justify-center items-center'></div>
        <div id="SpiritUnderTree" className='mt-[-1px] flex justify-center items-center bg-white mb-2'>
          <img src="/SpiritUnderTree.png" alt='under tree picture' className=' w-fit' />
        </div>

        {/* Button Container */}
        <div id="buttonHolder" className=''>
          {/* Tree Sliders Container */}
          <div id="sliderHolder"></div>
        </div>

        <h1 className='text-3xl dark:text-white font font-semibold text-center my-10 '>
          Create your own tree!
        </h1>


      </div>
    </div>
  );
}