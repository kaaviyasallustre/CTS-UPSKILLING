import java.sql.*;

public class TransactionHandling {

    static String url = "jdbc:mysql://localhost:3306/bankdb";
    static String user = "root";
    static String password = "root123";

    public static void transfer(int fromId, int toId, double amount) {

        try {
            Connection con = DriverManager.getConnection(url, user, password);

            con.setAutoCommit(false);

            String debitQuery =
                    "UPDATE accounts SET balance = balance - ? WHERE id = ?";
            PreparedStatement debit = con.prepareStatement(debitQuery);

            debit.setDouble(1, amount);
            debit.setInt(2, fromId);

            String creditQuery =
                    "UPDATE accounts SET balance = balance + ? WHERE id = ?";
            PreparedStatement credit = con.prepareStatement(creditQuery);

            credit.setDouble(1, amount);
            credit.setInt(2, toId);

            int debitResult = debit.executeUpdate();
            int creditResult = credit.executeUpdate();

            if (debitResult > 0 && creditResult > 0) {
                con.commit();
                System.out.println("Transaction Successful");
            } else {
                con.rollback();
                System.out.println("Transaction Failed");
            }

            con.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void main(String[] args) {
        transfer(1, 2, 1000);
    }
}