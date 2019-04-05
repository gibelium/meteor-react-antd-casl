This is a small showcase for the usage of [CASL authorization library](https://github.com/stalniy/casl) in a meteor/react environment using the ant-design UI library. It demonstrates storing the abilities for each user in the mongoDB users collection and loading them when a user logs in into the app.

#### Test users
Within the ContentComponent.jsx the content is then rendered based on the abilities of each user. There are three test users defined:
*  admin@demo.ger / admin
*  manager@demo.ger / manager
*  user@demo.ger / user

#### Implementation details
1) The setup of the users, their abilities and storing those information is done in /server/main.js by using the basic meteor/Accounts functionality.

2) The abilities for each user group are defined within /imports/casl/Abilities.js.

3) To see how the abilities of the currently logged in user are resolved and set into the AbilityContext please look into:
    *  /imports/ui/layouts/AppContainer.jsx
    *  /imports/ui/layouts/App.jsx
        *  constructor :: Setting up the initial state
        *  getDerivedStateFromProps :: Handling the change of the logged in user and their abilities
        *  render() :: Wrapping the app content into a <AbilityContext.Provider/> component
    *  /imports/ui/components/ContentComponent.jsx :: Rendering the content based on the users abilities

#### Open issue
There is one issue left in the showcase documented in the [casl/react issue tracker](https://github.com/stalniy/casl/issues/174#issuecomment-480197119). Please find the corresponding code artifacts marked with FIXME comments within ConentContainer.jsx.

#### To run the showcase
1) Checkout the git branch
2) Run either _npm install_ or _yarn_ to download and setup the npm_packages
3) Execute the application from terminal/console with _meteor_
    *  If you want to reset the meteor application and the stored data execute _meteor reset_ from terminal/console 