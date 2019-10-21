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
            title :"Which internet company began life as an online bookstore called Cadabra?",
            choices: ["Amazon","eBay","Overstock","Shopify"],
            correct :"Amazon"
          },
          {
            title:"When was the programming language C# released?",
            choices:["1998","1999","2001","2000"],
            correct:"2000",
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
        var something;

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

function scoreBoard() {
    // Retrieve
    $('#score').text("Name: " + " " + inputInit.value + " " + " Score:" + " " + scorePerCent );
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
  
  function addRecord(){
    
    localStorage.setItem("name", inputInit.value);
    localStorage.setItem("score", scorePerCent);
    something = JSON.stringify({name : localStorage.getItem("name"), score : localStorage.getItem("score")});
    scores.push(something);
    console.log(scores);
    console.log(scores[0]);
    console.log(scores[0].name);
    for( i = 0; i< scores.length; i++){
      $('#score').text("Name: " + " " + scores[i].name + " " + " Score:" + " " + scores[i].score );
    }
  }
  function viewScoreBoard(){
  for(i=0;i<something.length;i++){
    console.log('here');
     $("#scores").text(something[i]);

   }
  }

  function clearScore(){
    console.log('here');
    $('#score').text('No Score Logged');
    $('#inputInit').text('No Score Logged');
    localStorage.clear()
}

      


