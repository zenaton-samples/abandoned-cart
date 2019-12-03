## Deploy on Heroku

Click this button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy), then fill in the env variables and click deploy.

Check that your agent is running properly here: https://app.zenaton.com/agents

## Launch a Workflow

install dependencies (only the first time)
```
yarn
```

put your credentials into a .env file
```
cp .env.sample .env
```

then launch a workflow
```
node bin/launch.js
```

and then to send events to the workflow
```
node bin/launch.js
```