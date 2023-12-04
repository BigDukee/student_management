import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

class Node {
    String studentNumber;
    String studentName;
    String dateOfBirth;
    String telephone;
    Node left;
    Node right;

    public Node(String studentNumber, String studentName, String dateOfBirth, String telephone) {
        this.studentNumber = studentNumber;
        this.studentName = studentName;
        this.dateOfBirth = dateOfBirth;
        this.telephone = telephone;
        this.left = null;
        this.right = null;
    }
}

class BST {
    private Node root;

    public BST() {
        root = null;
    }

    public void insert(String studentNumber, String studentName, String dateOfBirth, String telephone) {
        root = insertRec(root, studentNumber, studentName, dateOfBirth, telephone);
    }

    private Node insertRec(Node root, String studentNumber, String studentName, String dateOfBirth, String telephone) {
        if (root == null) {
            root = new Node(studentNumber, studentName, dateOfBirth, telephone);
            return root;
        }

        if (studentNumber.compareTo(root.studentNumber) < 0) {
            root.left = insertRec(root.left, studentNumber, studentName, dateOfBirth, telephone);
        } else if (studentNumber.compareTo(root.studentNumber) > 0) {
            root.right = insertRec(root.right, studentNumber, studentName, dateOfBirth, telephone);
        }

        return root;
    }

    public Node getRoot() {
        return root;
    }

    public void inorderTraversal(Node root, BufferedWriter writer) throws IOException {
        if (root != null) {
            inorderTraversal(root.left, writer);
            writer.write(root.studentNumber + ", " + root.studentName + ", " + root.dateOfBirth + ", " + root.telephone + "\n");
            inorderTraversal(root.right, writer);
        }
    }
}

class Main {
    public static void main(String[] args) {
        String inputFile = "student_info_random.txt";
        String outputFile = "student_info.txt";

        BST bst = new BST();

        try (BufferedReader reader = new BufferedReader(new FileReader(inputFile));
             BufferedWriter writer = new BufferedWriter(new FileWriter(outputFile))) {

            String line;
            while ((line = reader.readLine()) != null) {
                String[] parts = line.split(", ");
                if (parts.length == 4) {
                    String studentNumber = parts[0].trim();
                    String studentName = parts[1].trim();
                    String dateOfBirth = parts[2].trim();
                    String telephone = parts[3].trim();
                    bst.insert(studentNumber, studentName, dateOfBirth, telephone);
                }
            }

            bst.inorderTraversal(bst.getRoot(), writer);

            System.out.println("BST has been generated and stored in " + outputFile);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}