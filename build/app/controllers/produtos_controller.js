import Produto from '#models/produto';
export default class ProdutosController {
    async index({ response }) {
        const produtos = await Produto.all();
        return response.json(produtos);
    }
    async store({ request, response }) {
        const data = request.only(['id', 'nome', 'preco']);
        const produto = await Produto.create(data);
        return response.status(201).json(produto);
    }
    async show({ params, response }) {
        const produto = await Produto.query().where('id', params.id).firstOrFail();
        return response.json(produto);
    }
    async update({ params, request, response }) {
        const produto = await Produto.findOrFail(params.id);
        const data = request.only(['id', 'nome', 'preco']);
        produto.merge(data);
        await produto.save();
        return response.json(produto);
    }
    async destroy({ params, response }) {
        try {
            const produto = await Produto.findOrFail(params.id);
            const deletedProduto = produto.toJSON();
            await produto.delete();
            return response.status(200).json({
                message: 'Deletado com sucesso',
                data: deletedProduto,
            });
        }
        catch (error) {
            console.error(error);
            return response.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
//# sourceMappingURL=produtos_controller.js.map