const { Telegraf } = require('telegraf')
const { restartControl } = require('./restart')
const { menuControl } = require('./menu')
const { doTaskControl } = require('./doTask')

async function botControl() {
    try {
        const bot = new Telegraf(process.env.BOT_TOKEN)
        bot.command('start', async (ctx) => {
            const chatId = ctx.message.chat.id
            await bot.telegram.sendMessage(chatId, `Let's fking go, anon!`, { parse_mode: "HTML" });
            await bot.telegram.setMyCommands(
                JSON.stringify([
                    {
                        command: "restart",
                        description: "Start/Restart",
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