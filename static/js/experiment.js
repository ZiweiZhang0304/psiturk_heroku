const PROLIFIC_CODE = '81213BE1'  // set this to the prolific completion code to run in prolific mode

async function initializeExperiment() {
  LOG_DEBUG('initializeExperiment');

  ///////////
  // Setup //
  ///////////

  // trials = await $.getJSON 'static/json/rewards/increasing.json'
  const N_TRIAL = 72;
  // Shuffle category boundary
 var S1B = getRandom([0,1],1)[0]; //if 0, then cat boundary is 45 deg; if 1, then 135 deg
 var S2B = getRandom([0,1],1)[0]; //if 0, then cat boundary is 45 deg; if 1, then 135 deg

  // Shuffle whether odd or even numbers are feedback
  var S1F = getRandom([0,1],1)[0]; //if 0, then feedback given to [0,2,4,6,8,10]; if 1, then feedback given to [1,3,5,7,9,11]
  var S2F = getRandom([0,1],1)[0]; //if 0, then feedback given to [0,2,4,6,8,10]; if 1, then feedback given to [1,3,5,7,9,11]

  //motor response
  var CR = getRandom([0,1],1)[0]; // if 0, cat 1 is G, cat 2 is H; if 1, cat 1 is H, cat 2 is G;

  //Stimuli
  var stim_face = [
  'static/images/test_stim/human_faces/01_03.png','static/images/test_stim/human_faces/01_04.png','static/images/test_stim/human_faces/01_05.png','static/images/test_stim/human_faces/01_06.png',
  'static/images/test_stim/human_faces/02_04.png','static/images/test_stim/human_faces/02_05.png',
  'static/images/test_stim/human_faces/03_08.png','static/images/test_stim/human_faces/04_08.png','static/images/test_stim/human_faces/05_08.png','static/images/test_stim/human_faces/06_08.png',
  'static/images/test_stim/human_faces/04_07.png','static/images/test_stim/human_faces/05_07.png',
  'static/images/test_stim/human_faces/03_01.png','static/images/test_stim/human_faces/04_01.png','static/images/test_stim/human_faces/05_01.png','static/images/test_stim/human_faces/06_01.png',
  'static/images/test_stim/human_faces/04_02.png','static/images/test_stim/human_faces/05_02.png',
  'static/images/test_stim/human_faces/08_03.png','static/images/test_stim/human_faces/08_04.png','static/images/test_stim/human_faces/08_05.png','static/images/test_stim/human_faces/08_06.png',
  'static/images/test_stim/human_faces/07_04.png','static/images/test_stim/human_faces/07_05.png'];

  var stim_house = [
  'static/images/test_stim/houses/01_03.png','static/images/test_stim/houses/01_04.png','static/images/test_stim/houses/01_05.png','static/images/test_stim/houses/01_06.png',
  'static/images/test_stim/houses/02_04.png','static/images/test_stim/houses/02_05.png',
  'static/images/test_stim/houses/03_08.png','static/images/test_stim/houses/04_08.png','static/images/test_stim/houses/05_08.png','static/images/test_stim/houses/06_08.png',
  'static/images/test_stim/houses/04_07.png','static/images/test_stim/houses/05_07.png',
  'static/images/test_stim/houses/03_01.png','static/images/test_stim/houses/04_01.png','static/images/test_stim/houses/05_01.png','static/images/test_stim/houses/06_01.png',
  'static/images/test_stim/houses/04_02.png','static/images/test_stim/houses/05_02.png',
  'static/images/test_stim/houses/08_03.png','static/images/test_stim/houses/08_04.png','static/images/test_stim/houses/08_05.png','static/images/test_stim/houses/08_06.png',
  'static/images/test_stim/houses/07_04.png','static/images/test_stim/houses/07_05.png'];
  // This ensures that images appear exactly when we tell them to.
  var pre_load_list = stim_face.concat(stim_house);
  jsPsych.pluginAPI.preloadImages(pre_load_list);

// Define category boundary, feedback and test stim
  // --- Face --- //
  if (S1B == 0){//45 deg boundary
      if (CR == 0){
      var stim_face_C1 = stim_face.slice(0,12)
      var stim_face_C2 = stim_face.slice(12,stim_face.length)
    }
      else {
      var stim_face_C2 = stim_face.slice(0,12)
      var stim_face_C1 = stim_face.slice(12,stim_face.length)
    }
  }
  else {
      if (CR == 0){
      var stim_face_C1 = [0,1,2,3,4,5,12,13,14,15,16,17].map(x=>stim_face[x])
      var stim_face_C2 = [6,7,8,9,10,11,18,19,20,21,22,23].map(x=>stim_face[x])
     }
      else {
      var stim_face_C2 = [0,1,2,3,4,5,12,13,14,15,16,17].map(x=>stim_face[x])
      var stim_face_C1 = [6,7,8,9,10,11,18,19,20,21,22,23].map(x=>stim_face[x])
      }
  };

  // --- House --- //
  if (S2B == 0){//45 deg boundary
      if (CR == 0){
      var stim_house_C1 = stim_house.slice(0,12)
      var stim_house_C2 = stim_house.slice(12,stim_house.length)
    }
      else {
      var stim_house_C2 = stim_house.slice(0,12)
      var stim_house_C1 = stim_house.slice(12,stim_house.length)
    }
  }
  else {
      if (CR == 0){
      var stim_house_C1 = [0,1,2,3,4,5,12,13,14,15,16,17].map(x=>stim_house[x])
      var stim_house_C2 = [6,7,8,9,10,11,18,19,20,21,22,23].map(x=>stim_house[x])
     }
      else {
      var stim_house_C2 = [0,1,2,3,4,5,12,13,14,15,16,17].map(x=>stim_house[x])
      var stim_house_C1 = [6,7,8,9,10,11,18,19,20,21,22,23].map(x=>stim_house[x])
      }
  };

  if (S1F == 0){ //even feedback
      var stim_face_C1_F = [0,2,4,6,8,10].map(x=>stim_face_C1[x])
      var stim_face_C1_T = [1,3,5,7,9,11].map(x=>stim_face_C1[x])
      var stim_face_C2_F = [1,3,5,7,9,11].map(x=>stim_face_C2[x])
      var stim_face_C2_T = [0,2,4,6,8,10].map(x=>stim_face_C2[x])
  } else {
      var stim_face_C1_T = [0,2,4,6,8,10].map(x=>stim_face_C1[x])
      var stim_face_C1_F = [1,3,5,7,9,11].map(x=>stim_face_C1[x])
      var stim_face_C2_T = [1,3,5,7,9,11].map(x=>stim_face_C2[x])
      var stim_face_C2_F = [0,2,4,6,8,10].map(x=>stim_face_C2[x])
  }

  if (S2F == 0){ //even feedback
      var stim_house_C1_F = [0,2,4,6,8,10].map(x=>stim_house_C1[x])
      var stim_house_C1_T = [1,3,5,7,9,11].map(x=>stim_house_C1[x])
      var stim_house_C2_F = [1,3,5,7,9,11].map(x=>stim_house_C2[x])
      var stim_house_C2_T = [0,2,4,6,8,10].map(x=>stim_house_C2[x])
  } else {
      var stim_house_C1_T = [0,2,4,6,8,10].map(x=>stim_house_C1[x])
      var stim_house_C1_F = [1,3,5,7,9,11].map(x=>stim_house_C1[x])
      var stim_house_C2_T = [1,3,5,7,9,11].map(x=>stim_house_C2[x])
      var stim_house_C2_F = [0,2,4,6,8,10].map(x=>stim_house_C2[x])
  }


  // To avoid repeating ourselves,  we create a variable for a piece
  // of html that we use multiple times.
  var anykey = "<div class='lower message'>Press any key to continue.</div>";


  //////////////////
  // Instructions //
  //////////////////

  var welcome_block = {
    type: "html-keyboard-response",
    // We use the handy markdown function (defined in utils.js) to format our text.
    stimulus: markdown(`
    # Category Learning Experiment

    Welcome! In this experiment, you will learn to categorize a group of stimuli. You
    will see a series of images and make judgements. You will be given prac_feedback
    to help you learn.

    ${anykey}
    `)
    // text: markdown(
    //   `# Welcome

    //   This is a reworked version of the go/no-go task constructed in a
    //   [tutorial](http://docs.jspsych.org/tutorials/rt-task/)
    //   on the jsPsych website. Note that the code here is a little different
    //   than the original.

    //   Specifically, the code here is better 😉.

    //   ${anykey}
    // `)

  };

  var instructions_block = {
    type: "html-keyboard-response",
    // Sometimes we do need the additional control of html.
    // We can mix markdown with html, but you can't use markdown
    // inside an html element, which is why we use <b>html bold tags</b>
    // instead of the prettier **markdown format**.
    stimulus: markdown(`
      # Instructions

      In this experiment, a circle will appear in the center
      of the screen. If the circle is **blue**,
      press the letter F on the keyboard as fast as you can.
      If the circle is **orange**, do not press
      any key.

      <div class='center'>
        <div class='left center'>
          <img src='static/images/test_stim/houses/01_03.png'></img>
          <p><b>Press the G key</b></p>
        </div>
        <div class='right center'>
          <img src='static/images/test_stim/facees/01_03.png'></img>
          <p><b>Do not press a key</b></p>
        </div>
      </div>

      ${anykey}
    `),
    timing_post_trial: 2000
  };

  /////////////////
  // Test trials //
  /////////////////

  var stimuli = [ // this should be
    {
      stimulus:'static/images/test_stim/human_faces/01_01.png',
      data: { response: 'go' }
    },
    {
      stimulus: 'static/images/test_stim/human_faces/08_08.png',
      data: { response: 'no-go' }
    }
  ];

  var trials = jsPsych.randomization.repeat(stimuli, Math.floor(N_TRIAL / 3));

  var fixation = {
    type: 'html-keyboard-response',
    stimulus: '<div style="margin-top: 90px; font-size:60px;">+</div>',
    choices: jsPsych.NO_KEYS,
    trial_duration() {
      return Math.floor(Math.random() * 200) + 800  //Math.floor(Math.random() * 200) + 800
    },
  }

  var test_block = {
    type: "image-keyboard-response",
    choices: ['G'],
    trial_duration: 1600,
    timeline: _.flatten(trials.map(trial => [fixation, trial]))
  };


  var debrief_block = {
    type: "html-keyboard-response",
    // We don't want to
    stimulus() {
      return markdown(`
        # Experiment complete

        You did so good. Wow. Great job!
        Press any key to complete the experiment. Thanks!
      `)
    }
  };


  /////////////////////////
  // Experiment timeline //
  /////////////////////////

  // `timeline` determines the high-level structure of the
  // experiment. When developing the experiment, you
  // can comment out blocks you aren't working on
  // so you don't have to click through them to test
  // the section you're working on.

  var timeline = [
    welcome_block,
    instructions_block,
    test_block,
    debrief_block,
  ];

  if (searchParams.get('skip') != null) {
    timeline.splice(0, parseInt(searchParams.get('skip')))
  }


  return startExperiment({
    timeline,
    exclusions: {
      min_width: 800,
      min_height: 600
    },
  });
};
