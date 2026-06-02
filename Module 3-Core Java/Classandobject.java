class Car {
    String company;
    String model;
    int year;

    void displayDetails() {
        System.out.println("Company: " + company);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
    }
}
public class Classandobject {
    public static void main(String[] args) {
        Car car1 = new Car();
        car1.company = "Toyota";
        car1.model = "Corolla";
        car1.year = 2022;
        Car car2 = new Car();
        car2.company = "Honda";
        car2.model = "City";
        car2.year = 2021;
        car1.displayDetails();
        car2.displayDetails();
    }
}