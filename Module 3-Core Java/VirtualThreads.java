public class VirtualThreads {
    public static void main(String[] args) throws InterruptedException {
        long startTime = System.currentTimeMillis();

        for (int i = 1; i <= 100000; i++) {
            int id = i;

            Thread.startVirtualThread(() -> {
                System.out.println("Virtual Thread " + id);
            });
        }

        Thread.sleep(3000);

        long endTime = System.currentTimeMillis();

        System.out.println("Time taken by virtual threads: " + (endTime - startTime) + " ms");
    }
}