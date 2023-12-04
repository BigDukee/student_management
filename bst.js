const fs = require('fs');

class BSTNode {
  constructor(studentNumber, studentName, dateOfBirth, telephone) {
    this.studentNumber = studentNumber;
    this.studentName = studentName;
    this.dateOfBirth = dateOfBirth;
    this.telephone = telephone;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  // insert node
  insert(studentNumber, studentName, dateOfBirth, telephone) {
    const newNode = new BSTNode(studentNumber, studentName, dateOfBirth, telephone);

    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(node, newNode) {
    if (newNode.studentNumber < node.studentNumber) {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  // delete node
  remove(studentNumber) {
    this.root = this.removeNode(this.root, studentNumber);
  }

  removeNode(node, studentNumber) {
    if (!node) {
      return null;
    }

    if (studentNumber < node.studentNumber) {
      node.left = this.removeNode(node.left, studentNumber);
      return node;
    } else if (studentNumber > node.studentNumber) {
      node.right = this.removeNode(node.right, studentNumber);
      return node;
    } else {
      if (!node.left && !node.right) {
        node = null;
        return node;
      }

      if (!node.left) {
        node = node.right;
        return node;
      } else if (!node.right) {
        node = node.left;
        return node;
      }

      const minRightNode = this.findMinNode(node.right);
      node.studentNumber = minRightNode.studentNumber;
      node.studentName = minRightNode.studentName;
      node.dateOfBirth = minRightNode.dateOfBirth;
      node.telephone = minRightNode.telephone;

      node.right = this.removeNode(node.right, minRightNode.studentNumber);
      return node;
    }
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    }
    return this.findMinNode(node.left);
  }

  // search node
  search(studentNumber) {
    return this.searchNode(this.root, studentNumber);
  }

  searchNode(node, studentNumber) {
    if (!node || node.studentNumber === studentNumber) {
      return node;
    }

    if (studentNumber < node.studentNumber) {
      return this.searchNode(node.left, studentNumber);
    }

    return this.searchNode(node.right, studentNumber);
  }

  // inorder traversal
  inorder() {
    const result = [];
    this.inorderTraversal(this.root, result);
    return result;
  }

  inorderTraversal(node, result) {
    if (node !== null) {
      this.inorderTraversal(node.left, result);
      result.push(node);
      this.inorderTraversal(node.right, result);
    }
  }

  // write student information to the file
  writeStudentInfoToFile(filename) {
    const studentInfo = this.inorder();
    const data = studentInfo.map((node) => {
      return `${node.studentNumber},${node.studentName},${node.dateOfBirth},${node.telephone}`;
    }).join('\n');

    fs.writeFileSync(filename, data);
    console.log('Student information has been written to the file');
  }
}

module.exports = BST;