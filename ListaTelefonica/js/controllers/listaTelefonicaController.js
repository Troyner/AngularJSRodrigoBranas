angular.module("listaTelefonica").controller("listaTelefonicaController", function ($scope, $filter, uppercaseFilter) {
	$scope.app = "Lista Telefonica";
	$scope.contatos = [
		{nome: $filter('uppercase')("Pedro"), telefone: "99991111", data: new Date(), operadora: {nome: "Oi", codigo: 14, categoria: "Celular"}, cor: "blue"},
		{nome: uppercaseFilter("Ana"), telefone: "99992222", data: new Date(), operadora: {nome: "Vivo", codigo: 15, categoria: "Celular"}, cor: "brown"},
		{nome: "Maria", telefone: "99993333", data: new Date(), operadora: {nome: "GVT", codigo: 25, categoria: "Fixo"}, cor: "red"}
	];
	$scope.operadoras = [
		{nome: "Oi", codigo: 14, categoria: "Celular", preco: 2},
		{nome: "Vivo", codigo: 15, categoria: "Celular", preco: 3},
		{nome: "Tim", codigo: 41, categoria: "Celular", preco: 1},
		{nome: "GVT", codigo: 25, categoria: "Fixo", preco: 4},
		{nome: "Embratel", codigo: 21, categoria: "Fixo", preco: 6},
	];
	$scope.adicionarContato = function (contato) {
		// Exitem três formas de adicionar o objeto na array:

		// Forma Ruim (receber por Scope):
		// Quebra o mantra de evitar ao máximo ler o scope estando
		// dentro do controller (escrever é normal,
		// ler deixa aplicação menos clara, quando um teste unitário
		// for criado para este controller, será necessário
		// atribuir valor ao scope, em vez de passar o parâmetros de 
		// forma explícita).
		/*$scope.contatos.push({nome: $scope.nome, telefone: $scope.telefone});*/

		// Forma Média (receber por parâmetro da function):
		// Ainda não é a melhor maneira, pois tem uma burocracia
		// na criação do objeto e setar na lista.
		/*$scope.contatos.push({nome: nome, telefone: telefone});*/

		// Forma Boa (abstração do contato na diretiva ng-model)
		// Porém é interessante copiar o objeto, pois a refência
		// será mantida, no caso dessa aplicação, quando mudados
		// valor no input, iria mudar na tabela ao mesmo tempo,
		// o que não acontece pois estamos utilizando angular.copy
		// para criar um nova instânacia do objeto na lista.
		// Então limpamos a antiga refência com o delete.
		$scope.contatos.push(angular.copy(contato));
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	};
	$scope.apagarContato = function (contatos) {
		$scope.contatos = contatos.filter(function (contato) {
			if (!contato.selecionado) {
				return contato;
			}
		});
	};
	$scope.contatoSelecionado = function(contatos) {
		return contatos.some( function (contato) {
			return contato.selecionado;
		});
	};
	$scope.ordenarPor = function (campo) {
		$scope.criterioOrdenacao = campo;
		$scope.direcaoOrdenacao = !$scope.direcaoOrdenacao;
	}

	/* Adcionando valorer ao escopo no atributo classe, que
	será utilizado na diretiva ng-class
	$scope.classe = "selecionado";
	$scope.classe1 = "selecionado";
	$scope.classe2 = "negrito";*/
})