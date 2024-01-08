const axios = require('axios')
async function GetChatMember(ctx) {
    return new Promise(async (resolve, reject) => {
        const chatId = "@geckoinuavax"
        const userId = ctx.update.callback_query.from.id

        const urlGetChatMember = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/getChatMember`;
        await axios.get(urlGetChatMember,
            {
                params: {
                    chat_id: chatId,
                    user_id: userId
                },
            })
            .then((msg) => {
                resolve(msg)
            })
            .catch(err => {
                console.log(err)
                reject(err)
            })
    })
}


module.exports = {
    GetChatMember
}


