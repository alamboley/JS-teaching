function Utils() {

}

Utils.randomIntFromInterval = function(min, max) {

    return Math.floor(Math.random() * (max - min + 1) + min);
}

Utils.shuffleArray = function (a) {
    
    var j, x, i;

    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

Utils.getHexColor = function(color) {

	switch (color) {

		case "blue":
			return 0x6a9aed;

		case "green":
			return 0x3dd87f;

		case "orange":
			return 0xff965b;

		case "purple":
			return 0xb320e9;

		case "red":
			return 0xff5050;

		case "yellow":
			return 0xe0db3b;

		case "cream":
			return 0xf0dfa9;
	}

	return 0xFFFFFF;
}