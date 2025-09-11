# ollama-driven-roleplaying
LLM Agent Network, streaming webpage server, DM + nplayers, chat output, time pause, TODO image call

docker-compose up --build

TODO: 
- lots in rpg config probably 
- dreamsheet image, tts, music, sfx, ...lol svg. image overlay/ maps? is each a spun up container, config with http

- foooocus-api image running and getting hit. Don't want to fork.... https://github.com/mrhan1993/Fooocus-API
- kokoro? tts solution https://github.com/nazdridoy/kokoro-tts dockerized... https://github.com/remsky/Kokoro-FastAPI
- unknown music solution https://github.com/ace-step/ACE-Step
- ~~unknown sfx solution~~
- ui beautification
- electron app/ .exe-IZE docker compose up


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