package dev.pablo.runnerz.user;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class User {
  @Positive
  int id;
  @NotNull
  String username;
  String password;

  public User(@Positive int id, @NotNull String username,
      String password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }

  public int getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public String getPassword() {
    return password;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public void setPassword(String password) {
    this.password = password;
  }

}
