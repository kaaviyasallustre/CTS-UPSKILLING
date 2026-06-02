public class TypeCastingExample {
    public static void main(String[] args) {
        double d = 45.67;
        int i = (int) d;

        int num = 25;
        double value = (double) num;

        System.out.println("Double value: " + d);
        System.out.println("After casting to int: " + i);
        System.out.println("Integer value: " + num);
        System.out.println("After casting to double: " + value);
    }
}