
var model = {
    students: [
        {
            id: 1,
            name: "Slappy the Frog",
            daysMissed: 11,
            days: [true, false, false, false, false, false, false, false, false, false, false, false]
        },
        {
            id: 2,
            name: "Lilly the Lizard",
            daysMissed: 12,
            days: [false, false, false, false, false, false, false, false, false, false, false, false]
        },
        {
            id: 3,
            name: "Paulrus the Walrus",
            daysMissed: 12,
            days: [false, false, false, false, false, false, false, false, false, false, false, false]
        },
        {
            id: 4,
            name: "Gregory the Goat",
            daysMissed: 12,
            days: [false, false, false, false, false, false, false, false, false, false, false, false]
        },
        {
            id: 5,
            name: "Adam the Anaconda",
            daysMissed: 12,
            days: [false, false, false, false, false, false, false, false, false, false, false, false]
        }
    ],

    init: function () {
        console.log(model.students);
        if (!localStorage.attendanceStudents) {
            localStorage.attendanceStudents = JSON.stringify(model.students);
        }
    },

    updateDaysMissed: function (listStudents) {
        //var data = JSON.parse(localStorage.attendance);
        //data.push(obj);
        localStorage.attendanceStudents = JSON.stringify(listStudents);
    },

    getAllStudents: function () {
        return JSON.parse(localStorage.attendanceStudents);
    }

}

var octopus = {

    init: function () {
        model.init();
        view.init();
    },

    getStudents: function () {
        return model.getAllStudents();
    },

    getDaysMissed: function(student){

       var students = model.getAllStudents();

        students.forEach(function (val, index) {
            if (student.id === val.id) {
                students[index] = student;
                return students[index].daysMissed;
            }
        })

    },

    updateDaysMissed: function (student) {

        var students = model.getAllStudents();
        students.forEach(function (val, index) {
            if (student.id === val.id) {
                students[index] = student;
                model.updateDaysMissed(students);
            }
        })
        view.render();

    }

}

var view = {
    init: function () {

        this.studentsTableElem = document.getElementById('students-table');
        this.render();
    },

    render: function () {

        var i, j, student, tr, td, tdStudent, tdMissed, nome, missed, checkbox, cbDay;

        var students = octopus.getStudents();
        console.log(students);

        this.studentsTableElem.innerHTML = '';

        for (i = 0; i < students.length; i++) {

            student = students[i];
            console.log(student);

            tr = document.createElement('tr');
            tr.setAttribute("class", "student");

            tdStudent = document.createElement('td');
            nome = document.createTextNode(student.name);

            tdStudent.appendChild(nome);
            tdStudent.setAttribute("class", "name-col");

            tr.appendChild(tdStudent);

            for (j = 0; j < 12; j++) {

                td = document.createElement('td');
                td.setAttribute("class", "attend-col");

                checkbox = document.createElement('input');
                checkbox.setAttribute("type", "checkbox");
                checkbox.setAttribute("id", "cb-"+ j);
                checkbox.checked = student.days[j];

                td.appendChild(checkbox);

                tr.appendChild(td);

                checkbox.addEventListener('click', (function (studentCopy) {
                    return function () {

                        cbDay = this.id.split('-')[1];
                        //studentCopy.days[cbDay] = studentCopy.days[cbDay] ? false : true;
                        if(studentCopy.days[cbDay]){
                            studentCopy.days[cbDay] = false;
                            studentCopy.daysMissed  = studentCopy.daysMissed + 1;
                        }
                        else{
                            studentCopy.days[cbDay] = true;
                            studentCopy.daysMissed = studentCopy.daysMissed - 1;
                        }
                        
                        octopus.updateDaysMissed(studentCopy);
                    }
                })(student));

            }

            tdMissed = document.createElement('td');
            missed = document.createTextNode(student.daysMissed);

            tdMissed.appendChild(missed);
            tdMissed.setAttribute("class", "missed-col")

            tr.appendChild(tdMissed);

            this.studentsTableElem.appendChild(tr);
        }
    }
}

octopus.init();