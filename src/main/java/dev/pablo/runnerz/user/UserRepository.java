package dev.pablo.runnerz.user;

import java.util.List;
import java.util.Optional;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

import dev.pablo.runnerz.run.Run;

@Repository
public class UserRepository {
private List<User> users;
private final JdbcClient jdbcClient;
 UserRepository(JdbcClient jdbcClient){
  this.jdbcClient = jdbcClient;
 }
 //Insert querys
 //Delete querys
 //Selecy querys
 List<User> getAllUsers(){
  String query = "SELECT * FROM Runner;";
    users = jdbcClient.sql(query).query(User.class).list();
    return users;
 }
 Optional<User> getUserById(int id){
  String query = "SELECT * FROM runner WHERE id = :id;";
  Optional<User> runner = jdbcClient.sql(query).param("id", id)
        .query(User.class).optional();
    return runner;
 }
 Optional<User> getUserNameById(int id){
  String query = "SELECT * FROM runner r WHERE id = :id;";
  Optional<User> runner = jdbcClient.sql(query).param("id", id)
        .query(User.class).optional();
  runner.password = "";
    return runner;
 } 
}
