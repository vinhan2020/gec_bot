const ImportAddress = async (bot, ctx , userName , value) => {
    try {
        await bot.telegram.sendMessage(
            ctx.chat.id,
            `<b>💈 Processing...</b>`,
            {
                parse_mode: "HTML",
            }
        );
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
    } catch (error) {
        let textMess = `⭕️ Oops, this wallet's taken. Pick another and take all the $GEC for yourself!`
        console.log('error', error)
        await bot.telegram.sendMessage(ctx.chat.id, textMess , {
            parse_mode: "HTML",
        });
    }
}

const ImportUserTwitter = async (bot, ctx , userName , value) => {
    await bot.telegram.sendMessage(
        ctx.chat.id,
        `<b>🟢 Twitter saved:\n\n<code>${value}</code></b>`,
        {
            parse_mode: "HTML",
        }
    );

    await bot.telegram.sendMessage(
        ctx.chat.id,
        `<b>🥇 Join forces with your buddies and watch your $GEC stack grow earn 25k $GEC for every referral!</b>\n\n<a href="https://t.me/point_digger_bot">https://t.me/point_digger_bot</a>`,
        {
            parse_mode: "HTML",
        }
    );

    await bot.telegram.sendMessage(
        ctx.chat.id,
        `<b>1️⃣ Join Telegram Group - 50k $GEC</b>\n\nAfter finishing, click 'Done' and your task will be verified`,
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

const TaskTwo = async (bot, ctx , userName , idCtx) => {
    console.log('ctx', ctx)
    await bot.telegram.editMessageText(
        ctx.update.callback_query.from.id, idCtx, "",
        `<b>2️⃣ Follow our Twitter - 50k $GEC</b>\n\nAfter finishing, click 'Done' and your task will be verified`,
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

const TaskThree = async (bot, ctx , userName , idCtx) => {
    await bot.telegram.editMessageText(
        ctx.update.callback_query.from.id, idCtx, "",
        `<b>3️⃣ Like & Retweet - 50k $GEC</b>\n\nAfter finishing, click 'Done' and your task will be verified`,
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: [
                    [{ text: "✔️ Done", callback_data: "task_3" }],
                ],
            },
        }
    );
}

const TaskDone = async (bot, ctx , userName , idCtx) => {
    await bot.telegram.editMessageText(
        ctx.update.callback_query.from.id, idCtx, "",
        `<b>🔱 Congrats, you've conquered all the tasks - Now open Holdstation to access your $GEC!</b>`,
        {
            parse_mode: "HTML",
        }
    );
}


module.exports = { ImportAddress , ImportUserTwitter , TaskTwo , TaskThree , TaskDone };