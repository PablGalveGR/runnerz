package dev.pablo.runnerz.user;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import dev.pablo.runnerz.run.RunNotFoundException;
@RestController
@RequestMapping("/api/users") // General path that invoques this controller
@CrossOrigin("http://127.0.0.1:5500")
public class UserController {//Never return the password to the Client
  private final UserRepository userRepository;
 public UserController (UserRepository userRepository){
  this.userRepository = userRepository;
 }
@GetMapping("")
  List<User> findAllUsers() {
    List<User> users = userRepository.getAllUsers();
    for (User user : users) {
      user.setPassword(null);
    }
    return users;
  }
// General path plus an element to pass to the controller
  @GetMapping("{id}") 
  User findOneUser(@PathVariable int id) {
    Optional<User> opUser = userRepository.getUserById(id);
    if (opUser.isEmpty()) {
      throw new RunNotFoundException();
    }
    return opUser.get();
  }
  @GetMapping("name/{id}") 
  User findOneUserName(@PathVariable int id) {
   Optional <User> opUser = userRepository.getUserNameById(id);
   User user = new User();
    if (opUser.isEmpty()) {
      throw new RunNotFoundException();
    }
    else{
      user = opUser.get();
      user.setPassword(null);
    }
    return user;
  }
}
