const exec = require('child_process').exec;

var folder = 'the_new_folder';
var file = 'example_file.txt'
var step_1 = 'mkdir ' + folder;
var step_2 = 'cd ' + folder;
var step_3 = 'touch ' + folder + '/' + file;
var step_4 = 'cp ' + folder + '/' + file + ' ' + folder + '/' + file + '.backup';

let run = (cmd) => {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (stderr) reject(stderr);
            if (error) reject(error);
            resolve(stdout);
        });
    });
}


var log = "";

run(step_1).then((resolve) => {

    log = " Folder Created ";
    console.log(log);

        run(step_2).then((resolve) => {

            log = "Inside new Folder";
            console.log(log);

            run(step_3).then((resolve) => {

                    log = "New File Created";
                    console.log(log);

                    run(step_4).then((resolve) => {

                            log = "Backup File Created";
                            console.log(log);

                    }).catch((reject) => {

                        log = "Final Step FAIL";
                        console.log(log);
                        console.log(reject);
                    });

            }).catch((reject) => {

                log = "Third Step FAIL";
                console.log(log);
                console.log(reject);
            });

        }).catch((reject) => {

            log = "Second Step FAIL";
            console.log(log);
            console.log(reject);
        });
        
}).catch((reject) => {
    log = "First Step FAIL";
    console.log(log);
    console.log(reject);

});