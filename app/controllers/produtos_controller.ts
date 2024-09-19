import Produto from '#models/produto'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProdutosController {
    async index({ response }: HttpContext) {
        const produtos = await Produto.all()
        return response.json(produtos)
      }
    
      // create
      async store({ request, response }: HttpContext) {
        const data = request.only(['id', 'nome', 'preco'])
        const produto = await Produto.create(data)
        return response.status(201).json(produto)
      }
    
      // get id
      async show({ params, response }: HttpContext) {
        const produto = await Produto.query().where('id', params.id).firstOrFail()
        return response.json(produto)
      }
    
      // update
      async update({ params, request, response }: HttpContext) {
        const produto = await Produto.findOrFail(params.id)
        const data = request.only(['id', 'nome', 'preco'])
        produto.merge(data)
        await produto.save()
        return response.json(produto)
      }
    
      // delete
      async destroy({ params, response }: HttpContext) {
        try {
          const produto = await Produto.findOrFail(params.id)
          const deletedProduto = produto.toJSON()
          await produto.delete()
    
          return response.status(200).json({
            message: 'Deletado com sucesso',
            data: deletedProduto,
          })
        } catch (error) {
          console.error(error)
          return response.status(500).json({ message: 'Erro interno do servidor' })
        }
    
        
      }
}