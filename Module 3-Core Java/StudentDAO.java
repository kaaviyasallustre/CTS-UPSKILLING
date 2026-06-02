import java.sql.*;

public class StudentDAO {

    static String url = "jdbc:mysql://localhost:3306/studentdb";
    static String user = "root";
    static String password = "root123";

    public void insertStudent(int id, String name) {
        try {
            Connection con = DriverManager.getConnection(url, user, password);

            String query = "INSERT INTO students(id, name) VALUES(?, ?)";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setInt(1, id);
            ps.setString(2, name);

            ps.executeUpdate();

            System.out.println("Student inserted successfully.");

            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public void updateStudent(int id, String name) {
        try {
            Connection con = DriverManager.getConnection(url, user, password);

            String query = "UPDATE students SET name=? WHERE id=?";
            PreparedStatement ps = con.prepareStatement(query);

            ps.setString(1, name);
            ps.setInt(2, id);

            ps.executeUpdate();

            System.out.println("Student updated successfully.");

            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void main(String[] args) {
        StudentDAO dao = new StudentDAO();

        dao.insertStudent(1, "John");
        dao.updateStudent(1, "David");
    }
}
