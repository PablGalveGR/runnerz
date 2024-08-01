package dev.pablo.runnerz.user;

import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;
import org.springframework.util.Assert;

@Repository
public class UserRepository {
  private List<User> users;
  private final JdbcClient jdbcClient;

  UserRepository(JdbcClient jdbcClient) {
    this.jdbcClient = jdbcClient;
  }

  // Insert querys
  public int createUser(User user) {
    String query = "INSERT INTO USER" + "(id, username, password)"
        + "VALUES( ?, ?, ?);";
    var updated = jdbcClient.sql(query)
        .params(List.of(user.getId(), user.getUsername(), user.getPassword()))
        .update();
    Assert.state(updated == 1, "Failed to create Run: " + user.getUsername());
    return updated;
  }
  // Update querys
  public void updateUser(User user, int id){}
  // Delete querys
  public void deleteUser(int id){}
  // Select querys
  List<User> getAllUsers() {
    String query = "SELECT * FROM Runner;";
    users = jdbcClient.sql(query).query(User.class).list();
    return users;
  }

  Optional<User> getUserById(int id) {
    String query = "SELECT * FROM runner WHERE id = :id;";
    Optional<User> runner = jdbcClient.sql(query).param("id", id)
        .query(User.class).optional();
    return runner;
  }

  Optional<User> getUserNameById(int id) {
    String query = "SELECT * FROM runner r WHERE id = :id;";
    Optional<User> runner = jdbcClient.sql(query).param("id", id)
        .query(User.class).optional();
    if (runner.isPresent()) {
      return runner;
    }
    return null;
  }
}
