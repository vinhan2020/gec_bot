const User = require('../models/user')
async function linkTwitter(bot) {
    bot.command('linktwitter', async (ctx) => {
        await User.findOne({ userId: ctx.message.from.id })
            .then(async (dataUser) => {
                if (dataUser) {
                    await bot.telegram.sendMessage(ctx.message.chat.id, `Verified Twitter user: ${dataUser.twitterName} ✅`,
                        {
                            parse_mode: "HTML"
                        }
                    )
                }
            })
    })
}

module.exports = { linkTwitter };