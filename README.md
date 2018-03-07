# If you just want to get started, run `npm start`

# Config.json
This is where you'll set the API url. Use the included one if you want to use my API; if you want to use your own (if you added a new call or something), change the `api_base_url`.

# AoF API stuff
#### it all returns json.

| endpoint     | variables    | method| comment |
| --------|---------|-------|------|
| /api/user/{email}| `email` : the users email address   | GET | get user by email
| /api/user/id/{ids} | `ids` : comma separated user ids | GET    | get one or many users with character and dkp info
| /api/game/{id} | `id` : steam app_id | GET | get steam game data
| /api/dkp | none | GET | get users with dkp info
| /api/games | none | GET | get currently playing games
| /api/news | none | GET | get news
| /api/news | `title`, `content` | POST | add news
| /api/dkpevents/{id} | `user_id` | GET | gets DKP events (changes) for a user
| /api/events | none | GET | get raid events
| /api/events | `startTime`, `name`, `minILvl`, `date` | POST | create new event