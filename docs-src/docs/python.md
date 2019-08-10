

## setup python environment

- ubuntu comes with python3 by default, to check the version run the following command

```
python3 -V
```

- in order to use different python environment for different project, the recommended way to create a virtual environment is to use the **venv** module, install as follow

```
sudo apt install python3-venv -y
```

- Create a new directory for your Flask application and navigate into it

```
mkdir my_flask_app
cd my_flask_app
```

- Once inside the directory, run the following command to create your new virtual environment

```
python3 -m venv venv
```

The command above creates a directory called venv, which contains a copy of the Python binary, the Pip package manager, the standard Python library and other supporting files. You can use any name you want for the virtual environment.

To start using this virtual environment, you need to activate it by running the activate script:

```
source venv/bin/activate
```

## install Flask

Now that the virtual environment is activated, you can use the Python package manager pip to install Flask

```
pip install Flask
```

Verify the installation with the following command which will print the Flask version

```
python -m flask --version
```

create a "hello world" flask app, hello.py

```
touch hello.py
```

enter the following content into hello.py
```
from flask import Flask
app = Flask(__name__)

@app.route("/")
def greeting():
    return "<h1 style='color:green'>Hello World!</h1>"

if __name__ == "__main__":
    app.run(host='0.0.0.0')
```

Testing the app

```
python3 hello.py
```

to test with browser, find your multipass VM IP, from another terminal, run

```
multipass list

sample
Name                    State             IPv4             Image
linux-vm                Running           192.168.64.7     Ubuntu 18.04 LTS
```

use the browser and access http://192.168.64.7:5000

to serve as the site, we can use Gunicorn and then setup a WSGI Entry Point.

```
pip install gunicorn 
```

create a WSGI entry point

```
touch wsgi.py
```

copy the following content into wsgi.py

```
from hello import app

if __name__ == "__main__":
    app.run()
```

start the server

```
gunicorn --bind 0.0.0.0:5000 wsgi:app
```

Once you are done with your work, deactivate the environment, by typing deactivate and you will return to your normal shell.

```
deactivate
```

