# ollama-driven-roleplaying
LLM Agent Network, streaming webpage server, DM + n agentPlayers in a "room" + nplayers, "chat room" output, agent2agentSecrets, time events to jumpstart or corral agents, TODO image call, 

docker-compose up --build

TODO: 
- debug tabs, as db,startup,loop,closing in index.html then ... consume cfg then more tabs?... 
- lots in rpg config probably, 
 -- list of startup curl commands equivalents (because I can test curl commands in postman fast...)
 -- list of loop logic curl commands "The d&d game, gm manages list of players, gm manages roomListOAgents.". 
    ---Time matters in db schema start here, startup and close is whatever.
    --- test 2 loop is life coach, drill srgeant, 
 -- whatever/ list of happy close curl commands
- integrate [ startup, loop, closing ] into node app server
 --- closing can go to init new startup maybe. 
 --- One leader ai in one room with almost no purpose except the occasional cfg ping, minimum required state
 --- curl commands tested, extract data for https node module/same diff
 --- design pattern to facilitate me vibe coding. 
 --- Possibly an agent factory function (not the static factory getterFunction pattern, pizza factory) the dm/ai leader runs/is lol...if I make "motto" the four starting characters ONLY required stat then...that's cool
    --- user-agent  piggy backs dm-leader agent, manages list of agents.  
    --- User Agent View is the streaming ui...TODO full screen 1080p svg test.
    --- config has  a agent create schema...just need "motto"/same as system prompt
 --- inside a simply "decorated" room. 
    ---Lifecycle of "secret agent talk": agent a invites agent b to room, limit exchanges to n=3, accept/decline?, eecute secret comms, kill room.
 --- has static access to some https module, existing server only effectively streams to front end so probably want a nice big
 --- secret talk is another room: invite, secret talk up to n=3 exchanges? kill room....should be fun to peak at this log...
 


 fat streamingFunction static object and a httpFunction static object
- db buttons fix++++++ 
 -- remember Flowise Agent memory ideas.
 -- so...gm/room leader always need 1
 -- 
- dreamsheet image, tts, music, sfx, ...lol svg. image overlay/ maps? is each a spun up container, config with http
    -- foooocus-api image running and getting hit. Don't want to fork.... https://github.com/mrhan1993/Fooocus-API
    -- kokoro? tts solution https://github.com/nazdridoy/kokoro-tts dockerized... https://github.com/remsky/Kokoro-FastAPI
    -- unknown music solution https://github.com/ace-step/ACE-Step
    -- integrate them...realize I will fork them.
    -- ~~unknown sfx solution~~
- ui beautification
- electron app/ .exe-IZE docker compose up
- twitch api integration?


define in rpgconfg TODO:
Big json...mongo in long long TODO, last todo as of 9/10
    - game loop
        - one obj, run through of the repeating loop. Have an inline var for some number to mult times, default 1. 
        - ex. DM talks 3 x everyone else combined? DM gets to have long, medium, short and one phrase/mechanics result.
    - dm
        - list of actions
        -- explain: scene, problem, character, object
        -- roll initiative
        -- calculate action: gather modifiers, roll 50 and above YAY player, Woe playe
        -- 

    - game
        - setting
        - stat titles, stupid can be fun here vs, ....override default, everything is 1-100: 
            - STR
            - DEX 
            - INT, 
            - WIS, 
            - CHAR, 
            - CON, 
            - It factor, 
            - alignment
                -100 is good
                -1 is Evil, but will only ever try to
                
            strengths, weaknesses