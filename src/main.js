import { Telegraf } from "telegraf"
import config from "config"
import {message} from "telegraf/filters"
import {chatGPT} from './chatgpt.js'
import {create} from './notion.js'
import {Loader} from './loader.js' 

const bot = new Telegraf(config.get('TELEGRAM_TOKEN'), {handlerTimeout: Infinity})

bot.command("start", ctx => ctx.reply("Это ботик для историй. Впиши сюда свои моменты за день и получишь классную историю, которую можно рассказать знакомым"))

bot.on(message('text'), async (ctx) => {
    try {
        const text = ctx.message.text
        if (!text.trim()) ctx.reply('Текст не может быть пустым')

        const loader = new Loader(ctx)

        loader.show()

        const response = await chatGPT(text)

        if (!response) return ctx.reply('Ошибка с API', response)

        const notionResponse = await create(text, response.content)

        loader.hide()

        ctx.reply(`Ваша страница с готовой историей: ${notionResponse.url}`)
    } catch (e) {
        console.log('Error while processing gpt:', e.message)
    }
    // await chatGPT(ctx.message.text)
    // ctx.reply("test")
})


bot.launch()