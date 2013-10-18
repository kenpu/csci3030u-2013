Accounts.onCreateUser(function (options, user) {
  user.totalAnswers = 0;
  user.correctAnswers = 0;

  if (options.profile)
    user.profile = options.profile;
  return user;
});
