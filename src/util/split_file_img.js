module.exports = function (file) {
    return '/' + file.split('\\').splice(5).join('/');
}