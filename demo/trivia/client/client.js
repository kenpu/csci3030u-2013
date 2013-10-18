Accounts.ui.config({passwordSignupFields: 'USERNAME_ONLY'});

Meteor.subscribe("Questions");
Meteor.subscribe("userProfile");

var userStats = function () {
  var userlist = Meteor.users.find();
  var userstat = new Array();

  userlist.forEach(function(user){
    var questions = Questions.find({owner: user._id});
    userstat.push({username: user.username, questions: questions.count(), answered: user.totalAnswers, correct: user.correctAnswers});
  });
  userstat.sort(function(a,b){
    return a.questions > b.questions;
  });
  return userstat;
};

Template.userlist.users = userStats;

var questionsForUser = function(){
  return Questions.find({$and : [{owner: {$ne: Meteor.userId()}}, {answered: {$in: [Meteor.userId()]}}]});
};

var numberOfQuestionsAvailable = function(){
  return questionsForUser().count();
};

Template.content.hasQuestions = function(){
  return numberOfQuestionsAvailable() > 0;
};

Template.content.questions = function(){
  return numberOfQuestionsAvailable();
};

Template.content.events({
  'click .add': function(){
    openCreateDialog();
    return false;
   },
  'click .question': function(){
    openQuestionDialog();
    return false;
  }
});

///////////////////////////////////////////////////////////////

var openCreateDialog = function(){
  Session.set("error", null);
  Session.set("showCreateDialog", true);
};

Template.page.showCreateDialog = function() {
  return Session.get("showCreateDialog");
};

Template.createDialog.error = function () {
  return Session.get("error");
};


Template.createDialog.events({
  'click .cancel': function(){
    Session.set("showCreateDialog", false );
  },

  'click .save': function(event, template){
    var question = template.find(".questionTextArea").value;
    if (question.length == 0){
      Session.set("error", "You should type a question");
      return;
    }
    var answer1 = template.find(".answer1").value;
    var answer2 = template.find(".answer2").value;
    var answer3 = template.find(".answer3").value;
    var answer4 = template.find(".answer4").value;
    if (answer1.length == 0 || answer2.length == 0 || answer3.length == 0 || answer4.length == 0){
      Session.set("error", "You should type 4 answers");
      return;
    }
    var correctAnswer = template.find('input:radio[name="correctAnswer"]:checked');
    if (correctAnswer == null){
      Session.set("error", "You should select one answer as correct");
      return;
    }
    Meteor.call('createQuestion', {
      question: question,
      answer1 : answer1,
      answer2 : answer2,
      answer3 : answer3,
      answer4 : answer4,
      correctAnswer : parseInt(correctAnswer.value,10)
    });
    Session.set("showCreateDialog", false);
   }
});

///////////////////////////////////////////////////////
var openQuestionDialog = function(){
  var questionsAvailable = questionsForUser();
  var r = Math.floor(Math.random()*questionsAvailable.count())
  var questions = questionsAvailable.fetch();
  Session.set("randomQuestion", questions[r]._id);
  Session.set("error", null);
  Session.set("showQuestionDialog", true);
};

Template.questionDialog.randomQuestion = function(){
  return Questions.findOne(Session.get("randomQuestion"));
};

Template.page.showQuestionDialog = function() {
  return Session.get("showQuestionDialog");
};

Template.createDialog.error = function () {
  return Session.get("error");
};

Template.questionDialog.events({
  'click .cancel': function(){
    Session.set("showQuestionDialog", false);
  },
  'click .answer': function(event, template){
     var answer = template.find('input:radio[name="answer"]:checked');
     if (answer == null){
       Session.set("error", "You should select one answer as correct");
       return;
    }

    var ans = parseInt(answer.value,10);
    Meteor.call("answerQuestion", {idQuestion: Session.get("randomQuestion"), answer: ans});

    Session.set("showQuestionDialog", false);
  }
});