package dev.pablo.runnerz.user;

import java.sql.Date;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class User {
  int id;
  @NotNull
  String username;
  Date birthDate;
  String location;

  public User() {
  }

  public User(@Positive int id, @NotNull String username,
      String password, Date birthDate, String location) {
    this.id = id;
    this.username = username;
    this.birthDate = birthDate;
    this.location = location;
  }

  public int getId() {
    return id;
  }

  public String getUsername() {
    return username;
  }

  public void setId(int id) {
    this.id = id;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public Date getBirthDate() {
    return this.birthDate;
  }

  public void setBirthDate(Date birthDate) {
    this.birthDate = birthDate;
  }

  public String getLocation() {
    return this.location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

}
