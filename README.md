# SteamVoat
Voting app for the classroom, browser based with Spring and AngularJS



# Assumptions

- time between votes is large enough to distinguish questions
- an optional reset button is front end only (screen goes to grey)
- there is a timeout that does the reset for you.
- we always take the most recent comment within a question window
- question window is based on all responses to a question in a class, the
  window in which (almost) all responses came in.
