package dev.pablo.runnerz.user;

import java.util.List;
import java.util.Optional;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.util.JSONPObject;

import dev.pablo.runnerz.run.RunNotFoundException;
@RestController
@RequestMapping("/api/users") // General path that invoques this controller
@CrossOrigin("http://127.0.0.1:5500")
public class UserController {
  private final UserRepository userRepository;
 public UserController (UserRepository userRepository){
  this.userRepository = userRepository;
 }
@GetMapping("")
  List<User> findAllUsers() {
    return userRepository.getAllUsers();
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
