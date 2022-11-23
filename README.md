# Telegram bot
![GitHub](https://img.shields.io/github/license/hugogomes7/chatbot-telegram)


# About the project
in this project I developed one Telegram Bot able of assisting the user in some automated tasks. Integrated in 3 other projects within the same project: Shopping List, Chatbot and Schedule.

I used in a Telegram API the Middleware pattern/Chain of responsibility and Axios standard project to make HTTP requests. The database was developed with json-server (plugin NodeJs). In addition, the use of Scene, Stage and Session was essential.


# Chain of Resposability diagram
![chain-of-resposability](https://user-images.githubusercontent.com/65207104/203533186-21adc06c-3ebf-4016-b97e-7913aec6d02f.png)


# Concept Map
![concept-map-TelegramBot](https://user-images.githubusercontent.com/65207104/203453677-bbf3055e-6804-48b9-8b55-f26eab1a9a28.png)



# Projects
## Schedule
Helps the user to schedule personal tasks.

https://user-images.githubusercontent.com/65207104/203457249-7f2bc2c9-6893-41ed-8cdf-0ec4638bb33f.mp4


## Shopping List
Can be used individually and in groups, allows the user to add and remove items from a given list. In the video below I used it in a friends group.


https://user-images.githubusercontent.com/65207104/203458038-59157089-327c-47fb-85f1-a1141a40e5d9.mp4

## Chatbot
Bot that talks to the user.

https://user-images.githubusercontent.com/65207104/203457825-f8e429fb-b9d6-4275-bb77-ba4044592778.mp4


# Technologies used
- Javascript
- NodeJs
- Axios
- Momment
- API (Telegraf)
- json-server

# How to run project

## clone repository
git clone https://github.com/HugoGomes7/chatbot-telegram


## open project folder

## install Code Runner extension

## install dependencys
- npm i telegraf @3.17.3 -E
- npm i axios@0.17.1 --save -E
- npm install moment
- npm i --save node-schedule@1.3.0 -E
- npm i --save json-server

# Run Schedule Bot
- Open Schedule folder 
- Open Schedule file 
- npm start (start db)
- node Schedule (start bot)

# Run Shopping List
- Open ShoppingList folder 
- Open individualList or groupList file
- CTRL + ALT + N (start bot) / CTRL + ALT + M (stop bot)
- Search to "Dluccabot"
- Open chat or add in a group 

# Run Chatbot
- Open Chatbot folder 
- Open chatBot file
- CTRL + ALT + N (start bot) / CTRL + ALT + M (stop bot)
- Search to "Dluccabot"
- Start chat with the /start command 

```
# Author

Hugo Rômulo Miranda Gomes
