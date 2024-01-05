async function menuControl(bot) {
    bot.command('menu', async (ctx) => {
        await bot.telegram.sendMessage(ctx.message.chat.id, "My Task: \n\n1️⃣ <a href=\"https://t.me/geckogec\">Join Telegram Group</a> - 10 $POINT 💰\n2️⃣ <a href=\"https://twitter.com/GeckoInuAvax\">Follow our Twitter</a> - 10 $POINT 💰\n3️⃣ <a href=\"https://x.com/GeckoInuAvax/status/1742938671060590671?s=20\">Like & Retweet</a> - 10 $POINT 💰\n4️⃣ Check GEC holder - 5 ~ 10 $POINT 💰\n5️⃣ Like, share tweet - 10 $POINT 💰\n6️⃣ Referral - 1 ~ 2 $POINT 💰",
            {
                parse_mode: "HTML",
                disable_web_page_preview: true
            }
        )
    })
}

module.exports = { menuControl };
