var initialCats = [
    {
        clickCount: 0,
        name: 'Tabby',
        imgSrc: 'img/cat-1.jpg',
        imgAttribution: 'https://www.flickr.com/photos/bigtallguy/434164568',
        nicknames: ['Tabtab', 'T-Bone', 'Mr. T']
    },
    {
        clickCount: 0,
        name: 'Tiger',
        imgSrc: 'img/cat-2.jpg',
        imgAttribution: 'https://www.flickr.com/photos/xshamx/4154543904',
        nicknames: ['Tigger']
    },
    {
        clickCount: 0,
        name: 'Scaredy',
        imgSrc: 'img/cat-3.jpg',
        imgAttribution: 'https://www.flickr.com/photos/kpjas/22252709',
        nicknames: ['Sca']
    },
    {
        clickCount: 0,
        name: 'Shadow',
        imgSrc: 'img/cat-4.jpg',
        imgAttribution: 'https://www.flickr.com/photos/malfet/1413379559',
        nicknames: ['sha']
    },
    {
        clickCount: 0,
        name: 'Sleepy',
        imgSrc: 'img/cat-5.jpg',
        imgAttribution: 'https://www.flickr.com/photos/onesharp/9648464288',
        nicknames: ['Sleepy']
    }
]

var Cat = function (data) {

    this.clickCount = ko.observable(data.clickCount);
    this.name = ko.observable(data.name);
    this.imgSrc = ko.observable(data.imgSrc);
    this.imgAttribution = ko.observable(data.imgAttribution);
    this.nicknames = ko.observableArray(data.nicknames);

    this.level = ko.computed(function () {
        var level;
        var clicks = this.clickCount();
        if (clicks < 10) {
            level = "Newborn";
        }
        else if (clicks < 50) {
            level = "Infant";
        }
        else if (clicks < 100) {
            level = "Child";
        }
        else if (clicks < 200) {
            level = "Teen";
        }
        else if (clicks < 500) {
            level = "Adult";
        } else {
            level = "Ninja";
        }
        return level;
    }, this);
}

var ViewModel = function () {

    var self = this;

    this.catList = ko.observableArray([]);
    
    initialCats.forEach(function(catItem){

        self.catList.push(new Cat(catItem));
    })

    this.currentCat = ko.observable(this.catList()[0]);

    this.incrementCounter = function () {
        self.currentCat().clickCount(self.currentCat().clickCount() + 1);

    };

    this.setCat = function(clickedCat){
        console.log('clickedCat');
        console.log(clickedCat);
        self.currentCat(clickedCat);
    }
}

ko.applyBindings(new ViewModel());