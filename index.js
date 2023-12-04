const readline = require('readline');
const BST = require('./bst');
const fs = require('fs');

//Create a BST tree instance
const bst = new BST();

// Read and analyze the database
const readStudentInfoFile = (filename) => {
  const data = fs.readFileSync(filename, 'utf8');
  const studentInfo = data.split('\n').map((line) => {
    const [studentNumber, studentName, dateOfBirth, telephone] = line.split(',');
    return {
      studentNumber,
      studentName,
      dateOfBirth,
      telephone
    };
  });
  return studentInfo;
};

// Write student information to a file
const writeStudentInfoToFile = (filename, studentInfo) => {
  const data = studentInfo
    .map(({ studentNumber, studentName, dateOfBirth, telephone }) => `${studentNumber},${studentName},${dateOfBirth},${telephone}`)
    .join('\n');
  fs.writeFileSync(filename, data);
  console.log('Student information has been writen to the file :)');
};

// Read and insert student information
const studentInfo = readStudentInfoFile('student_info.txt');
studentInfo.forEach(({ studentNumber, studentName, dateOfBirth, telephone }) => {
  bst.insert(studentNumber, studentName, dateOfBirth, telephone);
});

// Create a command line interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// show menu
function displayMenu() {
  console.log('****** Student information system *******');
  console.log('1. Add student information');
  console.log('2. Delete student information');
  console.log('3. Modify student information');
  console.log('4. Query student information');
  console.log('5. Sort and display student information');
  console.log('6. exit');
  console.log('*****************************************');
}

// add student information
function addStudentInfo() {
  rl.question('Please input student number: ', (studentNumber) => {
    rl.question('Please input student name: ', (studentName) => {
      rl.question('Please input student Birthday: ', (dateOfBirth) => {
        rl.question('Please input student phonenumber: ', (telephone) => {
          bst.insert(studentNumber, studentName, dateOfBirth, telephone);
          console.log('Student information has been add');
          writeStudentInfoToFile('student_info.txt', bst.inorder());
          displayMenu();
          askUser();
        });
      });
    });
  });
}

// delete student information
function deleteStudentInfo() {
  rl.question('Please enter the student number you want to delete: ', (studentNumber) => {
    bst.remove(studentNumber);
    console.log('Stduent information has been delete');
    writeStudentInfoToFile('student_info.txt', bst.inorder());
    displayMenu();
    askUser();
  });
}

// modify student information
function updateStudentInfo() {
  rl.question('Please enter the student number you want to modify: ', (studentNumber) => {
    const node = bst.search(studentNumber);
    if (node) {
      console.log('Student information:');
      console.log('student number: ' + node.studentNumber);
      console.log('student name: ' + node.studentName);
      console.log('birthday: ' + node.dateOfBirth);
      console.log('telephone: ' + node.telephone);
      rl.question('Please enter the student name: ', (studentName) => {
        rl.question('Please enter the birthday: ', (dateOfBirth) => {
          rl.question('Please enter the telephone: ', (telephone) => {
            node.studentName = studentName;
            node.dateOfBirth = dateOfBirth;
            node.telephone = telephone;
            console.log('Student information has been modify');
            writeStudentInfoToFile('student_info.txt', bst.inorder());
            displayMenu();
            askUser();
          });
        });
      });
    } else {
      console.log('Can not find the student information');
      displayMenu();
      askUser();
    }
  });
}

// query student information
function searchStudentInfo() {
  rl.question('Please enter the student number you want to query: ', (studentNumber) => {
    const node = bst.search(studentNumber);
    if (node) {
      console.log('student information:');
      console.log('student number: ' + node.studentNumber);
      console.log('student name: ' + node.studentName);
      console.log('birthday: ' + node.dateOfBirth);
      console.log('telephone: ' + node.telephone);
    } else {
      console.log('can not find the student information');
    }
    displayMenu();
    askUser();
  });
}

// sort by student number and display student information
function sortAndDisplayStudentInfo() {
  const sortedStudentInfo = bst.inorder();
  sortedStudentInfo.forEach(({ studentNumber, studentName, dateOfBirth, telephone }) => {
    console.log('student number: ' + studentNumber);
    console.log('student name: ' + studentName);
    console.log('birthday: ' + dateOfBirth);
    console.log('telephone: ' + telephone);
    console.log('-----------------------');
  });
  displayMenu();
  askUser();
}

// user input processing
function askUser() {
  rl.question('Please enter the operation number: ', (option) => {
    switch (option) {
      case '1':
        addStudentInfo();
        break;
      case '2':
        deleteStudentInfo();
        break;
      case '3':
        updateStudentInfo();
        break;
      case '4':
        searchStudentInfo();
        break;
      case '5':
        sortAndDisplayStudentInfo();
        break;
      case '6':
        rl.close();
        break;
      default:
        console.log('invalid operation number');
        displayMenu();
        askUser();
        break;
    }
  });
}

// start program
console.log('Welcome to use student information management system');
displayMenu();
askUser();