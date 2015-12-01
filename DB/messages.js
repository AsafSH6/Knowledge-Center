/**
 * Created by Asaf on 14/11/2015.
 */

var messages = [
    {
        name: 'messageA',
        screenIds: [1, 2, ],
        text: ['Message A: LINE1',
            'Message A: LINE2',
            'Message A: LINE3',
            'Message A: LINE4'],
        images: ['images/image1.jpg',
            'images/image2.JPG'],
        template: 'templates/templateA.html',
        durationInSeconds: 3,
        displayTime: [
            {
                hours: {
                    begin: 6.00,
                    end: 12.00
                },
                days: [1, ],
                dates: {
                    begin: new Date(Date.UTC(2016, 0, 1)),
                    end: new Date(Date.UTC(2016, 11, 31))
                }
            },
            {
                hours: {
                    begin: 13.00,
                    end: 20.00
                },
                days: [3, ],
                dates: {
                    begin: new Date(Date.UTC(2016, 0, 1)),
                    end: new Date(Date.UTC(2016, 11, 31))
                }
            },
        ]
    },
    {
        name: 'messageB',
        screenIds: [1, 3, ],
        text: ['Message B: LINE1',
            'Message B: LINE2',
            'Message B: LINE3',
            'Message B: LINE4',
            'Message B: LINE5',
            'Message B: LINE6',
            'Message B: LINE7',
            'Message B: LINE8',
            'Message B: LINE9',
            'Message B: LINE10', ],
        images: ['images/image1.jpg'],
        template: 'templates/templateB.html',
        durationInSeconds: 3,
        displayTime: [
            {
                hours: {
                    begin: 10.00,
                    end: 16.00
                },
                days: [2, 3, ],
                dates: {
                    begin: new Date(Date.UTC(2016, 2, 1)),
                    end: new Date(Date.UTC(2016, 3, 30))
                }
            },
        ]
    },
    {
        name: 'messageC',
        screenIds: [2, 3, ],
        text: [],
        images: [],
        template: 'templates/templateC.html',
        durationInSeconds: 3,
        displayTime: [
            {
                hours: {
                    begin: 10.00,
                    end: 22.00
                },
                days: [0, 1, 2, 3, 4, 5, 6],
                dates: {
                    begin: new Date(Date.UTC(2016, 4, 1)),
                    end: new Date(Date.UTC(2016, 5, 15))
                }
            },
        ]
    },
    {
        name: 'messageD',
        screenIds: [1, ],
        text: ['Message D: LINE1', 'Message D: LINE2',],
        images: [],
        template: 'templates/templateA.html',
        durationInSeconds: 3,
        displayTime: [
            {
                hours: {
                    begin: 15.00,
                    end: 19.00
                },
                days: [1, ],
                dates: {
                    begin: new Date(Date.UTC(2016, 2, 29)),
                    end: new Date(Date.UTC(2016, 3, 15))
                }
            },
        ]
    },
    {
        name: 'messageE',
        screenIds: [3, ],
        text: ['Message E: LINE1',
            'Message E: LINE2',
            'Message E: LINE3',
            'Message E: LINE4',
            'Message E: LINE5',
            'Message E: LINE6',
            'Message E: LINE7'],
        images: ['images/image3.jpg', 'images/image4.jpg'],
        template: 'templates/templateB.html',
        durationInSeconds: 3,
        displayTime: [
            {
                hours: {
                    begin: 1.00,
                    end: 23.00
                },
                days: [1, 2, 4, ],
                dates: {
                    begin: new Date(Date.UTC(2016, 3, 1)),
                    end: new Date(Date.UTC(2016, 3, 30))
                }
            },
        ]
    },
]

module.exports = messages;