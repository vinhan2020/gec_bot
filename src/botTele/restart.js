async function restartControl(bot) {
    bot.command('restart', async (ctx) => {
        await bot.telegram.sendMessage(ctx.message.chat.id, "<b>Public Command:</b>\n/start - Let's get this party started! 🎉\n/help - Prints this help message\n/wallets - Reveals all of your connected wallets\n/volume - Summons the volumebot main panel\n/snip - Summons the sniperbot main panel\n/marketmaker - Summons the market maker bot main panel", { parse_mode: "HTML" })
    })
}

module.exports = { restartControl };