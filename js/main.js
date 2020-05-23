function innerHTML(id, result) {
    return document.getElementById(id).innerHTML = result
}

function newSlider(newLi, nameYourDog) {
    return '<li> <img id="image" src="' + newLi + '" class="image" uk-cover> <div class="uk-position-bottom uk-position-small uk-text-center"> <h2 id="nameDog" class="uk-margin-remove">' + String(nameYourDog) + '</h2></div></div></li>'
}

function getDados(dados) {
    return document.getElementById(dados).value
}

function getElements(dados) {
    return document.getElementById(dados)
}

function checkList() {
    var breedname = getDados("selectBreed").split('-')
    var nameYourDog = getDados("nameYourDog")
    var selectFont = getDados("selectFont")
    var selectColor = getDados("selectColor")
    

    if (breedname == 'nulo') {
        var info = "Selecione a Raça do Dog"
        var text = '<div class="uk-alert-danger" uk-alert><a class="uk-alert-close" uk-close></a><p>' + info + '</p></div>'
        return UIkit.modal.alert(text).then(function () { })

    } else if (nameYourDog == "") {
        var info = "Informe o Nome do Dog"
        var text = '<div class="uk-alert-danger" uk-alert><a class="uk-alert-close" uk-close></a><p>' + info + '</p></div>'
        return UIkit.modal.alert(text).then(function () { })

    } else if (selectColor == "Selecione Uma Cor") {
        var info = "Selecione Uma Cor"
        var text = '<div class="uk-alert-danger" uk-alert><a class="uk-alert-close" uk-close></a><p>' + info + '</p></div>'
        return UIkit.modal.alert(text).then(function () { })

    } else if (selectFont == "Selecione Uma Fonte") {
        var info = "Selecione Uma Fonte"
        var text = '<div class="uk-alert-danger" uk-alert><a class="uk-alert-close" uk-close></a><p>' + info + '</p></div>'
        return UIkit.modal.alert(text).then(function () { })

    } else {
        return true
    }
}


var requestURL = 'https://dog.ceo/api/breeds/list/all';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

var breedsImg
request.onload = function (breeds) {
    var spinner = '<div class="uk-alert-primary" uk-alert><a class="uk-alert-close" uk-close></a><p>Aguarde enquanto carregamos os dados.</p></div><span class="loading" uk-spinner="ratio: 4.5"></span>'
    UIkit.modal.dialog(spinner)
    setTimeout(function () { UIkit.modal.dialog().hide() }, 1500);

    var breeds = (request.response).message;
    breedsImg = breeds
    var selectBreed = getElements("selectBreed");
    Object.keys(breeds).forEach(function (breed) {
        if (breeds[breed].length >= 1) {
            for (i = 0; i < breeds[breed].length; i++) {
                var opt0 = document.createElement("option");
                opt0.value = breed + '-' + breeds[breed][i];
                opt0.text = breeds[breed][i] + ' ' + breed;
                selectBreed.add(opt0);
            }
        }
        else if (breeds[breed].length < 1) {
            var opt0 = document.createElement("option");
            opt0.value = breed;
            opt0.text = breed;
            selectBreed.add(opt0);

        }
    });
}

getElements("select").onclick = function () {
    if (checkList() == true) {
        var newImg = []
        var subBreeds

        var breedname = getDados("selectBreed").split('-')
        var nameYourDog = getDados("nameYourDog")
        var selectFont = getDados("selectFont")
        var selectColor = getDados("selectColor")
        var images = getElements("images")
        var view = getElements("select")
        var save = getElements("save")
        var edit = getElements("edit")

        images.style.color = selectColor;
        images.style.fontFamily = selectFont;

        save.disabled = false
        edit.disabled = false
        view.value = "Visualizar / Nova Foto"

        if (breedname.length > 1) {
            subBreeds = 1
            var imgDogURL = 'https://dog.ceo/api/breed/' + breedname[0] + '/images';
            var request = new XMLHttpRequest();
            request.open('GET', imgDogURL);
            request.responseType = 'json';
            request.send();
            request.onload = function (imgBreed) {
                var imgBreed = request.response.message
                var nome = breedname[1]

                imgBreed.forEach(function (valor) {
                    if (valor.indexOf(nome) !== -1) {
                        newImg.push(valor)
                    }
                })
            }
        } else {
            var imgDogURL = 'https://dog.ceo/api/breed/' + breedname[0] + '/images';
            subBreeds = 0
        }

        var imgDog = new XMLHttpRequest();
        imgDog.open('GET', imgDogURL);
        imgDog.responseType = 'json';
        imgDog.send();

        if (subBreeds == 0) {
            imgDog.onload = function (imgBreed) {
                var imgBreed = imgDog.response.message
                var number = Math.floor(Math.random() * (imgBreed.length))
                var newLi = newSlider(imgBreed[number], nameYourDog)
                innerHTML("images", newLi)
            }
        } else {
            imgDog.onload = function () {
                var number = Math.floor(Math.random() * (newImg.length))
                var newLi = newSlider(newImg[number], nameYourDog)
                innerHTML("images", newLi)
            }
        }

    } else {
        checkList()
    }

}


getElements("edit").onclick = function () {
    if (checkList() == true) {
        var images = getElements("images")
        var image = getElements("image")
        var nameYourDog = getDados("nameYourDog")
        var selectFont = getDados("selectFont")
        var selectColor = getDados("selectColor")
        images.style.color = selectColor;
        images.style.fontFamily = selectFont
        var newLi = newSlider(image.src, nameYourDog)
        innerHTML("images", newLi)
    } else {
        checkList()
    }
}

getElements("save").onclick = function () {
    if (checkList() == true) {
        var dNow = new Date();
        var localdate = dNow.getDate() + '/' + (dNow.getMonth() + 1) + "/" + dNow.getFullYear() + ' ' + dNow.getHours() + ':' + dNow.getMinutes();
        var nameYourDog = getDados("nameYourDog")
        var selectFont = getDados("selectFont")
        var selectColor = getDados("selectColor")
        var imgSrc = getElements("image")
        var text = '<div class="uk-alert-primary" uk-alert><a class="uk-alert-close" uk-close></a><p>Salvo com Sucesso.</p></div>'

        UIkit.modal.alert(text).then(function () { })

        var content = JSON.parse(localStorage.getItem('Breeds') || '[]')
        content.push({
            nameYourDog: nameYourDog,
            selectFont: selectFont,
            selectColor: selectColor,
            imgSrc: imgSrc.src,
            localdate: localdate
        });
        localStorage.setItem("Breeds", JSON.stringify(content));

    } else {
        checkList()
    }
}