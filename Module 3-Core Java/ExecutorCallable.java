import java.util.concurrent.*;
import java.util.*;

public class ExecutorCallable {
    public static void main(String[] args) throws Exception {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        List<Callable<String>> tasks = new ArrayList<>();

        tasks.add(() -> "Task 1 Completed");
        tasks.add(() -> "Task 2 Completed");
        tasks.add(() -> "Task 3 Completed");

        List<Future<String>> results = new ArrayList<>();

        for (Callable<String> task : tasks) {
            results.add(executor.submit(task));
        }

        for (Future<String> result : results) {
            System.out.println(result.get());
        }

        executor.shutdown();
    }
}