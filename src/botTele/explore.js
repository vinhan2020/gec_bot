const User = require('../models/user')
async function explore(bot) {
    bot.command('explore', async (ctx) => {
        await bot.telegram.sendMessage(ctx.message.chat.id,
            `💎 GeckoInu is the ......`,
            {
                parse_mode: "HTML"
            }
        )
        await bot.telegram.sendMessage(ctx.message.chat.id,
            `👉 GeckoInu What? (https://geckoinu.vip/)\n👉 Documentations (https://geckoinu.vip/)\n👉 Dafuq is Account Abstration? (https://geckoinu.vip/)\n👉 Download this Dope (https://geckoinu.vip/)
            `,
            {
                parse_mode: "HTML"
            }
        )
    })
}

module.exports = { explore };


// 👉 Holdstation What? (https://holdstation.com/)
// 👉 Documentations (https://docs.holdstation.com/holdstation-docs-en/)
// 👉 Dafuq is Account Abstration? (https://blog.holdstation.com/introduction-to-account-abstraction-holdstation/)
// 👉 Download this Dope (https://onelink.to/x47n7w)