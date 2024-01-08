async function referral(bot) {
    bot.command('referral', async (ctx) => {
        const botLink = `${process.env.BOT_TELE_LINK}?start=${ctx.botInfo.id}`
        await bot.telegram.sendMessage(ctx.message.chat.id, `💰 Get 2 $POINT/ friend referred\n\n<a href=\"${botLink}\">${botLink}</a>`,
            {
                parse_mode: "HTML"
            }
        )
    })
}

module.exports = { referral };

