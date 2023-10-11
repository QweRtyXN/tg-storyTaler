export class Loader {
    icons = ['🕛','🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚']
    message = null
    interval = null
    constructor(ctx) {
        this.ctx = ctx
    }

    async show() {
        let ind = 0
        this.message = await this.ctx.reply(this.icons[ind])
        this.interval = setInterval(() => {
            ind = ind < this.icons.length - 1 ? ind + 1 : 0
            this.ctx.telegram.editMessageText(
                this.ctx.chat.id,
                this.message.message_id,
                null,
                this.icons[ind]
            )
        }, 500)
    }

    hide() {
        clearInterval(this.interval)
        this.ctx.telegram.deleteMessage(this.ctx.chat.id, this.message.message_id)
    }
}