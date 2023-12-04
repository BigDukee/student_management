import java.io.FileWriter;
import java.io.IOException;
import java.util.Random;

public class RandomGenerator {
    public static void main(String[] args) {
        Random random = new Random();

        String[] alphabet = {"A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"};
        String[] names = {"John Smith", "Emily Johnson", "Michael Williams", "Emma Brown", "Daniel Jones", "Olivia Davis", "Matthew Miller", "Ava Wilson", "Joseph Taylor", "Sophia Anderson"};
        String[] dates = {"01-01-2000", "02-02-2001", "03-03-2002", "04-04-2003", "05-05-2004", "06-06-2005", "07-07-2006", "08-08-2007", "09-09-2008", "10-10-2009"};

        try {
            FileWriter writer = new FileWriter("student_info_random.txt");

            for (int i = 0; i < 1000; i++) {
                String studentNumber = generateStudentNumber(random, alphabet);
                String studentName = names[random.nextInt(names.length)];
                String dateOfBirth = dates[random.nextInt(dates.length)];
                String telephone = generateTelephone(random);

                String data = studentNumber + ", " + studentName + ", " + dateOfBirth + ", " + telephone + "\n";

                writer.write(data);
            }

            writer.close();
            System.out.println("Data generated and saved to student_info_random.txt");
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file.");
            e.printStackTrace();
        }
    }

    private static String generateStudentNumber(Random random, String[] alphabet) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 3; i++) {
            sb.append(alphabet[random.nextInt(alphabet.length)]);
        }

        for (int i = 0; i < 6; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }

    private static String generateTelephone(Random random) {
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < 10; i++) {
            sb.append(random.nextInt(10));
        }

        return sb.toString();
    }
}