import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import p5 from 'p5';

export default function ProfileMind() {


    const { currentUser, error, loading } = useSelector(state => state.user);
    const [category, setCategory] = useState('mind');

    const [mindGoalsScore, setMindGoalsScore] = useState('');
    const [mindHabitsScore, setMindHabitsScore] = useState('');

    const [subgoalScore, setSubgoalScore] = useState('');
    const [goalScore, setGoalScore] = useState('');
    const [habitScore, setHabitScore] = useState('');

    const [totalScore, setTotalScore] = useState('');


    useEffect(() => {
        const fetchCategoryScore = async () => {
            try {
                const res = await fetch(`/api/category/getcategoryscore/${currentUser._id}?category=${category}`);
                const data = await res.json();
                if (res.ok) {
                    setSubgoalScore(data.subgoalScore);
                    setGoalScore(data.goalScore);
                    if (data.mindHabitScore > 0) {
                        setHabitScore(data.mindHabitScore[0].total);
                    }
                    else {
                        setHabitScore(0);
                    }
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser) {
            fetchCategoryScore();
        }
    }, [currentUser._id, mindGoalsScore, mindHabitsScore]);

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
            leafProb,
            leafProb2 = 0.01;

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

        if (b.clientWidth > 1024) {
            w = b.clientWidth;
        }

        if (b.clientWidth >= 769 && b.clientWidth <= 1024) {
            w = 600;
        }

        if (b.clientWidth >= 481 && b.clientWidth <= 768) {
            w = p.max((p.min(b.clientWidth - 100, 600), 480));
        }

        if (b.clientWidth < 481) {
            w = b.clientWidth;
        }

        let h = b.clientHeight;


        let treeScale = 1;

        p.getScale = (h) => {
            if (h < 720) {
                treeScale = (h / 720 - 0.1);
            }

        }

        p.getScale(h);

        const Y_AXIS = 1;

        let growthScore = totalScore;

        var backgroundImage;
        p.preload = () => {
            backgroundImage = p.loadImage('mindBG.png');
        }

        p.setup = () => {

            //console.log('width: ' + w);
            //console.log('height: ' + h);
            //create a canvas instance
            p.createCanvas(w, h).parent("treeHolder");



            div_inputs = p.createDiv('');
            div_inputs.id('div_Settings');
            div_inputs.parent("sliderHolder");
            div_inputs.style('visibility', 'hidden');

            //size
            slider_size = p.createSlider(100, 150, 125, 1);
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


            p.readInputs(true);

            console.log('growth score: ' + growthScore);


            //Read inputs of sliders initial values ? 
            //slider_size.input(p.getInputs = () => { p.readInputs(true) });
            //slider_level.input(p.getInputs = () => { p.readInputs(true) });
            //slider_lenRand.input(p.getInputs = () => { p.readInputs(true) });
            //slider_branchProb.input(p.getInputs = () => { p.readInputs(true) });
            //slider_Count.input(p.getInputs = () => { p.readInputs(true) });
            //slider_leafProb.input(p.getInputs = () => { p.readInputs(true) });


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

            //button_newSeed = p.createButton('New Seed');
            //button_hide.position();
            //button_hide.parent("buttonHolder");

            //button_newSeed.mousePressed(p.getSeed = () => { randSeed = p.random(1,500); console.log('RandSeed: ' + randSeed); });

            console.log('Rendering')
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



            size = 100;
            maxLevel = 1;
            lenRand = 0;
            branchProb = 0.7;
            leafProb = 0;

            if (growthScore > 0) {
                { growthScore <= 50 ? size = size + growthScore : size = 150 }
                { growthScore <= 60 ? lenRand = lenRand + (growthScore * 0.02) : lenRand = 1.2 }
                { (growthScore / 4) <= 12 ? maxLevel = maxLevel + Math.trunc(growthScore / 4) : maxLevel = 12 }

                if (growthScore - 10 > 0) {
                    { (growthScore - 10) <= 28 ? branchProb = branchProb + ((growthScore - 10) * 0.01) : branchProb = 1 }
                }

                if (growthScore - 20 > 0) {
                    { (growthScore - 20) <= 45 ? leafProb = leafProb + ((growthScore - 20) * 0.01) : leafProb = 1 }
                }
            }

            if (updateTree && !growing) {
                prog = maxLevel + 1;
                p.loop();
            }
        }



        p.windowResized = () => {
            b = document.getElementById("treeHolder");

            if (b.clientWidth > 1024) {
                w = b.clientWidth;
            }

            if (b.clientWidth >= 769 && b.clientWidth <= 1024) {
                w = 600;
            }

            if (b.clientWidth >= 481 && b.clientWidth <= 768) {
                w = p.max((p.min(b.clientWidth - 100, 600), 480));
            }

            if (b.clientWidth < 481) {
                w = b.clientWidth;
            }

            h = b.clientHeight;

            p.resizeCanvas(w, h);

            p.getScale(h);

            //console.log('width: ' + w);
            //console.log('height: ' + h);
        }

        p.draw = () => {

            p.clear();
            //p.background(220, 0);

            p.background(backgroundImage);
            //p.background('#ffffff');
            //p.setGradient(0, 0, w, h, colorTop, colorBottom, Y_AXIS);


            //p.stroke('#2b4e46');
            

            p.translate(w / 2, h / 1.27);



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

            let shadowCol = p.map((10 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), 1, 10, 0, 10);

            let col = p.map((10 * Math.pow((maxLevel - level + 1) / maxLevel, 1)), 1, 9, 70, 10);
            let colM = p.map((10 * Math.pow((maxLevel - level + 1) / maxLevel, 1)), 1, 9, 80, 20);
            let colR = p.map((10 * Math.pow((maxLevel - level + 1) / maxLevel, 1)), 1, 9, 90, 30);

            let barkColor = 82;
            let colMiddle = col + 20;
            let colRight = col + 40;

            let colThird = 73;

            //p.drawingContext.shadowColor = p.color(150, 110, 250);

            //Left
            p.strokeWeight(16 * Math.pow((maxLevel - level + 1) / maxLevel, 6));
            p.stroke(col, colM, colR, 255)
            p.line(0, 0, 0, len / level);


            //Middle
            //p.drawingContext.shadowBlur = 5;

            p.drawingContext.shadowColor = p.color(shadowCol, shadowCol, shadowCol, 255);

            if (level <= 3) {
                p.drawingContext.shadowBlur = 5;
            }
            else if (level > 3 && level < 8) {
                p.drawingContext.shadowBlur = 2;
            }
            else {
                p.drawingContext.shadowBlur = 0;
            }



            p.strokeWeight(14 * Math.pow((maxLevel - level + 1) / maxLevel, 2));
            p.stroke(col + 5, colM + 5, colR + 5, 255)
            p.line((6 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), 0, (6 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), len / level);


            //Right
            p.drawingContext.shadowBlur = 0;

            p.strokeWeight(12 * Math.pow((maxLevel - level + 1) / maxLevel, 2));
            p.stroke(col + 15, colM + 15, colR + 15, 255)
            p.line((12 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), 0, (12 * Math.pow((maxLevel - level + 1) / maxLevel, 2)), len / level);


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
                p.stroke(240 + 50 * p.rand(), 190 + 30 * p.rand2(), 125 + 20 * p.rand());

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
            leafProb2 = 0.01;
            p.grow();
        }

        p.drawLeaves = () => {
            if (leafProb2 < leafProb) {
                leafProb2 = leafProb2 + 0.01;
            }
        }

        p.grow = () => {
            if (prog > (maxLevel + 24)) {
                prog = maxLevel + 24;

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

        setTotalScore((goalScore * 2) + subgoalScore + (habitScore / 2));
        console.log('habitScore: ' + habitScore);

    }, [goalScore, subgoalScore, habitScore]);


    useEffect(() => {

        if (goalScore !== '' && subgoalScore !== '' && habitScore !== '' && totalScore !== '') {

            console.log('totalScore: ' + totalScore);
            const myP5 = new p5(Sketch);
            return () => myP5.remove();

        }

    }, [totalScore]);




    return (
        <div className='w-full min-h-screen'>
            {/* Main */}
            <div className=' mx-auto flex flex-col justify-center'>

                {/* Tree container */}
                <div id="treeHolder" className='min-h-screen bg-white flex justify-center items-center'></div>
                
                {/* Button Container */}
                <div id="buttonHolder" className='hidden'>
                    {/* Tree Sliders Container */}
                    <div id="sliderHolder"></div>
                </div>


            </div>
        </div>
    )
}