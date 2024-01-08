const User = require('../models/user')
const Web3 = require('web3')
const web3 = new Web3(process.env.AVAX_CHAIN_URL);
const GecABI = require('../abi/gecABI.json')
const { GetChatMember } = require('../axios/telegramAPI')
const ImportAddress = async (bot, ctx, userName, value) => {
    try {
        const userId = ctx.update.message.from.id
        if (web3.utils.isAddress(value)) {
            // should check GEC holder and add point at this step - processing
            await User.findOne({ userId: userId })
                .then(async (dataUser) => {
                    if (dataUser) {
                        await User.updateOne({ userName },
                            {
                                $set: {
                                    walletAddress: value
                                }
                            })
                    }
                })
            // check balance for point 
            const contract = new web3.eth.Contract(GecABI, process.env.GEC_CONTRACT);
            const balance = await contract.methods.balanceOf(value).call();
            const balanceConvert = web3.utils.fromWei(balance, 'ether')
            console.log("balance", balanceConvert)

            // 
            let point = 0
            if (Number(balanceConvert) >= process.env.HOLD_5_POINT && Number(balanceConvert) < process.env.HOLD_15_POINT) {
                // +5 point
                point = 5
            } else if (Number(balanceConvert) >= process.env.HOLD_15_POINT) {
                // +15 point
                point = 15
            }
            // update point
            await User.findOneAndUpdate({ userId: userId }, {
                $set: {
                    point: point
                }
            })
            await bot.telegram.sendMessage(
                ctx.chat.id,
                `<b>🟢 Address saved:\n\n<code>${value}</code></b>`,
                {
                    parse_mode: "HTML",
                }
            );
            await bot.telegram.sendMessage(
                ctx.chat.id,
                `💎 To get started, please provide your Twitter username.`,
                {
                    parse_mode: "HTML",
                    reply_markup: {
                        force_reply: true,
                        input_field_placeholder: "...",
                    },
                }
            );
        } else {
            let textMess = `👀 Opps, This wallet's taken. Pick another and take all the $POINT for yourself!`
            await bot.telegram.sendMessage(ctx.chat.id, textMess, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: [
                        [{ text: "Try Agian", callback_data: "try_again_wallet" }],
                    ],
                },
            });
        }
    } catch (error) {
        let textMess = `👀 Opps, This wallet's taken. Pick another and take all the $POINT for yourself!`
        console.log('error', error)
        await bot.telegram.sendMessage(ctx.chat.id, textMess, {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Try Agian", callback_data: "try_again_wallet" }],
                ],
            },
        });
    }
}

const ImportUserTwitter = async (bot, ctx, userName, value) => {
    console.log("ctx", ctx.update.message.from.id)
    await User.findOne({ twitterName: value })
        .then(async (userExist) => {
            if (userExist) {
                await bot.telegram.sendMessage(
                    ctx.chat.id,
                    `🥲 Username already existed, please choose another one.`,
                    {
                        parse_mode: "HTML",
                    }
                );
                await bot.telegram.sendMessage(
                    ctx.chat.id,
                    `💎 To get started, please provide your Twitter username.`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            force_reply: true,
                            input_field_placeholder: "...",
                        },
                    }
                );
            } else {
                // update user name into db
                await User.updateOne({ userName }, {
                    $set: {
                        twitterName: value
                    }
                })
                await bot.telegram.sendMessage(
                    ctx.chat.id,
                    `<b>🟢 Twitter saved:\n\n<code>${value}</code></b>`,
                    {
                        parse_mode: "HTML",
                    }
                );
                // const botLink = `${process.env.BOT_TELE_LINK}?start=${ctx.botInfo.id}`
                const dataUser = await User.findOne({ userId: ctx.update.message.from.id })
                if (!dataUser) {
                    await bot.telegram.sendMessage(
                        ctx.chat.id,
                        `<b>This user not found</b>`
                    )
                } else {
                    let refLink = ""
                    if (dataUser.referralCode !== '') {
                        refLink = dataUser.referralCode
                    }
                    await bot.telegram.sendMessage(
                        ctx.chat.id,
                        `<b>🥇 Join forces with your buddies and watch your $POINT stack grow earn 2 $POINT for every referral!</b>\n\nYour Referral: <a href=\"${refLink}\">${refLink}</a>`,
                        {
                            parse_mode: "HTML"
                        }
                    );
                }


                await bot.telegram.sendMessage(
                    ctx.chat.id,
                    `<b>1️⃣ <a href=\"https://t.me/geckoinuavax/9388\">Join Telegram Group</a> - 10 $POINT 💰</b>\n\nAfter finishing, click 'Done' and your task will be verified`,
                    {
                        parse_mode: "HTML",
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "✔️ Done", callback_data: "task_1" }],
                            ],
                        },
                    }
                );
            }
        })
}

const TaskTwo = async (bot, ctx, userName, idCtx) => {
    await bot.telegram.editMessageText(
        ctx.update.callback_query.from.id, idCtx, "",
        `<b>2️⃣ <a href=\"https://twitter.com/GeckoInuAvax\">Follow our Twitter</a> - 10 $POINT 💰</b>\n\nAfter finishing, click 'Done' and your task will be verified`,
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✔️ Done", callback_data: "task_2" }],
                ],
            },
        }
    );
}

const TaskThree = async (bot, ctx, userName, idCtx) => {
    await bot.telegram.editMessageText(
        ctx.update.callback_query.from.id, idCtx, "",
        `<b>3️⃣ <a href=\"https://x.com/GeckoInuAvax/status/1742938671060590671?s=20\">Like & Retweet</a> - 10 $POINT 💰</b>\n\nAfter finishing, click 'Done' and your task will be verified`,
        {
            parse_mode: "HTML",
            disable_web_page_preview: true,
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✔️ Done", callback_data: "task_3" }],
                ],
            },
        }
    );
}

const TaskDone = async (bot, ctx, userName, idCtx) => {
    // check join group for point
    await GetChatMember(ctx)
        .then(data => {
            console.log("data ->>>>>>>>>>", data.data)
            if(data.data.re){

            }
        })
    await bot.telegram.editMessageText(
        ctx.update.callback_query.from.id, idCtx, "",
        `<b>🔱 Congrats, you've conquered all the tasks - Now open <a href=\"https://geckoinu.vip/\">GECKOINU</a> to access your $POINT!</b>`,
        {
            parse_mode: "HTML",
        }
    );
}


module.exports = { ImportAddress, ImportUserTwitter, TaskTwo, TaskThree, TaskDone };