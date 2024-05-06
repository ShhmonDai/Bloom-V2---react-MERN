import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import p5 from 'p5';



export default function ProfileBody() {


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
    
    const Y_AXIS = 1;

    var backgroundImage = p.loadImage('treeBGBody.png');

    
    var colorTop = p.color(83, 137, 166);
    var colorBottom = p.color(166, 220, 238);

    const light = ['#ECE4B7', '#F1FFFA', '#FDFFFF', '#C5EFCB', '#EAF2EF'];
    const dark1 = ['#364652', '#6461A0', '#570000', '#540D6E', '#D2E4C4', '#3D3B30', '#F6D8AE', '#161032', '#020402', '#912F56'];
    
    let randomColorNum;
    let padding = -35;


    p.setup = () => {

      console.log('width: ' + w);
      console.log('height: ' + h);

      //create a canvas instance
      p.createCanvas(w, h).parent("treeHolder");

      //slider holder
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
      button_seed.mousePressed(p.buttonGrow = () => { p.startGrow() });

      button_hide = p.createButton('CREATE A SEED');
      button_hide.position();
      button_hide.parent("buttonHolder");
      button_hide.id('hideButton');
      button_hide.mousePressed(p.buttonHide = () => { p.showHide() });




      p.readInputs(false);
      p.startGrow();

      p.pixelDensity(3)
      randomColorNum = p.floor(p.random(light.length))
    



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

      p.clear();
      //p.background(backgroundImage);
      p.background(220, 0);
      //p.background('#2E4057');

      
      //p.stroke('#1f1d1a');
      //p.underGround(padding);
      p.stroke('#1b4017');
      p.grassFlower(padding);
      
    
      //p.setGradient(0, 0, w, h, colorTop, colorBottom, Y_AXIS);
      
      p.translate(w / 2, h);

      p.scale(treeScale, -treeScale);
      
      p.stroke('#F6D8AE');
      p.shiningObject();
      
      p.branch(1, randSeed);
      

      p.noLoop();

    }

    p.branch = (level, seed) => {
      if (prog < level)
        return;

      p.stroke('#5e5447');
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
        p.stroke(215 + 15 * p.rand2(), 175 + 15 * p.rand2(), 115 + 15 * p.rand2());

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

    p.shiningObject = () => {
      p.push()

      // setup
      const sunBeamWith = p.random(.15, .45)
      p.translate(w/2.6, h/1.3)


      //sun


      // first part of the sun
      p.fill(0, 0, 0, 0)
      p.strokeWeight(sunBeamWith / 3)
      let sunFirstPart = p.random(75, 100)
      let numLines1 = p.random(350, 450)
      for (let i = 0; i < numLines1; i++) {

        // calculate the angle for each line
        let angle = i * p.TWO_PI / numLines1

        // ranodm extention
        let offsetEnd = p.random(25, 45)

        // calculate the x-coordinate of the end point
        let x = (sunFirstPart + offsetEnd) * p.cos(angle)

        // calculate the y-coordinate of the end point  
        let y = (sunFirstPart + offsetEnd) * p.sin(angle)

        // draw
        p.handDrawnLine(0, 0, x, y, .1)

      }

      // second part of the sun
      //p.fill(light[randomColorNum])
      p.strokeWeight(0)
      p.circle(0, 0, sunFirstPart * 2.2)
      p.fill(0, 0, 0, 0)
      p.strokeWeight(sunBeamWith / 2)
      let numLines2 = p.random(350, 450)
      for (let i = 0; i < numLines2; i++) {

        // calculate the angle for each line
        let angle = i * p.TWO_PI / numLines2

        // ranodm extention
        let offsetEnd = p.random(10, 25)

        // calculate the x-coordinate of the end point
        let x = (sunFirstPart + offsetEnd) * p.cos(angle)

        // calculate the y-coordinate of the end point  
        let y = (sunFirstPart + offsetEnd) * p.sin(angle)

        // draw
        p.handDrawnLine(0, 0, x, y, .1)

      }

      // third part of the sun
      //p.fill('#2E4057')
      p.strokeWeight(0)
      p.circle(0, 0, sunFirstPart * 1.5)
      p.fill(0, 0, 0, 0)
      p.strokeWeight(sunBeamWith)
      let numLines3 = p.random(250, 350)
      for (let i = 0; i < numLines3; i++) {

        // calculate the angle for each line
        let angle = i * p.TWO_PI / numLines3

        // ranodm extention
        let offsetEnd = p.random(10, 25)

        // calculate the x-coordinate of the end point
        let x = (sunFirstPart / 1.5 + offsetEnd) * p.cos(angle)

        // calculate the y-coordinate of the end point  
        let y = (sunFirstPart / 1.5 + offsetEnd) * p.sin(angle)

        // draw
        p.handDrawnLine(0, 0, x, y, .1)

      }

      // final
      p.fill('#ffffff')
      p.strokeWeight(sunBeamWith * 1.5)
      p.circle(0, 0, sunFirstPart / 1.5)


      p.pop()
    }

    p.twistedVertex = (_sx, _sy, _ex, _ey, _t) => {
      const dLen = p.dist(_sx, _sy, _ex, _ey) * _t
      const secL = p.random(0.2, 0.4)
      const trdL = secL * 2.0
      p.vertex(_sx, _sy)
      p.bezierVertex(
        p.lerp(_sx, _ex, secL) + p.random(-1.0, 1.0) * dLen,
        p.lerp(_sy, _ey, secL) + p.random(-1.0, 1.0) * dLen,
        p.lerp(_sx, _ex, trdL) + p.random(-1.0, 1.0) * dLen,
        p.lerp(_sy, _ey, trdL) + p.random(-1.0, 1.0) * dLen,
        _ex,
        _ey
      )
    }
    p.handDrawnLine = (x1, y1, x2, y2, t) => {
      p.beginShape()
      p.twistedVertex(x1, y1, x2, y2, t)
      p.endShape()
    }
    p.handDrawnFlower = (x1, y1, x2, y2, t) => {
      p.beginShape()
      p.twistedVertex(x1, y1, x2, y2, t)
      p.endShape()

      p.push()
      p.fill(dark1[randomColorNum])
      p.circle(x2, y2, p.random(3, 5))
      p.pop()

    }

    p.underGround = (ground) => {
      p.push()

      // move horizontal line
      p.translate(0, -ground)
      p.fill(0, 0, 0, 0)
      p.strokeWeight(1.25)
      for (let x = 0; x < w; x += p.random(3, 5)) {
        p.handDrawnLine(x, h - p.random(5, 15) - h / 100, x, h, .1)
        p.handDrawnLine(x, h - p.random(5, 15) - h / 25, x, h - p.random(5, 15) - h / 100, .1)
        p.handDrawnLine(x, h - p.random(5, 15) - h / 15, x, h - p.random(5, 15) - h / 25, .1)
        p.handDrawnLine(x, h - h / 10, x, h - p.random(5, 15) - h / 15, .1)
      }

      p.pop()
    }
    p.grassFlower = (ground) => {
      p.push()

      // move horizontal line
      p.translate(0, -ground)
      p.fill(0, 0, 0, 0)

      // grass
      p.strokeWeight(.5)
      for (let x = 0; x < w; x += p.random(1.5)) {
        p.handDrawnLine(x, h - h / 19, x + p.random(-5, 5), h - h / 8 - p.noise(x / 5) * 60 + 30, .1)
      }

      // flowers
      p.strokeWeight(1)
      for (let x = 0; x < w; x += p.random(150)) {
        p.handDrawnFlower(x, h - h / 10, x + p.random(-15, 15), h - h / 5 - p.noise(x) * 70 + 50, p.random(.15, .20))
      }

      p.pop()
    }

  }

  useEffect(() => {
    const myP5 = new p5(Sketch)
  }, []);



  return (
    <div className='w-full min-h-screen'>


      {/* Intro Container */}
      <div className=' mx-auto pb-10 flex flex-col justify-center'>

        <div id="treeHolder" className='border-b-2 border-slate-800 mb-2'></div>


        <div id="buttonHolder" className='mb-20'>
          <div id="sliderHolder"></div>
        </div>

      </div>
    </div>
  )
}