import java.util.List;

record Person(String name, int age) {}

public class RecordsExample {
    public static void main(String[] args) {

        Person p1 = new Person("John", 25);
        Person p2 = new Person("Alice", 17);
        Person p3 = new Person("David", 30);

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        List<Person> people = List.of(p1, p2, p3);

        System.out.println("\nPeople aged 18 and above:");

        people.stream()
              .filter(person -> person.age() >= 18)
              .forEach(System.out::println);
    }
}