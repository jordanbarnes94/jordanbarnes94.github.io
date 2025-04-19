function go() {

    const zoo = 
    `
    ,Bear,Orca,Otter,Snake,Zebra,Fox,Giraffe,Lion,Panda,Elk,Frog,Penguin,Pig,Turtle,Rhino,Shark,Duck,Pug
    Bear,-1,1,0,0,1,0,1,1,1,1,1,0,0,0,0,0,0,0
    Orca,1,-1,0,1,1,1,0,1,1,1,0,1,1,1,1,0,0,0
    Otter,0,0,-1,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0
    Snake,0,1,0,-1,1,1,1,1,1,1,1,0,0,0,1,0,1,0
    Zebra,1,1,1,1,-1,1,1,1,1,1,1,1,0,1,0,0,0,0
    Fox,0,1,0,1,1,-1,1,1,1,1,1,0,0,0,0,0,0,0
    Giraffe,1,0,0,1,1,1,-1,1,1,0,1,0,0,0,0,1,0,0
    Lion,1,1,0,1,1,1,1,-1,1,1,0,1,0,1,0,0,0,0
    Panda,1,1,1,1,1,1,1,1,-1,1,0,0,0,0,1,0,0,1
    Elk,1,1,0,1,1,1,0,1,1,-1,0,0,0,0,0,0,0,0
    Frog,1,0,0,1,1,1,1,0,0,0,-1,0,0,0,0,0,0,0
    Penguin,0,1,0,0,1,0,0,1,0,0,0,-1,0,0,0,0,0,0
    Pig,0,1,0,0,0,0,0,0,0,0,0,0,-1,0,0,0,0,0
    Turtle,0,1,0,0,1,0,0,1,0,0,0,0,0,-1,0,0,0,0
    Rhino,0,1,0,1,0,0,0,0,1,0,0,0,0,0,-1,0,0,0
    Shark,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,-1,0,0
    Duck,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,-1,0
    Pug,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,-1
    `;

    const lines = zoo.split("\n").map(line => line.split(","));

    let collection = [];

    for (i = 1; i < lines.length; i++) {
        for (j = 1; j < lines[i].length; j++) {
            collection.push(parseInt(lines[i][j]));
        }
    }

    let divs = [];

    collection.forEach( (number, index) => {
        let div;
        switch (number) {
            case 1:
                div = document.createElement('div')
                div.setAttribute('class', 'collected cursor-pointer')
                divs.push(div);
                break;
            case 0:
                div = document.createElement('div')
                div.setAttribute('class', 'uncollected cursor-pointer')
                divs.push(div);
                break;
            case -1:
                div = document.createElement('div')
                //div.setAttribute('class', 'cursor-pointer')
                divs.push(div);
                break;
                    
        }
    })
        
    divs.forEach(div => document.querySelector('.grid').append(div));
}

go()
