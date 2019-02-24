//https://stackoverflow.com/a/17891411
export const randomNoRepeats = function(array) {
    var copy = array.slice(0);
    return () => {
        if (copy.length < 1) copy = array.slice(0);
        var index = Math.floor(Math.random() * copy.length);
        var item = copy[index];
        copy.splice(index,1);
        return item;
    }
}