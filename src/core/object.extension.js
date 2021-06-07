Object.prototype.isEmpty = function () {
    return this === null || this === undefined || (typeof (this) === 'object' && Object.keys(this).length === 0) || (typeof (this) === 'string' && this.trim().length === 0)
}