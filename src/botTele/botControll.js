const { Telegraf } = require('telegraf')
const { menuControl } = require('./menu')
const { referral } = require('./referral')
const { linkTwitter } = require('./linkTwitter')
const { explore } = require('./explore')
const { point } = require('./point')
const { TitleAddress, TitleTwitter } = require("../contants/title.js")
const User = require("../models/user")
const { ImportAddress, ImportUserTwitter, TaskTwo, TaskThree, TaskDone } = require("../components/index.js")

async function botControl() {
    try {
        const bot = new Telegraf(process.env.BOT_TOKEN)
        bot.command('start', async (ctx) => {
            const chatId = ctx.message.chat.id
            let refCode = ""
            if (ctx.update.message.text.length > 8) {
                refCode = ctx.update.message.text.substring(7)
            }

            await bot.telegram.sendMessage(chatId, `Let's fking go, anon!`, { parse_mode: "HTML" });
            await bot.telegram.sendMessage(chatId, `Please provide your wallet address!\n\nThis information is necessary for on-chain verification & $POINT Reward!`,
                {
                    parse_mode: "HTML",
                    reply_markup: {
                        force_reply: true,
                        input_field_placeholder: "...",
                    },
                },
            );
            await User.findOneAndUpdate({ userId: refCode }, {
                $inc: {
                    peopleInvited: 1,
                    point: 2
                }
            })

            // create new user
            await User.findOne({ userId: ctx.update.message.from.id })
                .then(async dataUser => {
                    if (!dataUser) {
                        let referredBy = ""
                        const referralCode = `${process.env.BOT_TELE_LINK}?start=${ctx.update.message.from.id}`
                        let userId = ctx.update.message.from.id
                        let userName = ctx.update.message.from.username
                        if (refCode !== "") {
                            referredBy = refCode
                        }
                        const newUser = new User({
                            userId,
                            userName,
                            referralCode,
                            referredBy
                        })
                        await newUser.save()
                            .then()
                            .catch(err => {
                                bot.telegram.sendMessage("Save user failed")
                            })
                    }
                })
            let idCtx;
            bot.on("callback_query", async (ctx) => {
                console.log("callback_query")
                let userName = ctx.update.callback_query.from.username;
                let dataPickup = ctx.update.callback_query.data;
                idCtx = ctx.update.callback_query.message.message_id

                switch (dataPickup) {
                    case "try_again_wallet":
                        await bot.telegram.sendMessage(chatId, `Please provide your wallet address!\n\nThis information is necessary for on-chain verification & $POINT Reward!`,
                            {
                                parse_mode: "HTML",
                                reply_markup: {
                                    force_reply: true,
                                    input_field_placeholder: "...",
                                },
                            },
                        );
                        break
                    case "task_1":
                        await TaskTwo(bot, ctx, userName, idCtx);
                        break;
                    case "task_2":
                        await TaskThree(bot, ctx, userName, idCtx);
                        break;
                    case "task_3":
                        await TaskDone(bot, ctx, userName, idCtx);
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
                        await ImportAddress(bot, ctx, userName, value);
                        break;
                    case TitleTwitter:
                        await ImportUserTwitter(bot, ctx, userName, value);
                        break;
                    default:
                        console.log("notthing");
                        break;
                }
            })

            await bot.telegram.setMyCommands(
                JSON.stringify([
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
        await menuControl(bot)
        await referral(bot)
        await point(bot)
        await linkTwitter(bot)
        await explore(bot)
        bot.launch()
    }
    catch (err) {
        console.log("err", err)
        return err
    }
}




module.exports = { botControl }