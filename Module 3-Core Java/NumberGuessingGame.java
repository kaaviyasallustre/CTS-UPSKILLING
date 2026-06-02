import java.util.Scanner;
import java.util.Random;

public class NumberGuessingGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Random random = new Random();

        int target = random.nextInt(100) + 1;
        int guess;

        do {
            System.out.print("Enter your guess (1-100): ");
            guess = sc.nextInt();

            if (guess > target) {
                System.out.println("Too High!");
            } else if (guess < target) {
                System.out.println("Too Low!");
            } else {
                System.out.println("Correct! You guessed the number.");
            }
        } while (guess != target);
    }
}