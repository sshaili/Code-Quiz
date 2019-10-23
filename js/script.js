         $(document).ready(function(){
          $("#quizQuestions").hide();
          $(".button").hide();
          $(".correct").hide();
          $(".wrong").hide();
          $(".highScores").hide();
          $(".quizComplete").hide();
          $(".line").hide();

          $("#highScore").on("click", function() {
            $("#button1").hide();
            $("#button2").hide();
            $("#button3").hide();
            $("#button4").hide();
            $(".introduction").hide();
            $("#quizQuestions").hide();
            $(".highScores").show();
            $("#goBack").show();
            $("#clear").show();
            $(".correct").hide();
            $(".wrong").hide();
            $(".quizComplete").hide();
            $(".line").hide();
            $("#score").show();
            if (score === null){
              console.log('!')
              $('#score').text('No Scores Yet'); 
              
          }
            });

          $('#startButton').on("click", function () {
            $("#quizQuestions").show();
            $("#button1").show();
            $("#button2").show();
            $("#button3").show();
            $("#button4").show();
            $(".introduction").hide();
            $(".line").hide();
            inputInit.value = null;
            score = 0;
          });

          $('#goBack').on("click", function(){
            $("#quizQuestions").hide();
            $(".introduction").show();
          $(".button").hide();
          $(".correct").hide();
          $(".wrong").hide();
          $(".highScores").hide();
          $(".quizComplete").hide();
          $(".line").hide();
          clearInterval(interval);
          runningQuestion = 0; 
          score = 0;
          stopTimer(); 
          })
        }); 

        let quizQuestions = document.getElementById('#quizQuestions');
        const startButton = document.getElementById('#startButton');
        const queCards = document.querySelector('.queCards');
        const button1 = document.getElementById('#button1');
        const button2 = document.getElementById('#button2');
        const button3 = document.getElementById('#button3');
        const button4 = document.getElementById('#button4');
        const goBack = document.getElementById('#goBack');
        const clear = document.getElementById('#clear');
        const highScores = document.querySelector('.highScores');  

        var questions= [
          {
            title: "Commonly used data types DO NOT include:",
            choices: ["strings", "booleans", "alerts", "numbers"],
            correct: "alerts"
          },
          {
            title: "The condition in an if / else statement is enclosed within ____.",
            choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
            correct: "parentheses"
          },
          {
            title: "Inside which HTML element do we put the JavaScript?",
            choices: ["<javascript>", "<scripting>", "<script>", "<js>"],
            correct: "<script>"
          },
          {
            title:"What are JavaScript Data Types?",
            choices:["Number","Object","function","None of the above"],
            correct:"Number",
          },
        ]
        // Variable declaration
        const lastQuestion = questions.length - 1;
        let runningQuestion = 0;
        let count = 0;
        const questionTime = 10; // 10s
        let TIMER;
        let score = 0;
        let interval;
        let sec;
        var seconds = 0;
        var scorePerCent;
        let scores  = [];
        var scoreText ;
        var data = [];
        

        // Question show
        function provideQuestion(){
          let q = questions[runningQuestion];
          
          $('#quizQuestions').text(q.title);
            $('#button1').text(q.choices[0]);
           $('#button1')[0].value = q.choices[0];
            
            $('#button2').text(q.choices[1]);
            $('#button2')[0].value = q.choices[1];

            $('#button3').text(q.choices[2]);
            $('#button3')[0].value = q.choices[2];

            $('#button4').text(q.choices[3]);
            $('#button4')[0].value = q.choices[3];
        }

      // ON start button 
      function startGame(){
        provideQuestion();
        var seconds = 60;       
        startTimer(seconds);        
    }

  
    // Timer Functionality
    function startTimer(seconds) {
    interval = setInterval(function() {
      $('#timer').text(timer);
            seconds--;
           timer.innerHTML = "0" + ":" + (seconds < 10 ? "0" : "") + String(seconds);
           if(seconds <= 00){
            console.log('reached');
            clearInterval(interval);
            scoreRender();
         }
    },1000);
   
  }
  
  function changeInterval(secStart) {  
    console.log(secStart);   
    if(secStart <= 10){
      alert("Time is up")
      clearInterval(interval);
      scoreRender();
    }  else{ 
      secStart = secStart - 10;
    clearInterval(interval);   
    startTimer(secStart);
    }
  }

  function stopTimer() {
    clearTimeout(startTimer);
  }

  // Answer checking
  function checkAnswer(answer){
    if( answer.value === questions[runningQuestion].correct){
        score++;
        setTimeout(()=>{
          $(".correct").show();
          $(".line").show();
        setTimeout(()=>{
          $(".correct").hide();
          $(".line").hide();
      },550)
    },0)
    }else{      
        var sec =  $('#timer')[0].textContent;
        changeInterval(sec.split(':')[1]); 
        setTimeout(()=>{
          $(".wrong").show();
          $(".line").show();
        setTimeout(()=>{
          $(".wrong").hide();
          $(".line").hide();
      },550)
    },0)     
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        provideQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

function scoreRender(){  
  // calculate the amount of question percent answered by the user
  scorePerCent = Math.round(100 * score/questions.length);
  $(".quizComplete").show();
  $("#quizQuestions").hide();
  $("#button1").hide();
  $("#button2").hide();
  $("#button3").hide();
  $("#button4").hide();
  $("#submit").show();
 $('#final').text('Your final score is ' + scorePerCent + ' %');
  clearInterval(interval); 
  
}
  function addRecord(){
    $("#button1").hide();
    $("#button2").hide();
    $("#button3").hide();
    $("#button4").hide();
    $(".introduction").hide();
    $("#quizQuestions").hide();
    $(".highScores").show();
    $("#goBack").show();
    $("#clear").show();
    $(".correct").hide();
    $(".wrong").hide();
    $(".quizComplete").hide();
    localStorage.setItem("name", inputInit.value);
    localStorage.setItem("score", scorePerCent);
    var jsonObject = { "name" : inputInit.value,"score" : scorePerCent } ;
    data.push(jsonObject);
    $('#score').text("Name: " + " " + inputInit.value + " " + " Score:" + " " + scorePerCent );
  }
     function viewBoard(){
    for( i = 0; i< data.length; i++){
      if(i === 0){
        
        scoreText =  "Name: " + " " + data[i].name + " " + " Score:" + " " + data[i].score;
      }
      else{
        scoreText =  scoreText + "  Name: " + " " + data[i].name + " " + " Score:" + " " + data[i].score;

    }
    $('#score').text(scoreText);
     }
  }
  function scoreBoard() {
    // Retrieve
    viewBoard();
    $("#button1").hide();
    $("#button2").hide();
    $("#button3").hide();
    $("#button4").hide();
    $(".introduction").hide();
    $("#quizQuestions").hide();
    $(".highScores").show();
    $("#goBack").show();
    $("#clear").show();
    $(".correct").hide();
    $(".wrong").hide();
    $(".quizComplete").hide();
  } 

  function clearScore(){
    $('#score').text('No Score Logged');
    scoreText = null;
    localStorage.clear();
    data = [];
}

      


