function GenerateFilmCard(params) {
    return `
    <div class="card border-secondary">
        <a href="/movies?mvdb_id=${params.id}"><img class="card-img-top img-thumbnail text-center" src="https://image.tmdb.org/t/p/w300${params.poster_path}" alt="Card image cap"></a>
        <div class="card-body">
            <h6 class="card-title text-center">${params.original_title}</h6>
        </div>
    </div>
    `
}

function searchNFill(text) {
    var url = `/movies/searchbytext`;
    var params = `text=${text}`;
    $.ajax({
        type: "GET",
        timeout: 15000,
        url:  url + '?' + params,
        success : function(data){
            if (data.hasOwnProperty("Error")) {
                alert(data["Result"])
            } else {
                data.results.forEach(item => {
                    $("#found-films").append(GenerateFilmCard(item));
                });
            }
        }
    });
}