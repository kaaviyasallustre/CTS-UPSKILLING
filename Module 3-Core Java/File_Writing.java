import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class File_Writing {

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("Enter a string: ");
        String text = sc.nextLine();

        try {
            FileWriter writer = new FileWriter("output.txt");
            writer.write(text);
            writer.close();
            System.out.println("Data has been written to output.txt");
        } catch (IOException e) {
            System.out.println("Error writing to file.");
        }

        sc.close();
    }
}