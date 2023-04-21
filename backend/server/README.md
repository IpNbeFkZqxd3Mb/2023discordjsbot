## DiscordBotService檔案架構
````
discordBotService
        ├── DeployCommands.ts       上傳/指令
        ├── DiscordBotService.ts    啟動Bot
        ├── discordCommands
        │           ├── DiscordCommands.ts  集中管理(匯入匯出)Commands
        │           └── *.ts                Commads
        └── discordEvents
                    ├── DiscordEvents.ts    集中管理(匯入匯出)Events
                    └── *.ts                Events
````
## 如何運行?
````
先切換到後端目錄:cd backend/server
運行伺服器:npm start
````
## 如何新增Commands?
````
在目錄discordCommands底下新增想要的新功能合集(*.ts)
並在該ts檔案中添加commads
如:想獲取User 頭像(avatar)
=>新增User.ts
=>在.ts內添加變數getAvatar
並依照定義好的interface添加所需內容
完成撰寫後
到DiscordCommands.ts中import該ts檔案
並在discordCommandArray中添加新功能
````

## 如何新增Events?
````
在目錄discordEvents底下新增想要的新功能合集(*.ts)
並在該ts檔案中添加events
如:想監聽ClientReady
=>新增BotStatus.ts
=>在.ts內添加變數ready
並依照定義好的interface添加所需內容
完成撰寫後
到DiscordEvents.ts中import該ts檔案
並在discordEventArray中添加新功能
````