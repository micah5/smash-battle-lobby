# smash-battle-lobby

Pretty basic stuff. Vue.js, Vuetify

## REST api

There's a simple REST api you can connect to with 2 endpoints.

### POST /message
All values can be left `null`. If a message has an ID it is treated as an new arena.
```json
{
    "type": String,
    "format": String,
    "rotation": String,
    "chat": String,
    "username": String,
    "id": String
}
```

### GET /messages
Returns an array of all messages in the above format
