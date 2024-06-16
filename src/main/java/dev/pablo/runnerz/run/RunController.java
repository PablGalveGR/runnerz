package dev.pablo.runnerz.run;

import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/api/runs") // General path that invoques this controller

public class RunController {
  private final RunRepository runRepository;

  public RunController(RunRepository runRepository) {
    this.runRepository = runRepository;
  }

  @GetMapping("")
  List<Run> findAllRuns() {
    return runRepository.findAll();
  }
// General path plus an element to pass to the controller
  @GetMapping("{id}") 
  Run findOneRun(@PathVariable int id) {
    Optional<Run> opRun = runRepository.findbyid(id);
    if (opRun.isEmpty()) {
      throw new RunNotFoundException();
    }
    return opRun.get();
  }
  @GetMapping("title/{title}") 
  List <Run> findByTitle(@PathVariable String title) {
    List<Run> opRun = runRepository.findByTitle(title);
    if (opRun.isEmpty()) {
      throw new RunNotFoundException();
    }
    return opRun;
  }
  @GetMapping("runner/{id}") 
  List <Run> findByRunner(@PathVariable int id) {
    List<Run> opRun = runRepository.findByRunner(id);
    if (opRun.isEmpty()) {
      throw new RunNotFoundException();
    }
    return opRun;
  }

  // create
  @ResponseStatus(HttpStatus.CREATED)
  @PostMapping("")
  void createRun(@Valid @RequestBody Run run) {
    runRepository.createRun(run);
  }

  // update
  @ResponseStatus(HttpStatus.ACCEPTED)
  @PutMapping("update/{id}")
  void updateRun(@Valid @RequestBody Run run, @PathVariable int id) {
    runRepository.updateRun(run, id);
  }

  // Delete
  @ResponseStatus(HttpStatus.ACCEPTED)
  @DeleteMapping("delete/{id}")
  void deleteRun(@Valid @PathVariable int id) {
    runRepository.deleteRun(id);
  }
}
