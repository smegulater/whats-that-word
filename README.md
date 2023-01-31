# BPMN IDE

## running locally

### scripts

~~~ powershell
# run from the project route

npm run dev # runs both the front and backends
npm run server-dev # runs only the backend with auto recompiling
~~~

### .env environemnt variables

~~~ ini
NODE_ENV = development
PORT = 5000

MONGO_DB_URI = mongodb+srv://<username>:<password>@bpmn-ide-dev.duenspk.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_USER = USERNAME
MONGO_DB_PASS = PASSWORD

~~~
