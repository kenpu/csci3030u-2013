Questions = new Meteor.Collection("questions");



var NonEmptyString = Match.Where(function (x) {
   check (x, String);
   return x.length != 0;
});

var validAnswer = Match.Where(function (x) {
  check (x, Number);
  return x >=1 && x <= 4;
});

Meteor.methods({
  createQuestion: function (values) {
   check(values, {
      question: NonEmptyString,
      answer1: NonEmptyString,
      answer2: NonEmptyString,
      answer3: NonEmptyString,
      answer4: NonEmptyString,
      correctAnswer: validAnswer});

    return Questions.insert({owner: this.userId,
                             question: values.question,
                             answer1: values.answer1,
                             answer2: values.answer2,
                             answer3: values.answer3,
                             answer4: values.answer4,
                             correctAnswer: values.correctAnswer,
                             answered: []});
   },

   answerQuestion: function(values){
     Meteor.users.update({_id: this.userId }, {$inc: {'totalAnswers': 1}});

     var question = Questions.findOne(values.idQuestion);
     if (values.answer == question.correctAnswer){
       Meteor.users.update({_id: this.userId }, {$inc: {'correctAnswers': 1}});
     }
     Questions.update(values.idQuestion, { $addToSet: { answered: this.userId } });
   }
});

if(Meteor.isServer) {
  Meteor.publish("Questions", Questions);
  Meteor.publish("userProfile", function(){
    return  Meteor.users.find({}, {fields: {'username': 1, 'totalAnswers': 1, 'correctAnswers': 1}});
  });
}
