const { Telegraf } = require('telegraf')
const { restartControl } = require('./restart')
const { menuControl } = require('./menu')
const { doTaskControl } = require('./doTask')
const { TitleAddress , TitleTwitter , TitleTwitterValue} = require("../contants/title.js")
const { ImportAddress , ImportUserTwitter , TaskTwo , TaskThree , TaskDone  } = require("../components/index.js")

async function botControl() {
    try {
        const bot = new Telegraf(process.env.BOT_TOKEN)
        bot.command('start', async (ctx) => {
            const chatId = ctx.message.chat.id
            await bot.telegram.sendMessage(chatId, `Let's fking go, anon!`, { parse_mode: "HTML" });
            await bot.telegram.sendMessage(chatId, `Please provide your wallet address!\n\nThis information is necessary for on-chain verification & $GOLD Reward!`, 
                { 
                    parse_mode: "HTML" ,
                    reply_markup: {
                        force_reply: true,
                        input_field_placeholder: "...",
                    },
                },
            );
            
            let idCtx;
            bot.on("callback_query", async (ctx) => {
                let userName = ctx.update.callback_query.from.username;
                let dataPickup = ctx.update.callback_query.data;
                idCtx = ctx.update.callback_query.message.message_id

                switch (dataPickup) {
                    case "task_1":
                        await TaskTwo(bot, ctx, userName , idCtx);
                    break;
                    case "task_2":
                        await TaskThree(bot, ctx, userName , idCtx);
                    break;
                    case "task_3":
                        await TaskDone(bot, ctx, userName , idCtx);
                    break;
                default:
                    console.log("notthing");
                    break;
                }
            })

            bot.on("message", async (ctx) => {
                let textTitle = ctx?.update?.message?.reply_to_message?.text
                let userName = ctx?.update?.message?.from?.username;
                let value = ctx?.update?.message?.text;

                let checkTitle;
                checkTitle = textTitle?.includes(TitleAddress);
                if (checkTitle) {
                    textTitle = TitleAddress;
                }

                let checkTitleTwitter;
                checkTitleTwitter = textTitle?.includes(TitleTwitter);
                if (checkTitleTwitter) {
                    textTitle = TitleTwitter;
                }

                switch (textTitle) {
                    case TitleAddress:
                        await ImportAddress(bot, ctx, userName , value);
                        break;
                    case TitleTwitter:
                        await ImportUserTwitter(bot, ctx, userName , value);
                        break;
                default:
                    console.log("notthing");
                    break;
                }
            })

            await bot.telegram.setMyCommands(
                JSON.stringify([
                    {
                        command: "restart",
                        description: "Start/Restart",
                    },
                    {
                        command: "start",
                        description: "Start",
                    },
                    {
                        command: "menu",
                        description: "My Tasks",
                    },
                    {
                        command: "point",
                        description: "$Point Balance",
                    },
                    {
                        command: "linktwitter",
                        description: "Link Twitter",
                    },
                    {
                        command: "referral",
                        description: "Referral",
                    },
                    {
                        command: "explore",
                        description: "Explore GeckoInu",
                    },
                ])
            )
        })
        await restartControl(bot)
        await menuControl(bot)
        await doTaskControl(bot)
        bot.launch()
    }
    catch (err) {
        console.log("err", err)
        return err
    }
}




module.exports = { botControl }