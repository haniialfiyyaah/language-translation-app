import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TranslateValidator from 'App/Validators/TranslateValidator'
import translate from 'node-google-translate-skidz'
import fs from 'fs'

export default class TranslatesController {
  public async index({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    const { text, source, target } = await request.validate(TranslateValidator)
    const { sentences, translation } = await translate({ text, source, target })
    response.ok({ sentences, translation })
  }

  public async lang({ response }: HttpContextContract) {
    const data = fs.readFileSync('langs.json', 'utf-8')
    response.ok(JSON.parse(data))
  }
}
