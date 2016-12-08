angular.module("filmes").factory("MeusFilmes", function($q, $http){
	return {
		listar: function() {
			var promessa = $q.defer();

			$http.get("https://projeto-teste-2af14.firebaseio.com/filmes.json").then(
				function(result){
					var filmes = [];

					angular.forEach(result.data, function(filme, id){
						filme.id = id;
						filmes.push(filme);
						filmes = filmes.sort(function(a, b){return b.prioridade-a.prioridade});
					});

					promessa.resolve(filmes);
				}
			);

			return promessa.promise;
		},
		inserir: function(filme) {
			var id = filme.id;
			delete filme.id;

			return $http.put("https://projeto-teste-2af14.firebaseio.com/filmes/" + id + ".json", filme);
		},
        editar: function(filme) {

            return $http.put("https://projeto-teste-2af14.firebaseio.com/filmes/" + filme.id + ".json", filme);
        },
        buscar: function(filme) {

            return $http.get("https://projeto-teste-2af14.firebaseio.com/filmes/" + filme.id + ".json");
        },
		remover: function(id) {
			return $http.delete("https://projeto-teste-2af14.firebaseio.com/filmes/" + id + ".json");
		}
	};
});