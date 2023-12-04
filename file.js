const fs = require('fs');

function readStudentInfoFile(fileName) {
  const fileData = fs.readFileSync(fileName, 'utf8');
  const lines = fileData.split('\n');

  const studentInfo = lines.map((line) => {
    const [studentNumber, studentName, dateOfBirth, telephone] = line.split(',').map((item) => item.trim());
    return { studentNumber, studentName, dateOfBirth, telephone };
  });

  return studentInfo;
}

module.exports = readStudentInfoFile;