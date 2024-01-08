const User = require('../models/user')
async function point(bot) {
    bot.command('point', async (ctx) => {
        console.log(ctx)
        await User.findOne({ userId: ctx.message.from.id })
            .then(async (dataUser) => {
                if (dataUser) {
                    await bot.telegram.sendMessage(ctx.message.chat.id, `Your Wallet 🇻🇳\n<code>${dataUser.walletAddress}</code>\n\n$POINT Balance: ${dataUser.point} 💰`,
                        {
                            parse_mode: "HTML"
                        }
                    )
                }
            })

    })
}

module.exports = { point };
