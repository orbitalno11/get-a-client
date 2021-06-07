Array.prototype.isEmpty = function () {
    return this === undefined || this === null || this.length === 0
}

Array.prototype.isNotEmpty = function () {
    return !this.isEmpty()
}