

## Loopback 4

- to develop loopback 4 you will need nodejs and npm, ensure you have both nodejs and npm installed, refer to [nodejs setup](nodejs.md).

- Install LoopBack 4 CLI

```
sudo npm install -g @loopback/cli
```

- creaet a loopback project

```
lb4 app
```

- answer the prompt as follows

```
[?] Project name: getting-started
[?] Project description: Getting started tutorial
[?] Project root directory: (getting-started)
[?] Application class name: StarterApplication
[?] Select project build settings: Enable eslint, Enable prettier, Enable mocha, Enable loopbackBuild
```

- test the proejct

```
cd getting-started
npm start
```

your own controller

```
lb4 controller

[?] Controller class name: hello
[?] What kind of controller would you like to generate? Empty Controller
    create src/controllers/hello.controller.ts
    update src/controllers/index.ts
Controller Hello was now created in src/controllers/
```

Paste the following contents into the file /src/controllers/hello.controller.ts.

```
import {get} from '@loopback/rest';
export class HelloController {
  @get('/hello')
  hello(): string {
    return 'Hello world!';
  }
}
```

Test your application

```
npm start
```

access http://192.168.64.7:3000/hello with your browser and you should see "**Hello world!**".

## build docker image

```
docker build . -t getting-started:1.0
```

run the image

```
docker run -p 5000:3000 getting-started:1.0
```

verify the application is running using http://192.168.64.7:5000/hello with browser

assuming 192.168.64.7 is the IP of the multipass VM.

Once the application is verified running as docker locally, you can tag your image and push to ICP accordingly.

refer to [nodejs](nodejs.md) sample.

checkout [getting started](https://loopback.io/getting-started.html) on loopback.

