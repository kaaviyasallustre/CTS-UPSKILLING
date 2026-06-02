import java.lang.reflect.Method;

class Sample {
    public void display() {
        System.out.println("Method Invoked Using Reflection");
    }
}

public class Reflection {
    public static void main(String[] args) throws Exception {
        Class<?> cls = Class.forName("Sample");

        Object obj = cls.getDeclaredConstructor().newInstance();

        Method[] methods = cls.getDeclaredMethods();

        for (Method method : methods) {
            System.out.println("Method Name: " + method.getName());
            System.out.println("Parameter Count: " + method.getParameterCount());

            method.invoke(obj);
        }
    }
}