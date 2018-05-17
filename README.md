This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Folder Structure

After creation, your project should look like this:

```
my-app/
  README.md
  node_modules/
  package.json
      api.js
    index.js
  public/
    index.html
    favicon.ico
    maninfest.json
  src/
    actions/
      buildQuestion.js
      getData.js
      questions.js
      setMenuStatus.js
      submitAnswer.js
      types.js
      user.js
    componnents/
      App.js
      BuildQuestion.js
      CreatePoll.js
      DropdownMenu.js
      Header.js
      LeaderBoard.js
      LeftMenu.js
      List.js
      Login.js
      NotFound.js
      Profile.js
      Question.js
      QuestionnCard.js
    reducers/
      answer.js
      index.js
      login.js
      menuStatus.js
      question.js
      users.js
    styles/
      App.css
      index.css
```

*   `public/index.html` is the page template;
*   `src/index.js` is the JavaScript entry point.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
