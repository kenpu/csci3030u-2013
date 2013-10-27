import java.sql.*;

public class Sample {
    public static final String className = "org.sqlite.JDBC";
    public static final String url       = "jdbc:sqlite:sample.sqlite";

    public static void main(String[] args) throws ClassNotFoundException {

        Class.forName(className);
        Connection connection = null;
        System.out.println("Driver : " + className);
        System.out.println("URL    : " + url);
        try {
            connection = DriverManager.getConnection(url);
            System.out.println("Connection made successfully.");
        } catch(SQLException e) {
            System.out.println(e.getMessage());
        } finally {
            try {
                System.out.println("Closing connection...");
                if(connection != null) {
                    connection.close();
                }
            } catch(Exception e) {
                System.out.println(e.getMessage());
            }
        }
    }
}
