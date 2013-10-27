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

            Statement statement = connection.createStatement();

            String sql;

            sql = "drop table if exists enrolment";
            statement.executeUpdate(sql);

            sql = "create table enrolment(name string, course string, grade float)";
            statement.executeUpdate(sql);

            statement.executeUpdate("insert into enrolment values('Mary', 'Computer Science', 87.0)");
            statement.executeUpdate("insert into enrolment values('John', 'Computer Science', 83.5)");

            sql = "select * from enrolment";
            ResultSet result = statement.executeQuery(sql);

            while(result.next()) {
                String name = result.getString(1);
                String course = result.getString(2);
                float  grade  = result.getFloat(3);
                System.out.printf("%s takes %s, and received %f\n", name, course, grade);
            }
            result.close();

            sql = "select course, avg(grade) from enrolment group by course";
            result = statement.executeQuery(sql);
            while(result.next()) {
                String course = result.getString(1);
                float  grade  = result.getFloat(2);
                System.out.printf("[%s] average = %.2f\n", course, grade);
            }
            result.close();

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
