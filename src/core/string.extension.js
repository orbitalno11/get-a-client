String.prototype.isSafeNotBlank = function () {
    return this !== undefined && this !== null && this.trim().length !== 0
}