import React, { useEffect } from 'react';
import p5 from 'p5';

import { RiTreeFill } from "react-icons/ri";
import { MdOutlineChecklist } from "react-icons/md";
import { FaBrain, FaDumbbell } from "react-icons/fa";
import { BsYinYang } from "react-icons/bs";
import { MdOutlineArtTrack } from "react-icons/md";
import { Link } from 'react-router-dom';

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
      label_seed,
      label_hide,
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


    var bg = p.loadImage('MainTreeBackground.png');

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



      button_seed = p.createButton('Regrow Tree');
      button_seed.position();
      button_seed.parent("buttonHolder");
      button_seed.id('growButton');
      button_seed.mousePressed(p.buttonGrow = () => {p.startGrow()});
      

      button_hide = p.createButton('Show inputs');
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
      b.clientWidth < 800 ? (w = b.clientWidth) : (w = 800);
      p.getHeight(w);

      p.resizeCanvas(w, h);

      p.getScale(h);

      //console.log('width: ' + w);
      //console.log('height: ' + h);
    }

    p.draw = () => {

      // stroke(255, 255, 255);
      p.background(bg);
      //setGradient(0, 0, width, height, b2, b1, Y_AXIS);
      p.stroke('#2b4e46');

      // background(33, 66, 62);
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
    const myP5 = new p5(Sketch);

    return () => myP5.remove();
  }, []);

  return (
    <div className='w-full min-h-screen dark:bg-white'>


      {/* Intro Container */}
      <div className='dark:bg-white dark:bg-opacity-100 mx-auto flex flex-col justify-center'>

        <div id="treeHolder" className='bg-white flex justify-center items-center'></div>
        <div id="underTree" className='mt-[-1px] flex justify-center items-center bg-white'>
          <img src="/MainUnderTree.png" alt='under tree picture' />
        </div>

        <div id="buttonHolder" className='mb-20'> 
          <div id="sliderHolder"></div>
        </div>

        <div className='flex flex-col justify-center items-center pb-20 bg-gradient-to-b from-white via-blue-100 to-blue-50'>
 
          <div className='text-md text-center max-w-6xl flex flex-col gap-10 px-3 sm:px-5 text-gray-800 pb-10 '>

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

              <div >
                <img src="/mockup.png" alt='mockup' className='rounded-lg' />
                <h3 className='text-md font-light text-gray-400'>Pictured: Bloom viewed on different devices</h3>
              </div>

          </div>

          <div className='text-md text-center max-w-4xl flex flex-col gap-4 px-5 text-gray-800 '>

              <div className='text-left px-5 sm:px-10 text-wrap break-words whitespace-pre-wrap flex flex-col gap-4'>

                <h1 className='text-2xl font-semibold flex flex-col text-center items-center mt-7'>
                Cultivate Mind, Nourish Body, Ignite Spirit!
                </h1>

                <p className=' text-center'>
                  In Bloom, we believe in holistic growth, which is why we categorize goals and habits into three distinct 
                  yet interconnected categories: mind, body, and spirit.

                </p>

                <div className='flex flex-col md:flex-row max-w-4xl gap-2'> 
                <img src="/1a.png" alt='mind' className=' md:w-[33%] rounded-lg'/>
                <img src="/1b.png" alt='body' className=' md:w-[33%] rounded-lg' />
                <img src="/1c.png" alt='spirit' className=' md:w-[33%] rounded-lg' /> 
                </div>
                  <p className='font-semibold text-lg text-center pb-10'> 
                    Each category has it's own tree which will grow with you as you accomplish the goals and habits under it's category!
                  </p>

                <p className='flex flex-col'>
                  <span className='flex flex-row items-center justify-center'><FaBrain className='inline'/><b> Mind </b></span> 
                  This category focuses on mental well-being, cognitive development, and intellectual pursuits.
                  Goals and habits related to learning new skills, expanding knowledge, practicing mindfulness, and 
                  improving mental health fall under this category.
                </p> 

                <p className='flex flex-col'>
                <span className='flex flex-row items-center justify-center'><FaDumbbell className='inline' /><b> Body </b></span> 
                  The body category encompasses physical health, fitness, nutrition, and overall well-being. 
                  Goals and habits here revolve around exercise, diet, sleep hygiene, and self-care practices. 
                </p> 

                <p className='flex flex-col'>
                <span className='flex flex-row items-center justify-center'><BsYinYang className='inline' /><b> Spirit </b></span> 
                  Spirituality, personal values, and emotional well-being form the foundation of the spirit category.
                  Goals and habits in this realm include cultivating gratitude, fostering meaningful relationships, practicing self-reflection, 
                  and connecting with something greater than oneself.
                </p> 

                <p className='font-semibold py-5'>
                  By categorizing goals and habits into mind, body, and spirit, Bloom empowers users to address all aspects of
                  their well-being and achieve balanced growth in their lives.
                </p>
              </div>

          </div>

          <div className='text-md text-center max-w-4xl flex flex-col gap-4 sm:px-5 text-gray-800 '>
            <div className='rounded-t-[50px] pb-10 mt-10 bg-gradient-to-b from-blue-200 via-transparent to-transparent flex flex-col gap-4'>

              <h1 className='text-3xl font-semibold flex flex-col text-center items-center mt-7'>

                <MdOutlineChecklist className='text-center text-3xl text-blue-500 my-2' />

                Cultivate Your Success,
                <h1>one goal at a time</h1>
              </h1>

              <p className='text-left px-5 sm:px-10 flex flex-col gap-2'>
                With Bloom, you can:

                <span><b>1.</b> Define overarching goals for each of the: mind, body, and spirit categories.</span>

                <span><b>2.</b> Break down goals into actionable steps or tasks.</span>

                <span><b>3.</b> Add detailed notes to track progress and insights.</span>
              </p>  

              <div className='flex flex-col gap-10 px-2 py-5'>
                <img className='border-4 border-white rounded-lg shadow-lg' src="/2a.png" alt='goal' />
                <img className='border-4 border-white rounded-lg shadow-lg' src="/2b.png" alt='goal' />
                <img className='border-4 border-white rounded-lg shadow-lg' src="/2c.png" alt='goal' />
                <img className='border-4 border-white rounded-lg shadow-lg' src="/2d.png" alt='goal' />
              </div>

              <h1 className='text-3xl font-semibold flex flex-col text-center items-center mt-7 gap-2 '>

                <MdOutlineArtTrack className='text-center text-4xl text-blue-500' />

                Your Personal Growth Garden
              </h1>

              <p className='text-left px-5 sm:px-10 text-wrap break-words whitespace-pre-wrap flex flex-col gap-4'>
              <span>
              In Bloom, tracking daily habits is effortless and insightful. You can easily input your <b>daily habits</b>, 
              whether it's reading, exercising, or meditating, and mark them as completed with a simple tap.
              </span>

              <span>
              Bloom motivates by showcasing <b>streaks</b>, highlighting how many consecutive days 
              you've successfully completed each habit. This visual representation encourages consistency and 
              helps you stay on track with your goals.
              </span>

              <span>
                  Additionally, Bloom provides a <b>daily timeline</b> feature, offering a snapshot of the your day ahead. 
              With this feature, you can plan their day effectively, allocating time for your habits, work commitments, 
              personal tasks, and leisure activities. By visualizing your schedule, you can optimize your time and prioritize tasks accordingly.
              </span>

              <span>
                  Moreover, Bloom allows you to <b>plan out your entire week</b> in advance. By setting goals and scheduling habits for each day of the week, 
              you can establish a structured routine and maintain consistency in your behaviors. 
              This comprehensive planning feature empowers you to take control of your time and progress towards your goals with purpose and clarity.
              </span>
              </p>

              <div className='flex flex-col gap-10 px-2 py-5'>
                <img className='border-4 border-white rounded-lg shadow-lg' src="/3a.png" alt='habit' />
                <img className='border-4 border-white rounded-lg shadow-lg' src="/3b.png" alt='habit' />
                <img className='border-4 border-white rounded-lg shadow-lg' src="/3c.png" alt='habit' />
                <img className='border-4 border-white rounded-lg shadow-lg' src="/3d.png" alt='habit' />
              </div>
              </div>

              <div className='flex flex-col items-center px-5 sm:px-10 gap-4 mt-7 '>

                <RiTreeFill className='text-6xl text-blue-500'/>

                <h1 className='text-3xl font-semibold text-center'>
                  Why wait to transform your life? 
                </h1>

                <p className='text-center'>
                  Sign up to Bloom today and start cultivating the habits that will 
                  shape your future. With Bloom's intuitive tools and visual progress tracking, you'll be amazed at how 
                  quickly you can turn your aspirations into reality. 
                  Don't delay - your journey to a better you starts now!
                </p>

              <Link to='/sign-up'><button type='button' className='bg-blue-500 text-white rounded px-4 py-2'>Try Bloom for Free</button></Link>

              </div>
          </div>


        </div>


      </div>
    </div>
  )
}
