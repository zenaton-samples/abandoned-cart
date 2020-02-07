# Zenaton Samples - Abandoned Cart

This is an example of Zenaton project showcasing how you could react to a customer not finalizing their order on an ecommerce website.

## Development

The `boot.js` file is where you tell the Zenaton Agent where to find - by name - the source code of your tasks and workflows.

> If you add a task or a workflow to your project, do not forget to update the `boot.js` file.

Look at Zenaton documentation to learn how to implement [workflows](https://docs.zenaton.com/workflows/implementation/) and [tasks](https://docs.zenaton.com/tasks/implementation/).

## Run

### Requirements

This example project uses Slack API to send a notification and uses Sendgrid to send some emails.

Before getting starting, make sure you have a Slack Incomming Webhook URL available to send the Slack notification.
If you don't have one yet, you can read the dedicated [Slack documentation](https://api.slack.com/messaging/webhooks)
to set up one.

You will also need a Sendgrid API key to be able to send emails. If you don't have one yet, you can sign-in to your
Sendgrid account and get an API [here](https://app.sendgrid.com/settings/api_keys).

### Starting the workflow

You can dispatch tasks and workflows by name from everywhere using [Zenaton API](https://docs.zenaton.com/client/graphql-api/).
They will be processed as soon as you run this project.

> Note: tasks and workflows are dispatched in an environment (`AppEnv`) of your Zenaton application (`AppId`).
They will be processed by this project, **if** you setup it with the same `AppId` and `AppEnv`. You must also provide an `Api Token`
to authorize access to this application (found at https://app.zenaton.com/api)

### Run Locally

First, install dependencies:

```sh
npm install
```

Then, fill-in the environment variables referenced in the `.env` file.

Install a Zenaton Agent:

```sh
curl https://install.zenaton.com | sh
```

and run it:

```sh
zenaton listen --boot=boot.js
```

### Run in Docker

Create your `.env` file

```sh
cp -n .env.sample .env
```

and fill-in the environment variables referenced in the `.env` file.

Then start your container:

```sh
cd docker && docker-compose up
```

### Run on Heroku

Follow this button [![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy), then fill in the env variables and click "deploy".

### Run somewhere else

Check our [documentation](https://docs.zenaton.com/going-to-production/) for more options (AWS, Google Cloud, Clever Cloud ...)

### Checking that your project is running

Whatever your installation method, you should see that a new Agent is listening from this url: https://app.zenaton.com/agents. If you do not
see it, please check again that you have selected the right application and environment.

## Dispatching Tasks and Workflows

Tasks and workflows can be dispatched by name from everywhere using the [Zenaton API](https://docs.zenaton.com/client/graphql-api/)
or our [Node.js SDK](https://github.com/zenaton/zenaton-node).

You can use also the UI of our [example app](https://github.com/zenaton/nodejs-example-app). After installation, you can (optionaly) add
your workflows and some examples of input and event in the `public/config.json` file. eg.

```json
{
  "workflows": [
    {
      "name": "HelloWorld",
      "input": [ "Me" ],
    }
  ]
}
```

> You need to rebuild your example app after having modified this file. If you prefer, you can update directly `dist/config.json` and simply reload the page - but your changes will be lost at the next rebuild.

## Monitoring Tasks and Worklows Processing

Look at your [dashboard](https://app.zenaton.com/workflows) (if you do not see your dispatched tasks or workflows, please check that you have selected the right application and environment).
