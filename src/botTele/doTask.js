async function doTaskControl(bot) {
    // action volume menu
    console.log("vao day")
    bot.action('/start', async (ctx) => {
        console.log("ctx.mesage.chat.id", ctx)
    })
}

module.exports = { doTaskControl };