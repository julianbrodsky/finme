const refreshPage = function(){
    setTimeout(location.reload(), 3000)
    location.reload()
}
document.querySelector('#submitButton').addEventListener('click', refreshPage)
