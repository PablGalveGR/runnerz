package dev.pablo.runnerz.user;

import java.util.List;

import org.springframework.jdbc.core.simple.JdbcClient;
import org.springframework.stereotype.Repository;

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
  return users;
 }
 User getUserById(int id){
  return users;
 } 
}
